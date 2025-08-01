'use client';

import { useEffect, useState } from 'react';
import { SimpleGrid, Text, Center, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import PostPreview from '@/components/post-preview';
import CtaButton from '@/components/common/cta-button';
import { PostData } from '@/types/postData';
import { usePostModal } from '@/components/common/custom-modal';

export default function Home() {
  const router = useRouter();
  const { openModal, Modal } = usePostModal();

  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        console.log(res)
        if (!res.ok) throw new Error('Error fetching posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los posts.');
        setPosts([]);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Text size="xl" fw={700}>
          Últimos posteos
        </Text>
        <CtaButton text="Nuevo +" onClick={() => router.push('/generate')} />
      </header>

      <main>
        {posts === null ? (
          <Center mt="lg">
            <Loader />
          </Center>
        ) : posts.length === 0 ? (
          <Center mt="lg">
            <Text>Aún no hay posts registrados.</Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
            {posts.map((post) => (
              <PostPreview
                key={post.id}
                post={post}
                compactMode
                onClick={() => openModal(post)}
              />
            ))}
          </SimpleGrid>
        )}

        <Modal renderContent={(post) => <PostPreview post={post} />} />
      </main>
    </section>
  );
}
