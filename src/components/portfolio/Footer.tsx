import Image from "next/image";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#obras", label: "Registros ao vivo" },
  { href: "#sobre", label: "Repertórios e Especiais" },
  { href: "#contato", label: "Contato" },
];

const socialLinks = [
  { href: "https://www.instagram.com/brkaell/", label: "Instagram" },
  {
    href: "https://api.whatsapp.com/send/?phone=5548991671710&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
  },
];

export function Footer() {
  return (
    <footer id="contato" className="mt-14 border-t border-[#1E1A18]/8 bg-[#ece1d2]">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-3 md:gap-8 md:py-18">
        <div className="space-y-4 md:col-span-1">
          <p className="font-serif text-[1.55rem] text-[#1E1A18]">Kaell Ferreira</p>
          <p className="text-[0.9rem] leading-[1.72] text-[#1E1A18]/68">
            Músico.
            <br />
            Florianópolis, Santa Catarina.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#6E6B3D]">Navegação</p>
          <ul className="space-y-2 text-[0.9rem] text-[#1E1A18]/75">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors duration-500 hover:text-[#A65A3A]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[#6E6B3D]">Contato</p>
          <ul className="space-y-2.5 text-[0.9rem] text-[#1E1A18]/75">
            <li>
              <a
                href="mailto:kaellferreira@gmail.com"
                className="flex items-center gap-3 transition-colors duration-500 hover:text-[#A65A3A]"
              >
                <Image
                  src="/icons/gmail.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 shrink-0 object-contain opacity-90"
                />
                <span>Gmail: kaellferreira@gmail.com</span>
              </a>
            </li>
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-colors duration-500 hover:text-[#D9A441]"
                >
                  <Image
                    src={social.label === "Instagram" ? "/icons/instagram.svg" : "/icons/whatsapp.svg"}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 shrink-0 object-contain opacity-90"
                  />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
