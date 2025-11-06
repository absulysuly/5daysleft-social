import TopNavBar from "@/components/TopNavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <TopNavBar />
      <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">Welcome to 5DaysLeft Social</h1>
        <p className="mt-4 text-lg text-slate-300">
          Build momentum with daily updates, connect with peers, and stay focused on your goals.
        </p>
      </section>
    </main>
  );
}
