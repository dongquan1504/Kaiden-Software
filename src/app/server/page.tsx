/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useRef, useState } from 'react';
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { receiveMessageFromParent } from '@/services/post-message-api';

const pdfFiles = [{
  id: 1,
  doc_url: "https://icw-data-dev.oss-cn-hongkong.aliyuncs.com/202/519a6a15-cca0-4562-f0f3-985edf9f1b76%2CCPC.pdf?OSSAccessKeyId=LTAIMUAAHQh0NsL5&Expires=1735295608&Signature=JJ4moTf5dvd2YYujHV2p4Juvk8A%3D"
},
{
  id: 2,
  doc_url: "https://icw-data-dev.oss-cn-hongkong.aliyuncs.com/202/1360eb86-8777-4b90-b184-9b8c2c5eec82%2CCPC_85232630148_Magnet.pdf?OSSAccessKeyId=LTAIMUAAHQh0NsL5&Expires=1735295904&Signature=LosnGPnfbmIE8LCf9TwNsKgIcWg%3D"
},
{
  id: 3,
  doc_url: "https://icw-data-dev.oss-cn-hongkong.aliyuncs.com/202/fa091712-1403-402f-cc75-443717bac7fc%2CUL-1001364040.pdf?OSSAccessKeyId=LTAIMUAAHQh0NsL5&Expires=1735295999&Signature=kSl3C4L82YTsJPHHGjpODiIlo9s%3D"
}]

const IframePage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [receiveMessage, setReceiveMessage] = useState<string>('');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const handleDialogOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setIframeKey(prevKey => prevKey + 1); // Change the key to force rerender
    }
  };

  const handleIframeLoad = () => {
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage(pdfFiles, '*');
      }
    }, 400);
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
      <Dialog onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button>
            Send Message
          </Button>
        </DialogTrigger>
        <DialogContent className='flex flex-col items-center justify-center w-full h-full max-w-none max-h-none'>
          <iframe
            key={iframeKey}
            ref={iframeRef}
            src="http://localhost:9000/review"
            onLoad={handleIframeLoad}
            style={{ width: '100%', height: '800px', border: '1px solid black' }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IframePage;
