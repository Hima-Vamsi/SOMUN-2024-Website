"use client";

import { useState, useEffect } from "react";

const crypticCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function CrypticText({
  text = "To Be Announced",
  interval = 100,
}) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText((prevText) => {
          const newChar = text[currentIndex - 1] || getRandomCrypticChar();
          return prevText.slice(0, -1) + newChar + getRandomCrypticChar();
        });
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setDisplayText(text);
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [text, interval]);

  const getRandomCrypticChar = () => {
    return crypticCharacters[
      Math.floor(Math.random() * crypticCharacters.length)
    ];
  };

  return (
    <div className="flex justify-center items-center pt-6 bg-black">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap");

        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
              -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
              0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
              0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
              -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
              0.05em 0 0 rgba(0, 255, 0, 0.75),
              0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
              -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
              -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }
      `}</style>
      <p
        className="text-4xl md:text-6xl text-green-500 font-mono animate-pulse"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          animation: "glitch 1s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {displayText}
      </p>
    </div>
  );
}
