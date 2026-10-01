import { HeroImageCarousel } from "./HeroImageCarousel";
import { WHATSAPP_URL } from "@/lib/contact";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden py-14 sm:py-18 md:py-24 lg:py-32">
      <div className="texture-overlay pointer-events-none absolute inset-0 opacity-25" />

      <div className="section-shell relative grid gap-10 md:grid-cols-[0.98fr_1.02fr] md:items-center md:gap-14">
        <div className="order-2 space-y-6 md:space-y-7">
          <h1 className="type-display max-w-[13ch] text-[#1E1A18]">Música ao vivo para seu evento.</h1>

          <p className="type-lead max-w-xl text-[#1E1A18]">
            Mais de 600 apresentações ao vivo realizadas na Grande Florianópolis!
          </p>

          <ul className="flex max-w-xl flex-wrap gap-x-4 gap-y-2.5 type-caption font-normal leading-none text-[#1E1A18] sm:gap-x-6">
            <li className="w-fit border-b-2 border-[#8B4030]/55 pb-px">Solo, duo ou banda</li>
            <li className="w-fit border-b-2 border-[#8B4030]/55 pb-px">Repertório direcionado</li>
            <li className="w-fit border-b-2 border-[#8B4030]/55 pb-px">Sonorização inclusa</li>
          </ul>

          <ul className="flex max-w-xl flex-col gap-3">
            <li className="space-y-0.5">
              <p className="type-subtitle text-[#1E1A18]">Privados</p>
              <p className="type-caption font-normal text-[#1E1A18]">
                Corporativo, Aniversário, Chá de bebê, Festa infantil, &quot;Happy hour&quot;, Festa de fim de ano e
                Réveillon
              </p>
            </li>
            <li className="space-y-0.5">
              <p className="type-subtitle text-[#1E1A18]">Cerimonial e Confraternização</p>
              <p className="type-caption font-normal text-[#1E1A18]">
                Repertório direcionado e Composição personalizada
              </p>
            </li>
            <li>
              <p className="type-subtitle text-[#1E1A18]">Restaurantes, Bares e Pubs</p>
            </li>
          </ul>

          <p className="type-body max-w-xl text-[#1E1A18]">
            Me chamo Kaell Ferreira, tenho 29 anos e sou natural da Ilha da Magia! Interpreto clássicos da MPB, Pop, Pop
            Rock, Samba, Samba Rock, Pagode, Forró e Reggae — em trilha ambiente ou como atração principal.
          </p>

          <div className="flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta btn-cta-primary w-fit"
            >
              Pedir orçamento
            </a>
            <a href="#obras" className="btn-cta btn-cta-secondary w-fit">
              Ver apresentações
            </a>
          </div>
        </div>

        <div className="order-1">
          <HeroImageCarousel />
        </div>
      </div>
    </section>
  );
}
