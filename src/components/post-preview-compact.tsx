'use client';

import Image from 'next/image';
import { PostData } from '@/types/postData';
import { createStyles, rem } from '@mantine/styles';
import { Card, Text, Group, Box, Title, Stack } from '@mantine/core';
interface CompactPostPreviewProps {
  post: PostData;
  onClick?: () => void;
}

const useStyles = createStyles((theme) => ({
  card: {
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

  title: {
    fontSize: rem(18),
    fontWeight: 600,
    lineHeight: 1.3,
  },

  excerpt: {
    lineHeight: 1.35,
    flexGrow: 1,
  },

  footer: {
    fontSize: rem(12),
  },
}));

export default function CompactPostPreview({
  post,
  onClick,
}: CompactPostPreviewProps) {
  const { classes } = useStyles();

  const excerpt =
    post.output
      ?.split('\n')
      .filter(Boolean)
      .slice(3, 5)
      .join(' ') || '';

  return (
    <Card withBorder radius="md" className={classes.card} onClick={onClick}>
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
