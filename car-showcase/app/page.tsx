import { Suspense } from "react";
import { Hero, Discover } from "@/components";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="overflow-hidden">
        <Hero />
        <Discover />
      </main>
    </Suspense>
  );
}
