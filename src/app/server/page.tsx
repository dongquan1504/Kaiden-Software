/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import MessageReceiver from '@/components/section/post-message-api';

const IframePage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // const [isSendMessage, setIsSendMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [receiveMessage, setReceiveMessage] = useState<string>('');

  const sendMessage = () => {
    if (iframeRef.current) {
      // setIsSendMessage(true);
      iframeRef.current.contentWindow?.postMessage(message, '*');
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Check if event.data is an object and convert it to a string
      if (typeof event.data === 'string') {
        setReceiveMessage(event.data);
      }
    };
  
    window.addEventListener('message', handleMessage);
  
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <h1>{receiveMessage}</h1>
      <div className='flex justify-between'>
      <Input value={message} onChange={(e: any) => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Send Message</Button>
      </div>

      <iframe ref={iframeRef} src="http://localhost:9000/review" style={{ width: '100%', height: '500px', border: '1px solid black' }} />
      {/* {isSendMessage &&
        <iframe ref={iframeRef} src="http://localhost:9000/review" style={{ width: '100%', height: '500px', border: '1px solid black' }} />} */}
    </div>
  );
};

export default IframePage;
