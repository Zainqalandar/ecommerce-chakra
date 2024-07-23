'use client'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const DarkModeButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FaMoon />, <FaSun />);
  const bgColor = useColorModeValue('gray.800', 'gray.100');
  const color = useColorModeValue('white', 'black');

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={icon}
      onClick={toggleColorMode}
      position="fixed"
      bottom="20px"
      left="20px"
      bg={bgColor}
      color={color}
      _hover={{ bg: useColorModeValue('gray.700', 'gray.200') }}
      _active={{ bg: useColorModeValue('gray.600', 'gray.300') }}
      borderRadius="full"
      size="lg"
      boxShadow="lg"
    />
  );
};

export default DarkModeButton;
