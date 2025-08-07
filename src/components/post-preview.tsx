'use client';

import Image from 'next/image';
import React, { forwardRef } from 'react';
import {
  Card,
  Title,
  Text,
  Group,
  Box,
  Divider,
  Anchor,
  rem,
} from '@mantine/core';
import { createStyles } from '@mantine/styles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PostData } from '@/types/postData';

interface BigPostPreviewProps {
  post: PostData;
}

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    padding: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },

  cover: {
    position: 'relative',
    height: rem(300),
    overflow: 'hidden',
    borderRadius: theme.radius.md,
  },

  title: {
    fontSize: rem(22),
    fontWeight: 700,
    lineHeight: 1.3,
    flexGrow: 1,
  },

  badge: {
    width: rem(28),
    height: rem(28),
    borderRadius: theme.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    fontWeight: 700,
    background: theme.colors.blue[6],
  },

  markdown: {
    fontSize: rem(14),
    lineHeight: 1.55,
    '& p': { marginBottom: theme.spacing.sm },
  },

  footer: {
    fontSize: rem(12),
  },
}));

/* —— Components usados en ReactMarkdown (con displayName) —— */

const MarkdownParagraph = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'p'>
>(({ children, ...props }, ref) => {
  const renderWithHashtags = (text: string) =>
    text.split(/(#\w+)/g).map((part, i) =>
      part.startsWith('#') ? (
        <Anchor
          key={i}
          href={`/tags/${part.slice(1)}`}
          color="blue"
          underline="hover"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </Anchor>
      ) : (
        part
      ),
    );

  if (!children) return null;

  const rawText =
    typeof children === 'string'
      ? children
      : Array.isArray(children)
      ? children.map((c) => (typeof c === 'string' ? c : '')).join('')
      : '';

  return (
    <p ref={ref} {...props}>
      {renderWithHashtags(rawText)}
    </p>
  );
});
MarkdownParagraph.displayName = 'MarkdownParagraph';

const MarkdownStrong = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'strong'>
>((props, ref) => <Text component="strong" fw={700} ref={ref} {...props} />);
MarkdownStrong.displayName = 'MarkdownStrong';

const MarkdownLink = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'>
>(({ href, ...props }, ref) => (
  <Anchor
    {...props}
    href={href}
    ref={ref}
    target="_blank"
    rel="noopener noreferrer"
    color="blue"
    underline="hover"
  />
));
MarkdownLink.displayName = 'MarkdownLink';

const H1 = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <Title order={1} {...props} />
);
H1.displayName = 'MarkdownH1';

const H2 = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <Title order={2} {...props} />
);
H2.displayName = 'MarkdownH2';

const H3 = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <Title order={3} {...props} />
);
H3.displayName = 'MarkdownH3';

/* ———————————————————————————————————————————————— */

export default function BigPostPreview({ post }: BigPostPreviewProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder radius="md" className={classes.card}>
      {post.imageUrl && (
        <Box className={classes.cover}>
          <Image
            src={post.imageUrl}
            alt="Post cover"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      )}

      <Group justify="space-between">
        <Title order={3} className={classes.title} lineClamp={2}>
          {post.title || 'Sin título'}
        </Title>

        <Box
          className={classes.badge}
          style={{
            background:
              post.posted && post.socialNetwork
                ? theme.colors.blue[6]
                : theme.colors.gray[4],
          }}
        >
          {post.posted && post.socialNetwork?.charAt(0).toUpperCase()}
        </Box>
      </Group>

      <Box className={classes.markdown}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: MarkdownParagraph,
            a: MarkdownLink,
            h1: H1,
            h2: H2,
            h3: H3,
            strong: MarkdownStrong,
          }}
        >
          {post.output}
        </ReactMarkdown>
      </Box>

      <Divider my="sm" />

      {post.date && (
        <Group gap="xs" c="dimmed" className={classes.footer}>
          <Text span>Creado:&nbsp;</Text>
          <Text span>{new Date(post.date).toLocaleDateString()}</Text>
        </Group>
      )}
    </Card>
  );
}
