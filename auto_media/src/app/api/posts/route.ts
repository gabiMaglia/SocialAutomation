// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';

export async function GET() {
  try {
    const allPosts = await db.select().from(posts);
    console.log('Fetched posts:', allPosts);
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('[GET /api/posts] DB error:', error); 
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.output || !body.socialNetwor) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await db.insert(posts).values({
      title: body.title ?? null,
      output: body.output,
      date: body.date ? new Date(body.date) : new Date(),
      imageUrl: body.imageUrl ?? null,
      posted: body.posted ?? false,
      socialNetwor: body.socialNetwor,
    }).returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}
