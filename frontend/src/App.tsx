import React, { useEffect, useRef, useState } from "react";

function App() {
  const [translatedText, setTranslatedText] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`wss://gistit-production.up.railway.app/ws`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTranslatedText(data.translated);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendAudio = () => {
    // Placeholder: In real app, send audio bytes
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send("Hello, how are you?");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Real-Time Speech Translator</h1>
      <button onClick={sendAudio}>Send Audio (Placeholder)</button>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
}

export default App;
