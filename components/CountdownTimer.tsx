"use client";

import { useState, useEffect, useCallback } from 'react';

// A real-world application should use a fixed UTC date from a server/environment variable.
// For this example, we'll set it 5 days from the moment the component first renders.
const getLaunchDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date;
};

const CountdownTimer = () => {
  // FIX: Defer setting launchDate to useEffect to prevent SSR/hydration mismatch.
  const [launchDate, setLaunchDate] = useState<Date>();

  useEffect(() => {
    setLaunchDate(getLaunchDate());
  }, []);

  const calculateTimeLeft = useCallback(() => {
    // FIX: Guard against launchDate being undefined during initial render.
    if (!launchDate) {
      return {};
    }
    const difference = +launchDate - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }, [launchDate]);

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    // FIX: Re-initialize interval when calculateTimeLeft is updated (when launchDate is set).
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <div key={interval} className="flex flex-col items-center">
      <span className="text-4xl font-bold tracking-tight text-brand-foreground sm:text-5xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs font-medium uppercase tracking-widest text-brand-foreground/70">
        {interval}
      </span>
    </div>
  ));

  // FIX: Render a skeleton/placeholder during SSR and initial client render to avoid hydration mismatch and content layout shift.
  if (!launchDate) {
    const placeholders = ['days', 'hours', 'minutes', 'seconds'];
    return (
      <div className="flex w-full justify-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10 sm:gap-8">
        {placeholders.map((interval) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-4xl font-bold tracking-tight text-brand-foreground sm:text-5xl">
              --
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-brand-foreground/70">
              {interval}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10 sm:gap-8">
      {timerComponents.length ? timerComponents : <span className="text-2xl font-bold text-brand">We&apos;ve Launched!</span>}
    </div>
  );
};

export default CountdownTimer;
