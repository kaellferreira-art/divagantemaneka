import Image from "next/image";

import { EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/contact";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#obras", label: "Registros ao vivo" },
  { href: "#sobre", label: "Repertórios e Especiais" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#casas", label: "Restaurantes, Bares e Pubs" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer id="contato" className="mt-14 border-t border-[#1E1A18]/8 bg-[#ece1d2]">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3 md:gap-8 md:py-18">
        <div className="space-y-4 md:col-span-1">
          <p className="type-title text-[#1E1A18]">Kaell Ferreira</p>
          <p className="type-body text-[#1E1A18]">
            Músico.
            <br />
            Florianópolis, Santa Catarina.
          </p>
        </div>

        <div className="space-y-4">
          <p className="type-label text-[#6E6B3D]">Navegação</p>
          <ul className="space-y-2 type-body text-[#1E1A18]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors duration-500 hover:text-[#8B4030]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="type-label text-[#6E6B3D]">Contato</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-cta btn-cta-primary w-fit max-w-full whitespace-nowrap">
            <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} className="h-5 w-5 object-contain" />
            Pedir orçamento
          </a>
          <ul className="space-y-2.5 type-body text-[#1E1A18]">
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors duration-500 hover:text-[#8B4030]">
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
                className="flex items-center gap-3 transition-colors duration-500 hover:text-[#8B4030]"
              >
                <Image src="/icons/instagram.svg" alt="" width={24} height={24} className="h-6 w-6 shrink-0 object-contain opacity-90" />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
