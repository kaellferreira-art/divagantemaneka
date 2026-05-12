import { HeroImageCarousel } from "./HeroImageCarousel";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden py-14 sm:py-18 md:py-24 lg:py-32">
      <div className="texture-overlay pointer-events-none absolute inset-0 opacity-25" />

      <div className="section-shell relative grid gap-10 md:grid-cols-[0.98fr_1.02fr] md:items-center md:gap-14">
        <div className="order-2 space-y-7 md:space-y-8">
          <h1 className="max-w-[13ch] font-serif text-[1.9rem] leading-[1.05] text-[#1E1A18] sm:text-[2.5rem] md:text-[3.35rem]">
            Música ao vivo para seu evento.
          </h1>

          <p className="max-w-xl text-[1rem] font-semibold leading-[1.68] text-[#1E1A18] md:text-[1.06rem]">
            Restaurantes e Bares;
            <br />
            Eventos Corporativos;
            <br />
            Eventos Privados;
            <br />
            <span className="text-[0.92em] italic">casamento, aniversário e reuniões.</span>
          </p>

          <p className="max-w-xl whitespace-pre-line text-[0.98rem] leading-[1.78] text-[#1E1A18]/74 md:text-[1.05rem]">
            {`Muito prazer! Me chamo Kaell Ferreira, sou natural da Ilha da Magia, tenho 28 anos de idade e cinco de carreira artística! Durante essa trajetória, realizei mais de 600 apresentações ao vivo na Grande Florianópolis.
Desenvolvo um projeto eclético, voltado para música brasileira. As possibilidades de show vão de um voz e violão intimista a espetáculos envolventes com banda.`}
          </p>

          <a
            href="#obras"
            className="inline-flex w-fit items-center rounded-full border border-[#A65A3A]/20 bg-[#A65A3A] px-7 py-3 text-sm font-semibold tracking-[0.01em] text-[#F2E8DC] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#975137] hover:shadow-[0_12px_28px_-20px_rgba(30,26,24,0.72)]"
          >
            Apresentações ao vivo
          </a>
        </div>

        <div className="order-1">
          <HeroImageCarousel />
        </div>
      </div>
    </section>
  );
}
