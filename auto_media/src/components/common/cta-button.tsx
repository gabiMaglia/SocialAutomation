"use client";

import React from "react";
import { createStyles } from "@mantine/styles";

type CtaVariant = "primary" | "secondary";

interface CtaButtonProps {
  text: string;
  variant?: CtaVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  isActive?: boolean; 
}

const useStyles = createStyles(
  (_theme, { variant, isActive }: { variant: CtaVariant; isActive?: boolean }) => ({
    root: {
      appearance: "none",
      borderRadius: 128,
      height: 48,
      padding: "0 20px",
      border: "1px solid transparent",
      transition: "background .2s,color .2s,border-color .2s",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      lineHeight: "20px",
      fontWeight: 500,

      ...(variant === "primary" && {
        background: "#0a0a0a",
        color: "#ededed",
        gap: 8,
        ...(!isActive && { 
          "&:hover": {
            background: "#ededed",
            color: "#0a0a0a",
          },
        }),
      }),

      ...(variant === "secondary" && {
        background: "transparent",
        color: "#0a0a0a",
        borderColor: "#e2e8f0",
        minWidth: 158,
        ...(!isActive && { 
          "&:hover": {
            background: "#0a0a0a",
            color: "#ededed",
          },
        }),
      }),
    },
  })
);

const CtaButton: React.FC<CtaButtonProps> = ({
  text,
  disabled = false,
  variant = "primary",
  onClick,
  className,
  isActive = false,
}) => {
  const { classes, cx } = useStyles({ variant, isActive });

  return (
    <button 
      disabled={disabled} 
      className={cx(classes.root, className)} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CtaButton;