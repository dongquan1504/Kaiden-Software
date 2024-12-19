/* eslint-disable @typescript-eslint/no-explicit-any */

// Function to send a message to the parent window
export const sendMessageToParent = (message: string) => {
  window.parent.postMessage(message, '*')
}

// Function to receive messages from the parent window
export const receiveMessageFromParent = (callback: (message: any) => void) => {
  const handleMessage = (event: MessageEvent) => {
    callback(event.data)
  }

  window.addEventListener('message', handleMessage)

  // Return a function to remove the event listener
  return () => {
    window.removeEventListener('message', handleMessage)
  }
}
