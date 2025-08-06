import React from "react";
import Image from "next/image";
import {
  Card,
  Text,
  Group,
  Box,
  Divider,
  Title,
  Anchor,
  useMantineTheme,
  rem,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PostData } from "@/types/postData";

interface BigPostPreviewProps {
  post: PostData;
}

const BigPostPreview = ({ post }: BigPostPreviewProps) => {
  const theme = useMantineTheme();

  const renderWithHashtags = (text: string) => {
    return text.split(/(#\w+)/g).map((part, i) => {
      if (part.startsWith("#")) {
        return (
          <Anchor
            key={i}
            href={`/tags/${part.slice(1)}`}
            c="#0a66c2"
            style={{ display: "inline" }}
            underline="hover"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </Anchor>
        );
      }
      return part;
    });
  };

  const CustomParagraph = React.forwardRef<
    HTMLParagraphElement,
    React.ComponentPropsWithoutRef<"p">
  >(({ children, ...props }, ref) => {
    if (!children) return null;

    const textContent =
      typeof children === "string"
        ? children
        : Array.isArray(children)
        ? children.map((c) => (typeof c === "string" ? c : "")).join("")
        : "";

    return (
      <p ref={ref} {...props} style={{ marginBottom: rem(16) }}>
        {renderWithHashtags(textContent)}
      </p>
    );
  });

  // eslint-disable-next-line react/display-name
  const CustomStrong = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"strong">
  >((props, ref) => <Text component="strong" fw={700} ref={ref} {...props} />);

  return (
    <Card
      withBorder
      radius="md"
      style={{
        width: "100%",
        fontFamily: "...",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      {post.imageUrl && (
        <Box
          style={{
            width: "100%",
            height: rem(300),
            position: "relative",
            overflow: "hidden",
            borderTopLeftRadius: theme.radius.md,
            borderTopRightRadius: theme.radius.md,
          }}
        >
          <Image
            src={post.imageUrl}
            alt="Post cover"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
      )}

      <Box p="md">
        <Group justify="space-between" mb="sm">
          <Title
            order={4}
            style={{
              fontSize: rem(20),
              fontWeight: 600,
              color: theme.colors.dark[1],
              flexGrow: 1,
            }}
          >
            {post.title || ""}
          </Title>
          <Box
            style={{
              width: rem(24),
              height: rem(24),
              backgroundColor: post.posted? "#0a66c2" : theme.colors.gray[4],
              borderRadius: theme.radius.sm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.white,
              fontWeight: "bold",
            }}
          >
            {post.posted && post?.socialNetwork?.charAt(0).toUpperCase()}
           
          </Box>
        </Group>

        <Box style={{ fontSize: rem(14), lineHeight: 1.5 }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: CustomParagraph,
              a: ({ node, ...props }) => (
                <Anchor
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  c="#0a66c2"
                  underline="hover"
                />
              ),
              h1: ({ node, ...props }) => <Title order={1} {...props} />,
              h2: ({ node, ...props }) => <Title order={2} {...props} />,
              h3: ({ node, ...props }) => <Title order={3} {...props} />,
              strong: CustomStrong,
            }}
          >
            {post.output}
          </ReactMarkdown>
        </Box>

        <Divider my="sm" />

        <Group gap="xs" c="dimmed" style={{ fontSize: rem(12) }}>
          {post.date && (
            <>
              <Text span>Creado en la fecha:</Text>
              <Text span>{new Date(post.date).toLocaleDateString()}</Text>
            </>
          )}
        </Group>
      </Box>
    </Card>
  );
};

export default BigPostPreview;