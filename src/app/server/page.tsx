"use client"
import { useEffect } from 'react';

const IframePage = () => {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('Hello, I have receive your message, are you type: \"', event.data, "\" ?");
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>Iframe Page</h1>
    </div>
  );
};

export default IframePage;
