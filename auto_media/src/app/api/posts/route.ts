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
    

    if (!body.output) {
      return NextResponse.json({ error: 'Missing required field: output' }, { status: 400 });
    }
    console.log(body)
    const newPost = await db.insert(posts).values({
      title: body.title || null,
      output: body.output,
      imageUrl: body.imageUrl || null,
      posted: false, 
      socialNetwork: null,
    }).returning();

    return NextResponse.json(newPost[0], { status: 201 });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Error creating post', details: error }, 
      { status: 500 }
    );
  }
}
