"use client";

import { useEffect, useState } from 'react';

export default function ClientOnlyWrapper({ children, fallback = null }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return fallback;
  }
  
  return <>{children}</>;
}