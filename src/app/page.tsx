import { About } from "@/components/portfolio/About";
import { Casas } from "@/components/portfolio/Casas";
import { Depoimentos } from "@/components/portfolio/Depoimentos";
import { Footer } from "@/components/portfolio/Footer";
import { GallerySection } from "@/components/portfolio/GallerySection";
import { Hero } from "@/components/portfolio/Hero";
import { WhatsAppBar } from "@/components/portfolio/WhatsAppBar";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <GallerySection />
        <About />
        <Depoimentos />
        <Casas />
      </main>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
