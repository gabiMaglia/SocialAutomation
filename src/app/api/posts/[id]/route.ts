import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json();
  if (!body.output) {
    return NextResponse.json(
      { error: 'Missing required field: output' },
      { status: 400 }
    );
  }

  const updated = await db
    .update(posts)
    .set({
      title: body.title ?? null,
      output: body.output,
      imageUrl: body.imageUrl ?? null,
      posted: body.posted ?? false,
      socialNetwork: body.socialNetwork ?? null,
    })
    .where(eq(posts.id, id))
    .returning();

  if (!updated.length) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(updated[0]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const deleted = await db.delete(posts).where(eq(posts.id, id)).returning();

  if (!deleted.length) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Post deleted', id });
}