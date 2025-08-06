import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs'; // fuerza Node runtime

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Missing CLOUDINARY_* env vars');
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export async function GET(req: NextRequest) {
  try {
    configureCloudinary();

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') ?? process.env.CLOUDINARY_UPLOAD_FOLDER ?? 'uploads';
    const max = Number(searchParams.get('max')) || 40;

    const res = await cloudinary.search
      .expression(`resource_type:image AND folder:${folder}`)
      .sort_by('created_at', 'desc')
      .max_results(max)
      .execute();

    const items = (res.resources ?? []).map((r: any) => ({
      publicId: r.public_id as string,
      url: r.secure_url as string,
      bytes: r.bytes as number,
      format: r.format as string,
      createdAt: r.created_at as string,
    }));

    return NextResponse.json({ items });
  } catch (e: any) {
    console.error('[cloudinary/list] error:', e?.message || e);
    return NextResponse.json({ error: e?.message || 'Cloudinary list failed' }, { status: 500 });
  }
}
