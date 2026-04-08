import React from 'react';

export function useWebSocket(isLoggedIn) {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    if (!isLoggedIn) {
      setIsConnected(false);
      return;
    }

    // Determine the WebSocket protocol based on current page protocol
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Connect to localhost:4000 for backend
    const wsUrl = `${wsProtocol}//localhost:4000`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'newReply') {
        const userName = localStorage.getItem("userName") || "Anonymous";
        if (data.user === userName) {
          alert(`You have a new reply from ${data.replyFromUser} on ${data.board}!`);
        }
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return isConnected;
}
