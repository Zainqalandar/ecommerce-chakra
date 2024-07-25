'use client'
import CustomNotification from '@/components/ui/CustomNotification.js';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const notify = useCallback((message, status = 'info', duration = 3000) => {
    setNotification({ message, status, duration });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setNotification(null);
    }, duration);

    setTimeoutId(id);
  }, [timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {notification && (
        <CustomNotification
          message={notification.message}
          status={notification.status}
          duration={notification.duration}
        />
      )}
    </NotificationContext.Provider>
  );
};