import { WHATSAPP_URL } from "@/lib/contact";

import { Gallery } from "./Gallery";
import { GallerySeoList } from "./GallerySeoList";

export function GallerySection() {
  return (
    <section
      id="obras"
      className="section-shell rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.92),rgba(132,130,101,0.97)_58%,rgba(119,119,91,1)_100%)] py-16 md:py-20"
    >
      <div className="mb-9 text-center md:mb-12">
        <h2 className="type-title text-[#FFF8F0]">Registros ao vivo</h2>
      </div>
      <GallerySeoList />
      <Gallery />
      <div className="mt-9 flex justify-center md:mt-12">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta btn-cta-primary w-fit"
        >
          Agende sua data
        </a>
      </div>
    </section>
  );
}
