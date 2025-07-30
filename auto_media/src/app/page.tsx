'use client';

import { SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import PostPreview from '@/components/post-preview';
import CtaButton from '@/components/common/cta-button';
import mockPost from '@/mockData/post.json';
import { PostData } from '@/types/postData';
import { usePostModal } from '@/components/common/custom-modal';

export default function Home() {
  const router = useRouter();
  const { openModal, Modal } = usePostModal();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Text size="xl" fw={700}>
          Últimos posteos
        </Text>
        <CtaButton text="Nuevo +" onClick={() => router.push('/generate')} />
      </header>

      <main>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" verticalSpacing="md">
          {mockPost.map((post: PostData) => (
            <PostPreview
              key={post.id}
              post={post}
              compactMode
              onClick={() => openModal(post)}
            />
          ))}
        </SimpleGrid>

        {/* Modal que se abre desde cualquier lado usando openModal */}
        <Modal renderContent={(post) => <PostPreview post={post} />} />
      </main>
    </section>
  );
}
