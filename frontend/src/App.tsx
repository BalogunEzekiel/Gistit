import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/gistit.png"; // Assuming you've placed the logo in src/assets

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
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <img src={logo} alt="Gistit Logo" width="100" style={{ marginBottom: 20 }} />
      <h1 style={{ color: "#1f2937" }}>Gistit - Real-Time Speech Translator</h1>
      <button
        onClick={sendAudio}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Send Audio (Placeholder)
      </button>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        <strong>Translated Text:</strong> {translatedText}
      </p>
    </div>
  );
}

export default App;
