'use client';

import React, { useState } from 'react';
import CtaButton from '@/components/common/cta-button';
import CustomTextInput from '@/components/common/custom-input-text';
import styles from './page.module.css';
import { Box, Flex } from '@mantine/core';
import PostPreview from '@/components/post-preview';
import mockData from '@/mockData/post.json';
import { usePostModal } from '@/components/common/custom-modal';
import { PostData } from '@/types/postData';

const post: PostData = mockData[0];

type GenerationMode = 'article' | 'topic';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<GenerationMode>('article');

  const { openModal, Modal } = usePostModal();

  const handleCreateContent = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        if (mode === 'article') {
          console.log('Generating from article:', input);
        } else {
          console.log('Generating from topic:', input);
        }
        openModal(post); // <-- Abrimos el modal con el post generado (mock por ahora)
      }, 2000);
    } catch (error) {
      console.error('Error during generation:', error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  return (
    <section className={styles.container}>
      <Flex direction="column" justify="space-between" gap={32} w="100%">
        <h1>Generador de Contenido</h1>
        <div className={styles.butons}>
          <CtaButton
            text="Desde un artículo"
            variant={mode === 'article' ? 'primary' : 'secondary'}
            isActive={mode === 'article'}
            onClick={() => setMode('article')}
          />
          <CtaButton
            text="Desde un tema"
            variant={mode === 'topic' ? 'primary' : 'secondary'}
            isActive={mode === 'topic'}
            onClick={() => setMode('topic')}
          />
        </div>
      </Flex>

      <Box style={{ overflow: 'auto', height: '100%' }}>
        <PostPreview />
      </Box>

      <form className={styles.inputForm} onSubmit={(e) => e.preventDefault()}>
        <CustomTextInput
          label={mode === 'article' ? 'Ingresa el artículo' : 'Ingresa el tema'}
          value={input}
          onChange={setInput}
          placeholder="Escribe aquí..."
        />
        <CtaButton
          text="Generar contenido"
          onClick={handleCreateContent}
          disabled={input.trim() === '' || loading}
        />
      </form>

      {/* Modal controlado desde el hook */}
      <Modal renderContent={(post) => <PostPreview post={post} />} />
    </section>
  );
};

export default Dashboard;
