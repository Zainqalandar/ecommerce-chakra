import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const CustomNotification = ({ message, status = 'info', duration = 5000 }) => {
  const toast = useToast();

  useEffect(() => {
    if (message) {
      toast({
        title: message,
        status: status,
        duration: duration,
        isClosable: true,
        position: 'top',
        variant: 'subtle',
        containerStyle: {
          maxWidth: '90%',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
        },
      });
    }
  }, [message, status, duration, toast]);

  return null; // This component does not render anything itself
};

export default CustomNotification;
