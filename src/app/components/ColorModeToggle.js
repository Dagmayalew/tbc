'use client';

import { IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ColorModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      size="2xs"
      aria-label="Toggle color mode"
      icon={resolvedTheme === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;
