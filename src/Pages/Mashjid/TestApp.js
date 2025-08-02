import React, { useEffect, useRef, useState } from "react";

const SERVER_URL = "https://structured-backend.onrender.com"; // update if hosted elsewhere

const TestApp = () => {
   const [isBroadcaster, setIsBroadcaster] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket(SERVER_URL);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  // 🔴 BROADCAST
  const startBroadcast = async () => {
    setIsBroadcaster(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });
    recorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0 && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(e.data);
      }
    };

    recorder.start(250); // Send chunks every 250ms
  };

  const stopBroadcast = () => {
    recorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsBroadcaster(false);
  };

  // 🟢 LISTEN
  const startListening = () => {
    setIsListening(true);

    mediaSourceRef.current = new MediaSource();
    const audio = new Audio();
    audioRef.current = audio;

    audio.src = URL.createObjectURL(mediaSourceRef.current);
    audio.autoplay = true;
    audio.play().catch((err) =>
      console.warn("Autoplay blocked until user interaction:", err)
    );

    mediaSourceRef.current.addEventListener("sourceopen", () => {
      const mime = "audio/webm; codecs=opus";
      if (MediaSource.isTypeSupported(mime)) {
        sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer(mime);
      } else {
        console.error("Unsupported MIME type:", mime);
      }
    });

    wsRef.current.onmessage = (event) => {
      if (!sourceBufferRef.current || !event.data) return;

      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        const tryAppend = () => {
          if (!sourceBufferRef.current.updating) {
            sourceBufferRef.current.appendBuffer(buffer);
          } else {
            setTimeout(tryAppend, 50);
          }
        };
        tryAppend();
      };
      reader.readAsArrayBuffer(event.data);
    };
  };

  const stopListening = () => {
    setIsListening(false);
    audioRef.current?.pause();
    audioRef.current?.removeAttribute("src");
    audioRef.current?.load();
    wsRef.current.onmessage = null;
    sourceBufferRef.current = null;
    mediaSourceRef.current = null;
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>Azan Feature</h2>

      {/* LISTENING */}
      {!isListening ? (
        <button onClick={startListening} style={buttonStyle}>
          🔊 Start Listening
        </button>
      ) : (
        <button onClick={stopListening} style={stopButtonStyle}>
          ⛔ Stop Listening
        </button>
      )}

      {/* BROADCASTING */}
      {!isBroadcaster ? (
        <button onClick={startBroadcast} style={buttonStyle}>
          🎙️ Start Broadcasting
        </button>
      ) : (
        <button onClick={stopBroadcast} style={stopButtonStyle}>
          🛑 Stop Broadcasting
        </button>
      )}
    </div>
  );
};

const buttonStyle = {
  margin: 10,
  padding: "12px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px",
};

const stopButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#dc3545",
};



export default TestApp;