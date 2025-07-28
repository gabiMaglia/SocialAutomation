"use client";
import { Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import PostPreview from "@/components/post-preview";
import CtaButton from "@/components/common/cta-button";

export default function Home() {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Text size="xl" variant="h1">
          Ultimos posteos
        </Text>
        <CtaButton
          text="Nuevo +"
          onClick={() => router.push("/generate")}
        />
      </header>
      <main>
        <PostPreview></PostPreview>
      </main>
    </section>
  );
}
