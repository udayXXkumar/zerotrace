"use client";
import { useEffect, useState } from "react";

export default function Typing({ text, speed = 30 }: { text: string; speed?: number }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span className="text-cyan-300 caret">{out}</span>;
}


