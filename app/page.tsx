import Link from "next/link";
import dynamic from "next/dynamic";
import CountdownTimer from "@/components/CountdownTimer";

const launchMilestones = [
  {
    title: "Design Sprint",
    description: "Finalizing the launch-day experience for creators and fans alike.",
    eta: "2 days left",
  },
  {
    title: "Beta Feedback",
    description: "Incorporating insights from our early adopter community.",
    eta: "3 days left",
  },
  {
    title: "Creator Onboarding",
    description: "Polishing the onboarding flow to keep momentum high.",
    eta: "5 days left",
  },
];

const CreatorSpotlight = dynamic(() => import("@/components/CreatorSpotlight"), {
  loading: () => (
    <section className="relative flex flex-col gap-4 rounded-3xl border border-dashed border-brand/40 bg-brand/5 p-8 text-neutral-200">
      <h2 className="text-2xl font-semibold text-brand-foreground">Creator spotlight</h2>
      <div className="flex min-h-[100px] flex-col justify-center">
        <p className="animate-pulse text-sm text-neutral-300">Generating inspiration...</p>
      </div>
    </section>
  ),
  ssr: false,
});


export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <header className="flex flex-col items-center gap-6 text-balance text-center">
        <CountdownTimer />
        <h1 className="text-4xl font-semibold sm:text-5xl">
          We are days away from elevating the creator community.
        </h1>
        <p className="max-w-2xl text-lg text-neutral-400">
          Track the final touches as we race toward launch. We’re building a space for
          creators to share progress, celebrate milestones, and stay inspired.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/join"
            className="rounded-full bg-brand px-6 py-2 text-sm font-medium text-brand-foreground shadow-lg shadow-brand/30 transition hover:bg-brand/90"
          >
            Join the waitlist
          </Link>
          <Link
            href="/roadmap"
            className="rounded-full border border-neutral-700 px-6 py-2 text-sm font-medium text-neutral-200 transition hover:border-brand hover:text-brand"
          >
            View roadmap
          </Link>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {launchMilestones.map((milestone) => (
          <article
            key={milestone.title}
            className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 shadow-inner shadow-black/10"
          >
            <h2 className="text-xl font-semibold text-neutral-50">{milestone.title}</h2>
            <p className="text-sm text-neutral-400">{milestone.description}</p>
            <span className="text-xs font-medium uppercase tracking-[0.35em] text-brand-foreground/70">
              {milestone.eta}
            </span>
          </article>
        ))}
      </section>

      <CreatorSpotlight />
    </div>
  );
}
