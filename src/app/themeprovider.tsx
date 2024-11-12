"use client"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface ThemeStylesCreateProps {
  children: React.ReactNode
}

export default function ThemeStyles({ children }: ThemeStylesCreateProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      {children}
    </ThemeProvider>
  );
}