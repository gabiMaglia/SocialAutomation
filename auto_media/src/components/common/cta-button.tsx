'use client';

import React from 'react';
import { createStyles } from '@mantine/styles';

type CtaVariant = 'primary' | 'secondary';

interface CtaButtonProps {
  text: string;
  variant?: CtaVariant;
  onClick?: () => void;
  className?: string;
}

const useStyles = createStyles(
  (_theme, { variant }: { variant: CtaVariant }) => ({
    root: {
      /* base (.ctas p) */
      appearance: 'none',
      borderRadius: 128,
      height: 48,
      padding: '0 20px',
      border: '1px solid transparent',
      transition: 'background .2s,color .2s,border-color .2s',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 500,

      /* primary */
      ...(variant === 'primary' && {
        background: '#0a0a0a',   // ← fondo fijo
        color: '#ededed',        // ← texto fijo
        gap: 8,
      }),

      /* secondary */
      ...(variant === 'secondary' && {
        background: 'transparent',
        color: '#0a0a0a',
        borderColor: '#e2e8f0', 
        minWidth: 158,
        '&:hover': {
          background: '#0a0a0a',  
          color: '#ededed',
        },
      }),
    },
  })
);

const CtaButton: React.FC<CtaButtonProps> = ({
  text,
  variant = 'primary',
  onClick,
  className,
}) => {
  const { classes, cx } = useStyles({ variant });

  return (
    <button
        
      className={cx(classes.root, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CtaButton;
