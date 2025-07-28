"use client";

import React from "react";
import { createStyles } from "@mantine/styles";

interface CustomTextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 12,
  },
  input: {
    width: "100%",
    borderRadius: 128,
    height: 48,
    padding: "0 20px",
    border: "1px solid #0a0a0a",
    backgroundColor: "#ffffff",
    color: "#0a0a0a",
    fontSize: 16,
    lineHeight: "20px",
    fontWeight: 500,
    transition: "border-color .2s, box-shadow .2s",
    outline: "none",
    
    "&:hover": {
      borderColor: "#4a4a4a",
    },
    
    "&:focus": {
      borderColor: "#0a0a0a",
      boxShadow: "0 0 0 2px rgba(10, 10, 10, 0.2)",
    },
  },
}));

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.wrapper}>
      {label && <label className={classes.label}>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cx(classes.input, className)}
      />
    </div>
  );
};

export default CustomTextInput;