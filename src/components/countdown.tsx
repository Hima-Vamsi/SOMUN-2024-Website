"use client";

import React from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function Countdown() {
  const targetDateUTC = new Date("2024-11-15T03:30:00Z").getTime();
  const currentTime = Date.now();

  if (currentTime > targetDateUTC) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          The event has already concluded!
        </h3>
        <p className="text-lg sm:text-xl text-gray-300">
          Thank you for joining us. See you again next year!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <FlipClockCountdown
        to={targetDateUTC}
        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
        labelStyle={{
          fontSize: "0.5rem",
          fontWeight: 500,
          textTransform: "uppercase",
          color: "white",
        }}
        digitBlockStyle={{
          width: "2rem",
          height: "3rem",
          fontSize: "1.5rem",
          backgroundColor: "#374151",
        }}
        dividerStyle={{ color: "white", height: 0 }}
        separatorStyle={{ color: "white", size: "6px" }}
        duration={0.5}
        className="flex justify-center items-center space-x-1 sm:space-x-2 lg:space-x-4"
        renderMap={[true, true, true, true]}
      />
    </div>
  );
}
