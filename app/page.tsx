"use client";

import { useState } from "react";
import signatures from "@/data/signatures.json";

const DEFAULT_BACKGROUND = "rgb(208, 204, 227)";
const DEFAULT_TEXT = "rgb(28, 28, 63)";

type Signature = {
  username: string;
  message: string;
  backgroundColor?: string;
  textColor?: string;
  url?: string;
  originalIndex: number;
};

function SignatureCard({ signature }: { signature: Signature }) {
  const bg = signature.backgroundColor || DEFAULT_BACKGROUND;
  const text = signature.textColor || DEFAULT_TEXT;

  const card = (
    <div
      className="break-inside-avoid mb-4 transition-all duration-200 hover:scale-105 hover:z-20 cursor-pointer"
      style={{
        backgroundColor: bg,
        color: text,
      }}
    >
      <div className="backdrop-blur-sm p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="font-semibold break-words">@{signature.username}</div>
        <div className="text-xs mt-1 break-words">{signature.message}</div>
      </div>
    </div>
  );

  return signature.url ? (
    <a
      key={signature.originalIndex}
      href={signature.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Signature by ${signature.username}`}
      className="no-underline"
    >
      {card}
    </a>
  ) : (
    <div key={signature.originalIndex}>{card}</div>
  );
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSignatures = signatures
    .map((signature, originalIndex) => ({ ...signature, originalIndex }))
    .filter(
      (s) =>
        s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <main className="min-h-screen bg-background relative">
      {/* Header (flexbox layout) */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md py-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between z-20 p-4">
        {/* Title */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Freedom Wall
          </h1>
          <p className="text-xs md:text-sm text-foreground font-medium">
            Hacktoberfest 2025
          </p>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search signatures..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-foreground backdrop-blur-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64 text-background"
        />
      </div>

      {/* Masonry Grid */}
      <div className="mt-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
        {filteredSignatures.map((signature) => (
          <SignatureCard key={signature.originalIndex} signature={signature} />
        ))}
      </div>
    </main>
  );
}
