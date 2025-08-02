import React, { useEffect, useRef, useState } from "react";

const UserListener = () => {
  const audioRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);
  const queueRef = useRef([]);
  const [started, setStarted] = useState(false);

  const startListening = () => {
    setStarted(true);

    wsRef.current = new WebSocket("https://structured-backend.onrender.com"); // Replace with your server
    wsRef.current.binaryType = "arraybuffer";

    mediaSourceRef.current = new MediaSource();
    const mediaSource = mediaSourceRef.current;

    const audio = audioRef.current;
  audio.src = URL.createObjectURL(mediaSource);
  audio.load();

  mediaSource.addEventListener("sourceopen", () => {
    console.log("✅ MediaSource opened");

    if (!MediaSource.isTypeSupported("audio/webm; codecs=opus")) {
      console.error("audio/webm; codecs=opus not supported!");
      return;
    }

    try {
      sourceBufferRef.current = mediaSource.addSourceBuffer("audio/webm; codecs=opus");
    } catch (err) {
      console.error("SourceBuffer init failed", err);
      return;
    }

    const sourceBuffer = sourceBufferRef.current;

    sourceBuffer.addEventListener("updateend", () => {
      if (queueRef.current.length > 0 && !sourceBuffer.updating) {
        const next = queueRef.current.shift();
        try {
          sourceBuffer.appendBuffer(next);
        } catch (e) {
          console.error("appendBuffer failed", e);
        }
      }
    });

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket opened");
      wsRef.current.send(JSON.stringify({ type: "listener" }));
    };

    wsRef.current.onmessage = (event) => {
      if (mediaSource.readyState !== "open" || !sourceBuffer || sourceBuffer.updating) return;

      const buffer = new Uint8Array(event.data);
      if (sourceBuffer.updating || queueRef.current.length > 0) {
        queueRef.current.push(buffer);
      } else {
        try {
          sourceBuffer.appendBuffer(buffer);
        } catch (e) {
          console.error("Buffer append error:", e);
        }
      }
    };

    wsRef.current.onclose = () => {
      console.warn("WebSocket closed");
    };

    // ✅ Play AFTER sourceopen and src is set
    audio.play().then(() => {
      console.log("🎵 Audio started playing");
    }).catch((err) => {
      console.error("Initial play error:", err);
    });
  });
};

  useEffect(() => {
    return () => {
      wsRef.current?.close();
      URL.revokeObjectURL(audioRef.current?.src);
    };
  }, []);

  return (
    <div>
      <h3>🔊 Listen to Azan</h3>
      {!started ? (
        <button onClick={startListening}>Start Listening</button>
      ) : (
        <p>Connected. Listening...</p>
      )}
      <audio ref={audioRef} controls autoPlay />
    </div>
  );
};

export default UserListener;