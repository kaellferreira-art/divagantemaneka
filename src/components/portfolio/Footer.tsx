import Image from "next/image";

import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#ao-vivo", label: "Registros ao vivo" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#casas", label: "Restaurantes e Bares" },
  { href: "#contratacao", label: "Contratação" },
  { href: "#especiais", label: "Especiais" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer id="contato" className="mt-6 border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--stage)_92%,black_8%)] text-[var(--cream)]">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3 md:gap-8 md:py-16">
        <div className="space-y-4 md:col-span-1">
          <p className="type-title text-[var(--cream)]">Kaell Ferreira</p>
          <p className="type-body text-[var(--cream)]/90">
            Músico ao vivo.
            <br />
            Florianópolis, Santa Catarina.
          </p>
        </div>

        <div className="space-y-4">
          <p className="type-label text-[var(--cream)]/65">Navegação</p>
          <ul className="space-y-2 type-body text-[var(--cream)]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="type-label text-[var(--cream)]/65">Contato</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta btn-cta-primary w-fit max-w-full whitespace-nowrap"
          >
            <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            Pedir orçamento
          </a>
          <ul className="space-y-2.5 type-body text-[var(--cream)]">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Image
                  src="/icons/gmail.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 object-contain opacity-90"
                />
                <span>{EMAIL}</span>
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 object-contain opacity-90"
                />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
