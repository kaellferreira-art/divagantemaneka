import { About } from "@/components/portfolio/About";
import { Footer } from "@/components/portfolio/Footer";
import { Gallery } from "@/components/portfolio/Gallery";
import { Hero } from "@/components/portfolio/Hero";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Gallery />
        <About />
      </main>
      <Footer />
    </>
  );
}
