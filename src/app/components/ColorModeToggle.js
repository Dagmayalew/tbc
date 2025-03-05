'use client';

import { IconButton } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const ColorModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleColorMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
    size="2xs"
      aria-label="Toggle color mode"
      icon={theme === 'light' ? <FaMoon /> : <FaSun />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorModeToggle;
