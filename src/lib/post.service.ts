import { PostData } from '@/types/postData';

export async function fetchPosts(): Promise<PostData[]> {
  try {
    const res = await fetch('/api/posts');

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.error || 'Failed to fetch posts');
    }

    return await res.json();
  } catch (err) {
    console.error('[fetchPosts] Error:', err);
    throw err;
  }
}

export async function createPost(post: Partial<PostData>): Promise<PostData> {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...post,
        socialNetwork: undefined 
      }),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.error || 'Failed to create post');
    }

    return await res.json();
  } catch (err) {
    console.error('[createPost] Error:', err);
    throw err;
  }
}

export async function updatePost(
  id: number,
  updates: Partial<PostData>,
): Promise<PostData> {
  try {
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.error || 'Failed to update post');
    }

    return await res.json();
  } catch (err) {
    console.error('[updatePost] Error:', err);
    throw err;
  }
}

export async function deletePost(id: number): Promise<{ message: string; id: number }> {
  try {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error?.error || 'Failed to delete post');
    }

    return await res.json();
  } catch (err) {
    console.error('[deletePost] Error:', err);
    throw err;
  }
}