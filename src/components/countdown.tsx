"use client";

import React from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function Countdown() {
  const targetDateUTC = new Date("2024-11-15T03:30:00Z").getTime();

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
