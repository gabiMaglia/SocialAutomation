'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PostData } from '@/types/postData';
import { createStyles, rem } from '@mantine/styles';
import {
  Card,
  Text,
  Group,
  Box,
  Title,
  Stack,
  ActionIcon,
  Loader,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { deletePost } from '@/lib/post.service';
import { modals } from '@mantine/modals';

interface CompactPostPreviewProps {
  post: PostData;
  onClick?: () => void;  
  onDeleted?: () => void; 
}

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    height: rem(300),
    display: 'flex',
    flexDirection: 'column',

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: theme.shadows.md,
    },
  },
  cover: {
    position: 'relative',
    height: rem(140),
    overflow: 'hidden',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },
  title: { fontSize: rem(18), fontWeight: 600, lineHeight: 1.3 },
  excerpt: { lineHeight: 1.35, flexGrow: 1 },
  footer: { fontSize: rem(12) },
  trash: {
    position: 'absolute',
    top: rem(6),
    left: rem(6),
    zIndex: 2,
    background: theme.white,
    borderRadius: theme.radius.sm,
  },
}));

export default function CompactPostPreview({
  post,
  onClick,
  onDeleted,
}: CompactPostPreviewProps) {
  const { classes } = useStyles();
  const [deleting, setDeleting] = useState(false);

  const excerpt =
    post.output?.split('\n').filter(Boolean).slice(3, 5).join(' ') || '';

  const confirmDelete = () =>
    modals.openConfirmModal({
      title: 'Eliminar post',
      centered: true,
      children: (
        <Text size="sm">
          ¿Seguro que deseas eliminar este post? Esta acción no se puede
          deshacer.
        </Text>
      ),
      labels: { confirm: 'Eliminar', cancel: 'Cancelar' },
      confirmProps: { color: 'red' },
      onConfirm: handleDelete,
    });

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await deletePost(post.id!);
      onDeleted?.();
    } catch (err) {
      console.error('[CompactPostPreview] delete error:', err);
    } finally {
      setDeleting(false);
      modals.closeAll();
    }
  };

  return (
    <Card withBorder radius="md" className={classes.card} onClick={onClick}>
      {/* Papelera con confirmación */}
      <ActionIcon
        className={classes.trash}
        variant="subtle"
        color="red"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          confirmDelete();
        }}
      >
        {deleting ? <Loader size="xs" /> : <IconTrash size={16} />}
      </ActionIcon>

      {post.imageUrl && (
        <Box className={classes.cover}>
          <Image
            src={post.imageUrl}
            alt="Post cover"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      )}

      <Stack p="md" gap="xs" style={{ flex: 1 }}>
        <Title order={4} className={classes.title} lineClamp={2}>
          {post.title || 'Sin título'}
        </Title>

        <Text className={classes.excerpt} lineClamp={3}>
          {excerpt}
        </Text>

        {post.date && (
          <Group gap="xs" c="dimmed" className={classes.footer}>
            <Text span>Creado:&nbsp;</Text>
            <Text span>{new Date(post.date).toLocaleDateString()}</Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
}
