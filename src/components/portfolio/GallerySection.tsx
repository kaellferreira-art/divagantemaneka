import { Gallery } from "./Gallery";
import { GallerySeoList } from "./GallerySeoList";

export function GallerySection() {
  return (
    <section
      id="obras"
      className="section-shell rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.92),rgba(132,130,101,0.97)_58%,rgba(119,119,91,1)_100%)] py-16 md:py-20"
    >
      <div className="mb-9 text-center md:mb-12">
        <h2 className="font-serif text-[2rem] leading-tight text-[#F3EDE5] sm:text-[2.5rem]">Registros ao vivo</h2>
      </div>
      <GallerySeoList />
      <Gallery />
    </section>
  );
}
