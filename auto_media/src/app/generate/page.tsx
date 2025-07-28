"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import CtaButton from "@/components/common/cta-button";
import { TextInput } from "@mantine/core";
import CustomTextInput from "@/components/common/customInputText";

type GenerationMode = "article" | "topic";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<GenerationMode>("article");

  const handleCreateContent = () => {
    setLoading(true);
    try {
      setTimeout(() => {
        if (mode === "article") {
          console.log("Generating from article:", input);
        } else {
          console.log("Generating from topic:", input);
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error during generation:", error);
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Generador de Contenido</h1>
      <div className={styles.header}>
        <CtaButton
          text="Desde un articulo"
          variant={mode === "article" ? "primary" : "secondary"}
          isActive={mode === "article"}
          onClick={() => setMode("article")}
        />
        <CtaButton
          text="Desde un tema"
          variant={mode === "topic" ? "primary" : "secondary"}
          isActive={mode === "topic"}
          onClick={() => setMode("topic")}
        />
      </div>
      <form className={styles.inputForm} onSubmit={(e) => e.preventDefault()}>
        <CustomTextInput
          label={mode === "article" ? "Ingresa el artículo" : "Ingresa el tema"}
          value={input}
          onChange={setInput}
          placeholder="Escribe aquí..."
        />
        <CtaButton
          text="Generar contenido"
          onClick={handleCreateContent}
          disabled={input.trim() === "" || loading}
        />
      </form>
    </section>
  );
};

export default Dashboard;
