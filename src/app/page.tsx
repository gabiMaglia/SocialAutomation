"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Center,
  Loader,
  SimpleGrid,
  Stack,
  Group,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { PostData } from "@/types/postData";
import CtaButton from "@/components/common/cta-button";
import PostPreview from "@/components/post-preview";
import CompactPostPreview from "@/components/post-preview-compact";
import { usePostModal } from "@/components/common/custom-modal";

export default function Home() {
  const router = useRouter();
  const { openModal, Modal } = usePostModal();

  const [posts, setPosts] = useState<PostData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch('/api/posts', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error fetching posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setPosts([]);
      setError('No se pudieron cargar los posts.');
    }
  }, []);


  useEffect(() => { loadPosts(); }, [loadPosts]);

  return (
    <Container size="lg" py="xl">
      {/* HERO */}
      <Stack gap="sm" align="center" mb="lg">
        <Title order={1} fw={900} ta="center">
          Fluvi
        </Title>
        <Text size="lg" c="dimmed" ta="center" maw={600}>
          Generá copies irresistibles y profesionales para tus redes sociales en
          segundos.
        </Text>
        <CtaButton
          text="Nuevo post +"
          onClick={() => router.push("/generate")}
        />
      </Stack>

      {/* LISTA DE POSTS */}
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={3}>Últimos posteos</Title>
        </Group>

        {posts === null ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : posts.length === 0 ? (
          <Center py="xl">
            <Text>Aún no hay posts registrados.</Text>
          </Center>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {posts.map((post) => (
              <CompactPostPreview
                key={post.id}
                post={post}
                onDeleted={loadPosts} 
                onClick={() => openModal(post)}
              />
            ))}
          </SimpleGrid>
        )}
        {error && (
          <Center>
            <Text color="red">{error}</Text>
          </Center>
        )}
      </Stack>

      {/* MODAL */}
      <Modal renderContent={(post) => <PostPreview post={post} />} />
    </Container>
  );
}
