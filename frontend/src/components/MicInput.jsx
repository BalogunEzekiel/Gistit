import { useEffect, useState } from 'react';

export default function MicInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition;

    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition(); // Chrome only
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript);
      };

      if (isRecording) recognition.start();
      else recognition.stop();
    }

    return () => recognition && recognition.stop();
  }, [isRecording]);

  return (
    <div className="p-4">
      <button
        className={`px-4 py-2 rounded text-white ${
          isRecording ? 'bg-red-600' : 'bg-gistitGreen'
        }`}
        onClick={() => setIsRecording(!isRecording)}
      >
        {isRecording ? 'Stop' : 'Start'} Mic
      </button>
      <p className="mt-4 text-gray-800">{transcript}</p>
    </div>
  );
}
