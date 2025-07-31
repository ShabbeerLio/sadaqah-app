import React, { useEffect, useRef } from "react";

const UserListener = () => {
  const audioRef = useRef(null);
  const wsRef = useRef(null);
  const mediaSourceRef = useRef(null);
  const sourceBufferRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket("https://structured-backend.onrender.com");
    wsRef.current.binaryType = "arraybuffer";

    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({ type: "listener" }));
    };

    mediaSourceRef.current = new MediaSource();
    mediaSourceRef.current.addEventListener("sourceopen", () => {
      sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer('audio/webm; codecs="opus"');
    });

    audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);
    audioRef.current.play();

    wsRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "media" && sourceBufferRef.current) {
        const buffer = new Uint8Array(data.payload);
        if (!sourceBufferRef.current.updating) {
          sourceBufferRef.current.appendBuffer(buffer);
        }
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, []);

  return (
    <div>
      <h2>User Listener</h2>
      <audio ref={audioRef} controls />
    </div>
  );
};

export default UserListener;