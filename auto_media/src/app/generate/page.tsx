"use client";
import React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import CtaButton from "@/components/common/cta-button";

const Dashboard = () => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.header}>
          <CtaButton
            text="Generar desde un articulo"
            onClick={() => console.log("Generate")}
          />

          <CtaButton
            text="Generar desde un tema"
            onClick={() => console.log("Config")}
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
