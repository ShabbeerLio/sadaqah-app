import React, { useEffect, useRef } from "react";

const UserListener = () => {
  const audioContextRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Create audio context
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    // Connect to WebSocket
    wsRef.current = new WebSocket("wss://structured-backend.onrender.com");
    wsRef.current.binaryType = "arraybuffer";

    // Identify as listener
    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({ type: "listener" }));
    };

    // Play received audio chunks
    wsRef.current.onmessage = async (event) => {
      try {
        const arrayBuffer = event.data;
        audioContextRef.current.decodeAudioData(arrayBuffer, (audioBuffer) => {
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContextRef.current.destination);
          source.start();
        }, (err) => {
          console.error("decodeAudioData error:", err);
        });
      } catch (err) {
        console.error("Playback error:", err);
      }
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div>
      <h2>User Listener</h2>
      <p>Listening to live audio broadcast...</p>
    </div>
  );
};

export default UserListener;