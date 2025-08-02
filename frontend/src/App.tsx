// frontend/src/App.tsx
import React, { useEffect, useRef, useState } from "react";
import logo from "./assets/gistit.png"; // Ensure the logo is placed at src/assets/gistit.png
import MicInput from "./components/MicInput"; // Step 2 - Import your MicInput component

function App() {
  const [translatedText, setTranslatedText] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the backend WebSocket
    ws.current = new WebSocket("wss://gistit-production.up.railway.app/ws");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTranslatedText(data.translated);
    };

    return () => {
      // Cleanup WebSocket on component unmount
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendAudio = () => {
    // Placeholder: Replace this with actual audio byte stream in real app
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send("Hello, how are you?");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <img src={logo} alt="Gistit Logo" width="100" style={{ marginBottom: 20 }} />
      <h1 style={{ color: "#1f2937" }}>Gistit - Real-Time Speech Translator</h1>

      {/* Step 2 - MicInput component */}
      <MicInput />

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
          marginTop: "20px",
        }}
      >
        Send Audio (Placeholder)
      </button>

      <p style={{ fontSize: "18px", marginTop: "30px", color: "#111827" }}>
        <strong>Translated Text:</strong> {translatedText}
      </p>
    </div>
  );
}

export default App;
