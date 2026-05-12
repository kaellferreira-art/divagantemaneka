import { About } from "@/components/portfolio/About";
import { Footer } from "@/components/portfolio/Footer";
import { GallerySection } from "@/components/portfolio/GallerySection";
import { Hero } from "@/components/portfolio/Hero";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <GallerySection />
        <About />
      </main>
      <Footer />
    </>
  );
}
