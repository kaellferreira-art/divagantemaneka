# Design: Lapidada de UX mobile

Data: 2026-10-01  
Escopo: site institucional de Kaell Ferreira (`src/app`, `src/components/portfolio`)  
Abordagem: polimento cirúrgico no mobile, com teto de altura na mídia do hero.

## Objetivo

Melhorar a experiência em telas menores que `md` (768px) sem mudar o visual de desktop, o conteúdo textual ou a identidade visual. Foco em: hero menos dominante na primeira dobra, toque mais confortável, ritmo vertical mais leve e barra sticky do WhatsApp sem cobrir conteúdo.

## Fora de escopo

- Redesign de seções ou novos layouts “app-like”
- Remover, colapsar ou mover conteúdo do hero (“ver mais”, listas ocultas, bio cortada)
- Mudança de tipografia de marca (Fraunces / Nunito) ou paleta
- Alterações de SEO, APIs ou conteúdo editorial

## Breakpoint

Todos os ajustes abaixo aplicam-se apenas abaixo de `md` (768px), salvo onde o comportamento já é mobile-only (ex.: `WhatsAppBar`).

## 1. Hero

### Mídia
- O carrossel (`HeroImageCarousel`) mantém proporção ~9:16 e cantos arredondados.
- No mobile, a altura visual da mídia fica limitada a **~55–60vh** (via `max-height` + `max-width`/`aspect-ratio` coerentes), para a foto não roubar a primeira dobra.
- Swipe e setas permanecem; setas com alvo ≥ 44×44px.

### Indicadores (dots)
- No mobile, dots mais compactos (menor altura/gap).
- Com muitas fotos (hoje 10), a faixa de dots não deve sobrecarregar a base da imagem: reduzir tamanho e espaçamento; se ainda ficar densa, aceitar overflow controlado ou dots menores — **não** trocar por paginação numérica nesta entrega.

### Texto e CTAs
- Conteúdo (headline, lead, bullets, listas de eventos, bio) permanece visível e na mesma ordem.
- Ritmo vertical um pouco mais apertado no mobile (`py` / `gap` / `space-y` levemente menores).
- CTAs do hero em largura total no mobile (`w-full`), empilhados; em `sm+` podem voltar a `w-fit` / row conforme o padrão atual.

## 2. Navegação e toque

### Barra WhatsApp
- Continua `fixed` e visível só abaixo de `md`.
- Manter `safe-area-inset-bottom`.
- Garantir padding inferior no `body` (ou equivalente) suficiente para footer e últimos CTAs não ficarem sob a barra.

### Carrosséis (Especiais, Depoimentos, Casas)
- Manter swipe existente.
- Setas ≥ 44px de alvo no mobile.
- Dots menores/mais compactos no mobile, alinhados ao hero.

### CTAs
- CTAs primários relevantes (hero, repertórios, seção de registros, especiais quando couber) usam `w-full` no mobile para facilitar o polegar.
- Desktop inalterado (`w-fit` / flex row onde já existe).

### Marquee de casas
- Sem mudança de comportamento; pausa no toque permanece.

## 3. Espaçamento e leitura

- Seções: reduzir levemente `py` no mobile (ex. de `py-16` para algo na faixa `py-12`–`py-14`), sem comprimir a ponto de parecer apertado.
- Cards (`card-surface` / shells arredondados): manter `p-5` no mobile; não aumentar padding. Se alguma seção ficar visualmente “folgada” após reduzir `py`, preferir apertar `gap`/`space-y` em vez de mexer no raio ou na borda.
- Bloco **Especiais**: no mobile, a mídia 9:16 não deve esticar demais a viewport — aplicar teto de altura semelhante ao hero (mais conservador se necessário, ex. ~50–55vh), centralizada.
- Footer: respiro acima da barra sticky; links com área de toque confortável (não exigir mudança de tipografia).

## 4. Motion e acessibilidade

- Respeitar `prefers-reduced-motion` já existente em `globals.css`.
- Não adicionar animações novas só por polish; ajustes de transição existentes podem permanecer.
- Manter `focus-visible` e `aria-label`s atuais nos controles de carrossel.

## Critérios de sucesso

1. Em viewport ~390×844, a foto do hero não ocupa mais que ~60% da altura da tela.
2. Ao rolar até o footer no mobile, nenhum link/CTA relevante fica escondido atrás da barra WhatsApp.
3. CTAs principais do fluxo “pedir orçamento / agendar” são fáceis de tocar com o polegar (largura total ou alvo ≥ 44px).
4. Desktop (`≥ md`) visualmente equivalente ao estado atual (sem regressão intencional).
5. Nenhum texto do hero removido ou colapsado.

## Arquivos previstos

- `src/components/portfolio/Hero.tsx`
- `src/components/portfolio/HeroImageCarousel.tsx`
- `src/components/portfolio/About.tsx` (repertórios + especiais)
- `src/components/portfolio/GallerySection.tsx`
- `src/components/portfolio/Depoimentos.tsx`
- `src/components/portfolio/Casas.tsx`
- `src/components/portfolio/WhatsAppBar.tsx` / `src/app/layout.tsx` (padding / safe-area)
- `src/app/globals.css` (utilitários mobile compartilhados, se útil)

## Riscos

- `max-height` em container com `aspect-ratio` pode exigir ajuste fino de `width`/`max-width` para não “esmagar” a imagem.
- Dots do hero com 10 itens podem continuar densos mesmo menores — aceitável nesta entrega.
- Padding do body demais deixa “faixa morta” no fim da página; calibrar com a altura real da `WhatsAppBar`.
