const PERFORMANCE = [
  {
    title: "Estilo Versátil",
    text: "Clássicos da MPB, Pop, Pop Rock, Samba, Samba Rock, Pagode, Forró e Reggae.",
  },
  {
    title: "Formato Flexível",
    text: "Shows adaptáveis do solo (voz e violão) à banda completa, atuando como trilha ambiente ou atração principal.",
  },
] as const;

const ESTRUTURA = [
  {
    title: "Estrutura Técnica",
    text: "Sonorização própria de alta qualidade para pequenos e médios ambientes e rider técnico adaptado para grandes palcos.",
  },
  {
    title: "Segurança Jurídica",
    text: "Fechamento formalizado via contrato de prestação de serviços.",
  },
  {
    title: "Facilidade Fiscal",
    text: "Emissão de Nota Fiscal (MEI) para bares, eventos corporativos e produtores.",
  },
] as const;

const FORMATOS = [
  {
    title: "Privados",
    text: "Corporativo, aniversário, chá de bebê, festa infantil, happy hour, fim de ano e Réveillon.",
  },
  {
    title: "Cerimonial e confraternização",
    text: "Repertório direcionado e composição personalizada para o momento.",
  },
  {
    title: "Restaurantes e bares",
    text: "Trilha ambiente ou atração principal — solo, duo ou banda, com sonorização inclusa.",
  },
] as const;

function InfoBlock({
  heading,
  items,
}: {
  heading: string;
  items: readonly { title: string; text: string }[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="type-title text-[var(--foreground)]">{heading}</h2>
      <ul className="space-y-4 border-t border-[var(--line)] pt-4">
        {items.map((item) => (
          <li key={item.title} className="space-y-1">
            <h3 className="type-subtitle text-[var(--foreground)]">{item.title}</h3>
            <p className="type-body text-[var(--foreground)]/85">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Proposta() {
  return (
    <section id="contratacao" className="section-band-warm section-open">
      <div className="section-shell">
        <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-14 lg:grid-cols-3 lg:gap-12">
          <InfoBlock heading="Performance & Repertório" items={PERFORMANCE} />
          <InfoBlock heading="Estrutura & Profissionalismo" items={ESTRUTURA} />

          <div className="space-y-6 md:col-span-2 lg:col-span-1">
            <h2 className="type-title text-[var(--foreground)]">Eventos</h2>
            <ul className="space-y-5 border-t border-[var(--line)] pt-5">
              {FORMATOS.map((item) => (
                <li
                  key={item.title}
                  className="space-y-1 border-b border-[var(--line)] pb-5 last:border-b-0 last:pb-0"
                >
                  <h3 className="type-subtitle text-[var(--foreground)]">{item.title}</h3>
                  <p className="type-body text-[var(--foreground)]/85">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
