import { WHATSAPP_URL } from "@/lib/contact";

import { Gallery } from "./Gallery";
import { GallerySeoList } from "./GallerySeoList";

export function GallerySection() {
  return (
    <section id="ao-vivo" className="section-band-stage">
      <div className="section-shell section-open">
        <div className="mb-9 text-center md:mb-12">
          <h2 className="type-title text-[var(--cream)]">Registros ao vivo</h2>
        </div>
        <GallerySeoList />
        <Gallery />
        <div className="mt-9 flex justify-center md:mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta btn-cta-primary w-full max-w-sm sm:w-fit"
          >
            Agende sua data
          </a>
        </div>
      </div>
    </section>
  );
}
