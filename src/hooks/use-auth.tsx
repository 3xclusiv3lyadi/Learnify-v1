'use client';

import {useState, useEffect} from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return {user, isLoading};
};
