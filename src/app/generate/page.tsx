'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Stack,
  Group,
  Text,
  Loader,
} from '@mantine/core';
import CtaButton from '@/components/common/cta-button';
import CustomTextInput from '@/components/common/custom-input-text';
import CloudinaryImagePicker, { CloudinaryImage } from '@/components/image-picker';
import BigPostPreview from '@/components/post-preview';
import PostPreview from '@/components/post-preview';
import { usePostModal } from '@/components/common/custom-modal';
import { PostData } from '@/types/postData';
import { getPostFromArticle, getPostFromPhrase } from '@/lib/n8n.service';
import { createPost } from '@/lib/post.service';

type GenerationMode = 'article' | 'topic';

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostData>();
  const [mode, setMode] = useState<GenerationMode>('article');
  const [image, setImage] = useState<CloudinaryImage | null>(null);

  const { openModal, Modal } = usePostModal();

  const handleCreateContent = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response =
        mode === 'article'
          ? await getPostFromArticle(input)
          : await getPostFromPhrase(input);

      const dbPost = await createPost({
        title: input,
        output: response.output,
        imageUrl: image?.url ?? undefined,
      });

      setPost(dbPost);
      openModal(dbPost);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      /* .container */
      w="100%"
      maw={1024}
      mx="auto"
      px={64}          /* 4 rem */
      py="xl"          /* 2 rem */
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: 32,
        minHeight: '87vh',
      }}
    >
      {/* ---------- fila 1 ---------- */}
      <Stack gap={32}>
        <h1>Generador de Contenido</h1>

        <Stack gap="xs">
          <Text fw={500}>Puedes agregar una imagen al posteo:</Text>
          <CloudinaryImagePicker value={image} onChange={setImage} />
        </Stack>
      </Stack>

      {/* ---------- fila 2 (preview) ---------- */}
      <Box
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {loading ? (
          <Flex align="center" justify="center" h="100%">
            <Loader />
          </Flex>
        ) : (
          post && <BigPostPreview post={post} />
        )}
      </Box>

      {/* ---------- fila 3 (formulario) ---------- */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateContent();
        }}
      >
        <Stack gap={16}>
          <Group justify="space-between" w="100%">
            <CtaButton
              text="Desde un artículo"
              variant={mode === 'article' ? 'primary' : 'secondary'}
              isActive={mode === 'article'}
              onClick={() => setMode('article')}
            />
            <CtaButton
              text="Desde una temática"
              variant={mode === 'topic' ? 'primary' : 'secondary'}
              isActive={mode === 'topic'}
              onClick={() => setMode('topic')}
            />
          </Group>

          <CustomTextInput
            label={
              mode === 'article'
                ? 'Ingresa el link del artículo'
                : 'Ingresa la temática'
            }
            value={input}
            onChange={setInput}
            placeholder={
              mode === 'article' ? 'https://...' : 'Novedades React 19'
            }
          />

          <CtaButton
            text="Generar contenido"
            onClick={handleCreateContent}
            disabled={loading || input.trim() === ''}
          />
        </Stack>
      </form>

      <Modal renderContent={(p) => <PostPreview post={p} />} />
    </Box>
  );
}
