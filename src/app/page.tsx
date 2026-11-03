import { About } from "@/components/portfolio/About";
import { Casas } from "@/components/portfolio/Casas";
import { Depoimentos } from "@/components/portfolio/Depoimentos";
import { Footer } from "@/components/portfolio/Footer";
import { Galeria } from "@/components/portfolio/Galeria";
import { GallerySection } from "@/components/portfolio/GallerySection";
import { Hero } from "@/components/portfolio/Hero";
import { Proposta } from "@/components/portfolio/Proposta";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { WhatsAppBar } from "@/components/portfolio/WhatsAppBar";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <GallerySection />
        <Depoimentos />
        <Casas />
        <Proposta />
        <About />
        <Galeria />
      </main>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
