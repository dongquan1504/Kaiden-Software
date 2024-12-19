/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useState } from 'react';
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { receiveMessageFromParent } from '@/services/post-message-api';

const pdfFiles = [{
  id: 1,
  doc_url: "https://www.aeee.in/wp-content/uploads/2020/08/Sample-pdf.pdf"
},
{
  id: 2,
  doc_url: "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf"
}]

const IframePage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSended, setIsSended] = useState<boolean>(false);
  const [receiveMessage, setReceiveMessage] = useState<string>('');

  const sendMessage = () => {
    setIsSended(true);
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage(pdfFiles, '*');
    }
  };

  useEffect(() => {
    const cleanup = receiveMessageFromParent((message) => {
      if (typeof message === 'string') {
        setReceiveMessage(message)
      }
    })

    // Cleanup the event listener on component unmount
    return cleanup
  }, []);

  return (
    <div>
      <h1>{receiveMessage}</h1>
      <div className='flex justify-between'>
        <Button onClick={sendMessage}>Send Message</Button>
      </div>

      {/* <iframe ref={iframeRef} src="http://localhost:9000/review" style={{ width: '100%', height: '500px', border: '1px solid black' }} /> */}
        <iframe ref={iframeRef} src="http://localhost:9000/review" style={{ width: '100%', height: '500px', border: '1px solid black', display: isSended ? "block" : "none" }} />
    </div>
  );
};

export default IframePage;
