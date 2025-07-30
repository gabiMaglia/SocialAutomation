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
  Skeleton,
  Flex,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PostData } from "@/types/postData";

interface PostPreviewProps {
  post?: PostData;
  compactMode?: boolean;
  onClick?: () => void;
}

const PostPreview = ({
  post,
  compactMode = false,
  onClick,
}: PostPreviewProps) => {
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

  // eslint-disable-next-line react/display-name
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

  if (!post) {
  return (
    <Flex
      w="100%"
      h={300}
      justify="center"
      align='center'
    
 
      style={{
        textAlign: 'center',
        border: '1px dashed #ccc',
        borderRadius: '8px',
        padding: '1rem',
        color: '#666',
        fontStyle: 'italic',
      }}
    >
      ¿En base a qué quieres que genere un posteo?
    </Flex>
  );
}


  if (compactMode) {
    return (
      <Card
        withBorder
        radius="md"
        style={{
          width: rem(300),
          height: rem(300),
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
        onClick={onClick}
      >
        {post.imageUrl ? (
          <Box
            style={{
              width: "100%",
              height: rem(120),
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
        ) : (
          <Skeleton height={rem(120)} radius="md" />
        )}

        <Box
          p="sm"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Text fw={600} lineClamp={2} style={{ flexGrow: 1 }}>
            {post.output.split("\n")[3]}
            {post.output.split("\n")[4]}
          </Text>
          <Group gap="xs" c="dimmed" mt="auto" style={{ fontSize: rem(12) }}>
            <Text span>
              {post.date ? new Date(post.date).toLocaleDateString() : ""}
            </Text>
          </Group>
        </Box>
      </Card>
    );
  }

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
              color: theme.colors.dark[7],
              flexGrow: 1,
            }}
          >
            {post.title || "Proxies con Redux"}
          </Title>
          <Box
            style={{
              width: rem(24),
              height: rem(24),
              backgroundColor: "#0a66c2",
              borderRadius: theme.radius.sm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.white,
              fontWeight: "bold",
            }}
          >
            L
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
          <Text span>5 reacciones</Text>
          <Text span>•</Text>
          <Text span>2 comentarios</Text>
          {post.date && (
            <>
              <Text span>•</Text>
              <Text span>{new Date(post.date).toLocaleDateString()}</Text>
            </>
          )}
        </Group>
      </Box>
    </Card>
  );
};

export default PostPreview;
