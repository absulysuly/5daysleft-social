"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react";

type Spotlight = {
  quote: string;
  handle: string;
};

const FALLBACK_SPOTLIGHT: Spotlight = {
  quote:
    "I’ve never felt more supported leading up to a launch. The countdown keeps the hype alive, and the community keeps me accountable.",
  handle: "@futurewave",
};

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

async function fetchSpotlight(signal?: AbortSignal): Promise<Spotlight> {
  const response = await fetch("/api/spotlight", { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as Partial<Spotlight>;

  if (typeof payload?.quote === "string" && typeof payload?.handle === "string") {
    return { quote: payload.quote, handle: payload.handle };
  }

  throw new Error("Received invalid data structure from the server.");
}

export default function CreatorSpotlight(): JSX.Element {
  const [spotlight, setSpotlight] = useState<Spotlight>(FALLBACK_SPOTLIGHT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSpotlight = useCallback(
    async (signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        const generated = await fetchSpotlight(signal);
        setSpotlight(generated);
      } catch (err) {
        const errorInstance = err instanceof Error ? err : new Error(String(err));

        if (errorInstance.name !== "AbortError") {
          console.error("Failed to generate spotlight", errorInstance);
          setError("Failed to generate a new spotlight. Showing a favorite instead.");
          setSpotlight(FALLBACK_SPOTLIGHT);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadSpotlight(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadSpotlight]);

  const title = useMemo(
    () => (isLoading ? "Generating creator spotlight" : "Creator spotlight"),
    [isLoading],
  );

  return (
    <section className="relative flex flex-col gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-8 text-neutral-200">
      <h2 className="text-2xl font-semibold text-brand-foreground">{title}</h2>

      <div className="flex min-h-[100px] flex-col justify-center gap-3">
        {isLoading ? (
          <p className="animate-pulse text-sm text-neutral-300">Generating inspiration...</p>
        ) : (
          <>
            {error ? <p className="text-sm text-red-400">{error}</p> : null}
            <div key={spotlight.quote} className="animate-fade-in">
              <p className="max-w-2xl text-sm text-neutral-300">“{spotlight.quote}”</p>
              <span className="mt-4 text-xs uppercase tracking-[0.35em] text-brand-foreground/70">
                — {spotlight.handle}
              </span>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => loadSpotlight()}
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
