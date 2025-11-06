
"use client";

import { useState, useEffect, useCallback, type SVGProps } from "react";

const SparklesIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
    <path d="M5 21L6 17" />
    <path d="M19 21L18 17" />
  </svg>
);

type Spotlight = {
  quote: string;
  handle: string;
};

export default function CreatorSpotlight() {
  const [spotlight, setSpotlight] = useState<Spotlight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateSpotlight = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/spotlight");
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const generatedSpotlight = (await response.json()) as Spotlight;
      
      // Basic validation of the response structure
      if (generatedSpotlight.quote && generatedSpotlight.handle) {
        setSpotlight(generatedSpotlight);
      } else {
        throw new Error("Received invalid data structure from the server.");
      }
    } catch (e) {
      console.error(e);
      setError("Failed to generate a new spotlight. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    generateSpotlight();
  }, [generateSpotlight]);

  return (
    <section className="relative flex flex-col gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-8 text-neutral-200">
      <h2 className="text-2xl font-semibold text-brand-foreground">Creator spotlight</h2>
      
      <div className="flex min-h-[100px] flex-col justify-center">
        {isLoading ? (
          <p className="animate-pulse text-sm text-neutral-300">Generating inspiration...</p>
        ) : error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : spotlight ? (
          <div key={spotlight.quote} className="animate-fade-in">
            <p className="max-w-2xl text-sm text-neutral-300">
              “{spotlight.quote}”
            </p>
            <span className="mt-4 text-xs uppercase tracking-[0.35em] text-brand-foreground/70">
              — {spotlight.handle}
            </span>
          </div>
        ) : null}
      </div>

      <button
        onClick={generateSpotlight}
        disabled={isLoading}
        className="absolute right-6 top-6 rounded-full p-2 text-brand-foreground/70 transition-colors hover:bg-brand/20 hover:text-brand-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:animate-pulse-subtle"
        aria-label={isLoading ? "Generating new creator spotlight" : "Generate new creator spotlight"}
        aria-busy={isLoading}
      >
        <SparklesIcon className="h-5 w-5" />
      </button>
    </section>
  );
}