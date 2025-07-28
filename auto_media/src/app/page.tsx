"use client";
import { Modal, SimpleGrid, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import PostPreview from "@/components/post-preview";
import CtaButton from "@/components/common/cta-button";
import mockPost from "@/mockData/post.json";
import { useState } from "react";
import { PostData } from "@/types/postData";

export default function Home() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);

  const openModal = (post: PostData) => {
    setSelectedPost(post);
    setOpened(true);
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Text size="xl" fw={700}>
          Últimos posteos
        </Text>
        <CtaButton
          text="Nuevo +"
          onClick={() => router.push("/generate")}
        />
      </header>

      <main>
        <SimpleGrid
          cols={{ base: 1, sm: 2 }}
          spacing="md"
          verticalSpacing="md"
        >
          {mockPost.map((post: PostData) => (
            <PostPreview 
              key={post.id} 
              post={post} 
              compactMode
              onClick={() => openModal(post)}
            />
          ))}
        </SimpleGrid>

        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          size="xl"
          title={selectedPost?.title || "Post"}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
          }}
        >
          {selectedPost && (
            <PostPreview post={selectedPost} />
          )}
        </Modal>
      </main>
    </section>
  );
}