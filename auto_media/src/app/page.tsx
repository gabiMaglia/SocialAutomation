'use client'
import { Text } from "@mantine/core";
import styles from "./page.module.css";
import PostPreview from "@/components/post-preview";

export default function Home() {
  return (
      <section className={styles.container}>
        <header className={styles.header}>
            <Text size="xl" variant="h1">Ultimos posteos</Text>
            <div className={styles.ctas}>
              <p className={styles.primary}>Nuevo +</p>
            </div>
        </header>
         <main>
            <PostPreview></PostPreview>
         </main> 
      </section>
  );
}
