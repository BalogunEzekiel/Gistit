import React, { useEffect, useState } from "react";

function App() {
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`${window.location.origin.replace(/^http/, "ws")}/ws`);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTranslatedText(data.translated);
    };
    return () => ws.close();
  }, []);

  const sendAudio = () => {
    // Placeholder: In real app, send audio bytes
    ws.send("Hello, how are you?");
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
