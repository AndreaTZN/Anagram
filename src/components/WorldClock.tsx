"use client";

import { useEffect, useState } from "react";

function getTime(timezone: string) {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
}

export default function WorldClock() {
  const [paris, setParis] = useState<string | null>(null);
  const [newYork, setNewYork] = useState<string | null>(null);

  useEffect(() => {
    function tick() {
      setParis(getTime("Europe/Paris"));
      setNewYork(getTime("America/New_York"));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <span className="text-white text-xs leading-[0.9] tracking-[-0.01em] whitespace-nowrap">
        Paris: {paris}
      </span>
      <div className="w-1 h-1 rounded-full bg-white shrink-0" />
      <span className="text-white text-xs leading-[0.9] tracking-[-0.01em] whitespace-nowrap">
        New York: {newYork}
      </span>
    </>
  );
}
