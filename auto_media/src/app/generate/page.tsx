'use client';

import React, { useState } from 'react';
import CtaButton from '@/components/common/cta-button';
import CustomTextInput from '@/components/common/custom-input-text';
import styles from './page.module.css';
import { Box, Flex, Loader } from '@mantine/core';
import PostPreview from '@/components/post-preview';
import { usePostModal } from '@/components/common/custom-modal';
import { PostData } from '@/types/postData';
import { getPostFromArticle, getPostFromPhrase } from '@/lib/n8n.service';



type GenerationMode = 'article' | 'topic';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostData>();
  const [mode, setMode] = useState<GenerationMode>('article');

  const { openModal, Modal } = usePostModal();

const handleCreateContent = async (input: string) => {
  setLoading(true);
  try {
    let response: PostData;

    if (mode === 'article') {
      response = await getPostFromArticle(input);
    } else {
      response = await getPostFromPhrase(input);
    }

    setPost(response);
    openModal(response); 
  } catch (error) {
    console.error('Error during generation:', error);
  } finally {
    setLoading(false);
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
            text="Desde una tematica"
            variant={mode === 'topic' ? 'primary' : 'secondary'}
            isActive={mode === 'topic'}
            onClick={() => setMode('topic')}
          />
        </div>
      </Flex>

      <Box style={{ overflow: 'auto', height: '100%' }}>
        <PostPreview post={post ?? undefined} />
        {loading && <Loader type='dots' />}
      </Box>

      <form className={styles.inputForm} onSubmit={(e) => e.preventDefault()}>
        <CustomTextInput
          label={mode === 'article' ? 'Ingresa el link del artículo' : 'Ingresa la tematica'}
          value={input}
          onChange={setInput}
          placeholder={ mode === 'article' ? 'http://' : 'Novedades React 19'}
        />
        <CtaButton
          text="Generar contenido"
          onClick={() => handleCreateContent(input)}
          disabled={input.trim() === '' || loading}
        />
      </form>

      <Modal renderContent={(post) => <PostPreview post={post} />} />
    </section>
  );
};

export default Dashboard;
