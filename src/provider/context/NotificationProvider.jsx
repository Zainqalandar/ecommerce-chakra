'use client'
import CustomNotification from '@/components/ui/CustomNotification.js';
import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, status = 'info', duration = 5000) => {
    setNotification({ message, status, duration });
  }, []);

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
