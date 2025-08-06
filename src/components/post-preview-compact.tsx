import React from "react";
import Image from "next/image";
import {
  Card,
  Text,
  Group,
  Box,
  useMantineTheme,
  rem,
  Title,
} from "@mantine/core";
import { PostData } from "@/types/postData";

interface CompactPostPreviewProps {
  post: PostData;
  onClick?: () => void;
}

const CompactPostPreview = ({ post, onClick }: CompactPostPreviewProps) => {
  const theme = useMantineTheme();

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
      {post.imageUrl && (
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
      )}
      <Title
        order={4}
        style={{
          fontSize: rem(20),
          fontWeight: 600,
          color: theme.colors.dark[1],
        }}
      >
        {post.title || ""}
      </Title>
      <Box p="sm" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text fw={600} lineClamp={2} style={{ flexGrow: 1 }}>
          {post.output.split("\n")[3]}
          {post.output.split("\n")[4]}
        </Text>
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

export default CompactPostPreview;
