# Mobile UX Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polir a UX mobile do site (telas menores que 768px): hero com teto de altura, CTAs/toques melhores, ritmo vertical mais leve e barra WhatsApp sem cobrir conteúdo — sem mudar desktop nem o texto.

**Architecture:** Ajustes cirúrgicos em classes Tailwind nos componentes existentes + 2–3 utilitários CSS em `globals.css` para mídia com `max-height` + `aspect-ratio` (padrão reutilizável no hero e especiais). Sem novos componentes React.

**Tech Stack:** Next.js (App Router), React, Tailwind CSS v4 (`@import "tailwindcss"`), CSS custom properties já em `globals.css`.

## Global Constraints

- Só alterar comportamento/visual abaixo de `md` (768px), exceto `WhatsAppBar` (já mobile-only).
- Não remover, colapsar ou reordenar conteúdo do hero.
- Não mudar tipografia de marca (Fraunces / Nunito) nem paleta.
- Não adicionar animações novas; respeitar `prefers-reduced-motion` existente.
- Spec: `docs/superpowers/specs/2026-10-01-mobile-ux-polish-design.md`.
- Verificação: browser em ~390×844 (e checagem rápida ≥768px). Não há suite de testes unitários de UI neste repo — cada task fecha com checklist visual.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/app/globals.css` | Utilitários `.media-frame-hero` / `.media-frame-special` / `.carousel-dots` |
| `src/components/portfolio/HeroImageCarousel.tsx` | Teto de altura + dots compactos |
| `src/components/portfolio/Hero.tsx` | Ritmo vertical + CTAs `w-full` no mobile |
| `src/app/layout.tsx` + `WhatsAppBar.tsx` | Padding/safe-area sob a barra sticky |
| `src/components/portfolio/About.tsx` | Espaçamento, CTA full-width, mídia especiais com teto |
| `src/components/portfolio/GallerySection.tsx` | `py` + CTA full-width |
| `src/components/portfolio/Depoimentos.tsx` | `py` + dots/setas compactos |
| `src/components/portfolio/Casas.tsx` | `py` + dots/setas + mídia com teto leve |
| `src/components/portfolio/Footer.tsx` | Áreas de toque / respiro sob sticky |

---

### Task 1: Utilitários CSS compartilhados

**Files:**
- Modify: `src/app/globals.css`
- Spec: `docs/superpowers/specs/2026-10-01-mobile-ux-polish-design.md` (seções 1 e 3)

**Interfaces:**
- Consumes: variáveis CSS existentes (`--cream`, etc. — sem novas cores)
- Produces: classes `.media-frame-hero`, `.media-frame-special`, `.carousel-dot`, `.carousel-dots`

- [ ] **Step 1: Adicionar utilitários no fim de `globals.css` (antes do bloco `prefers-reduced-motion` ou depois de `.btn-cta-*`)**

```css
/* Mobile media frames: aspect 9/16 capped by viewport height */
.media-frame-hero {
  aspect-ratio: 9 / 16;
  width: 100%;
  max-width: 21rem;
  max-height: 58vh;
}

.media-frame-special {
  aspect-ratio: 9 / 16;
  width: 100%;
  max-width: 18.8rem;
  max-height: 52vh;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.35rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.carousel-dot {
  height: 0.375rem;
  border-radius: 9999px;
  transition: all 300ms ease;
}

.carousel-dot[aria-current="true"] {
  width: 1.25rem;
}

.carousel-dot:not([aria-current="true"]) {
  width: 0.375rem;
}

@media (min-width: 640px) {
  .media-frame-hero {
    max-width: 23rem;
  }

  .media-frame-special {
    max-width: 20rem;
  }
}

@media (min-width: 768px) {
  .media-frame-hero {
    max-width: 24rem;
    max-height: none;
  }

  .media-frame-special {
    max-width: 22rem;
    max-height: none;
  }

  .carousel-dots {
    gap: 0.5rem;
  }

  .carousel-dot {
    height: 0.5rem;
  }

  .carousel-dot[aria-current="true"] {
    width: 1.75rem;
  }

  .carousel-dot:not([aria-current="true"]) {
    width: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .media-frame-hero {
    max-width: 26rem;
  }
}
```

Nota: quando `max-height` limita o frame, a largura efetiva deve seguir o aspect-ratio. Se o browser não reduzir a largura automaticamente, aplicar também:

```css
@media (max-width: 767px) {
  .media-frame-hero,
  .media-frame-special {
    width: min(100%, calc(58vh * 9 / 16));
  }

  .media-frame-special {
    width: min(100%, calc(52vh * 9 / 16));
  }
}
```

Use a variante `width: min(...)` se, na verificação visual, a imagem “esmagar” (letterbox horizontal) em vez de encolher.

- [ ] **Step 2: Verificar no browser (~390px) que as classes ainda não aplicadas não quebram o CSS global**

Run: abrir `http://localhost:3000/`, DevTools → Elements → confirmar que as novas regras existem em `globals.css` sem erros de build.

Expected: página carrega; layout atual inalterado até Task 2.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "css: utilitários mobile para frames e dots dos carrosséis"
```

---

### Task 2: Hero — mídia com teto + dots compactos

**Files:**
- Modify: `src/components/portfolio/HeroImageCarousel.tsx`

**Interfaces:**
- Consumes: `.media-frame-hero`, `.carousel-dots`, `.carousel-dot`
- Produces: carrossel do hero com altura ≤ ~58vh no mobile

- [ ] **Step 1: Trocar o className do container raiz**

De algo como:

```tsx
className="group relative mx-auto aspect-[9/16] w-full max-w-[21rem] overflow-hidden rounded-[2.1rem] bg-[#d8c7b7] shadow-[0_35px_65px_-45px_rgba(30,26,24,0.55)] sm:max-w-[23rem] md:max-w-[24rem] lg:max-w-[26rem]"
```

Para:

```tsx
className="media-frame-hero group relative mx-auto overflow-hidden rounded-[2.1rem] bg-[#d8c7b7] shadow-[0_35px_65px_-45px_rgba(30,26,24,0.55)]"
```

- [ ] **Step 2: Atualizar a faixa de dots**

Substituir o wrapper e os botões de dot por:

```tsx
<div className="carousel-dots absolute bottom-3 left-0 right-0 z-30 md:bottom-4">
  {HERO_IMAGES.map((_, i) => (
    <button
      key={i}
      type="button"
      aria-label={`Ir para a foto ${i + 1} de ${len}`}
      aria-current={i === index}
      onClick={() => setIndex(i)}
      className={`carousel-dot ${
        i === index ? "bg-[#F2E8DC]" : "bg-[#F2E8DC]/45 hover:bg-[#F2E8DC]/70"
      }`}
    />
  ))}
</div>
```

Manter setas com `h-12 w-12` no mobile (já ≥ 44px).

- [ ] **Step 3: Verificar visual**

Run: viewport 390×844 em `http://localhost:3000/#inicio`.

Expected:
- Altura da foto do hero ≤ ~60% da viewport.
- Dots legíveis e menos densos.
- Swipe e setas funcionam.
- Em ≥768px, tamanho do carrossel equivalente ao anterior (`max-height: none`).

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/HeroImageCarousel.tsx
git commit -m "fix(hero): limita altura do carrossel e compacta dots no mobile"
```

---

### Task 3: Hero — ritmo e CTAs full-width

**Files:**
- Modify: `src/components/portfolio/Hero.tsx`

**Interfaces:**
- Consumes: markup atual do Hero
- Produces: hero com `py`/`gap` mais apertados e CTAs `w-full` abaixo de `sm`

- [ ] **Step 1: Ajustar padding/gap da section e do grid**

```tsx
<section id="inicio" className="relative overflow-hidden py-10 sm:py-14 md:py-24 lg:py-32">
  ...
  <div className="section-shell relative grid gap-8 md:grid-cols-[0.98fr_1.02fr] md:items-center md:gap-14">
    <div className="order-2 space-y-5 md:space-y-7">
```

- [ ] **Step 2: CTAs full-width no mobile**

```tsx
<div className="flex max-w-xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-cta btn-cta-primary w-full sm:w-fit"
  >
    Pedir orçamento
  </a>
  <a href="#obras" className="btn-cta btn-cta-secondary w-full sm:w-fit">
    Ver apresentações
  </a>
</div>
```

Não alterar headline, lead, listas nem bio.

- [ ] **Step 3: Verificar visual**

Expected: texto completo do hero presente; CTAs empilhados em largura total no 390px; em `sm+` voltam a `w-fit` em row.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/Hero.tsx
git commit -m "fix(hero): aperta ritmo vertical e CTAs full-width no mobile"
```

---

### Task 4: Barra WhatsApp + padding do body/footer

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/portfolio/WhatsAppBar.tsx`
- Modify: `src/components/portfolio/Footer.tsx`

**Interfaces:**
- Consumes: altura real da barra (~ `p-3` + botão `min-height: 2.75rem` + safe-area)
- Produces: conteúdo final sempre acima da barra no mobile

- [ ] **Step 1: Calibrar padding do `body`**

Em `layout.tsx`, o body hoje tem `pb-20 md:pb-0`. Se ao rolar o footer ainda houver overlap, subir para `pb-24`; se sobrar faixa morta grande, manter `pb-20` e só ajustar footer.

Alvo: `className="flex min-h-full flex-col pb-24 md:pb-0"` se `pb-20` for insuficiente na verificação.

- [ ] **Step 2: Confirmar `WhatsAppBar` com safe-area**

Manter (ou garantir):

```tsx
<div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#1E1A18]/10 bg-[#ece1d2] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
  <a ... className="btn-cta btn-cta-primary w-full gap-2">
```

- [ ] **Step 3: Footer — áreas de toque e respiro**

Em `Footer.tsx`:
- Links de navegação: aumentar hit area com `py-1.5` (ou `min-h-11` + flex) sem mudar tipografia.
- Manter `mt-14` / `py-14`; o padding do body cobre a sticky.

Exemplo nos links:

```tsx
<a href={link.href} className="inline-flex min-h-11 items-center transition-colors duration-500 hover:text-[#8B4030]">
  {link.label}
</a>
```

- [ ] **Step 4: Verificar visual**

Expected: em 390×844, rolar até `#contato` — email, Instagram e “Pedir orçamento” do footer ficam totalmente acima da barra; em desktop a barra não aparece e `pb` some.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/portfolio/WhatsAppBar.tsx src/components/portfolio/Footer.tsx
git commit -m "fix(mobile): evita overlap da barra WhatsApp no footer"
```

---

### Task 5: About (Repertórios + Especiais)

**Files:**
- Modify: `src/components/portfolio/About.tsx`

**Interfaces:**
- Consumes: `.media-frame-special`, padrões de CTA `w-full`
- Produces: seções com `py` menor, CTA full-width, mídia especiais com teto ~52vh

- [ ] **Step 1: Seção Repertórios — espaçamento e CTA**

```tsx
<section id="sobre" className="section-shell py-12 md:py-24">
  <div className="space-y-7 rounded-[1.75rem] p-5 card-surface md:space-y-10 md:p-8">
    ...
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-cta btn-cta-primary w-full sm:w-fit"
    >
      Direcione seu Repertório
    </a>
```

Manter `p-5` no mobile.

- [ ] **Step 2: Seção Especiais — mídia com teto + CTA**

Trocar o wrapper da imagem 9:16:

De classes com `aspect-[9/16] w-full max-w-[18.8rem] ...` para:

```tsx
<div className="media-frame-special relative mx-auto overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)]">
```

Ajustar section shell:

```tsx
<section className="section-shell py-12 md:py-24">
```

CTA “Agende seu Especial”:

```tsx
className="btn-cta btn-cta-primary w-full sm:w-fit"
```

Setas já usam `h-12 w-12` no mobile — manter.

- [ ] **Step 3: Verificar visual**

Expected: especiais não dominam a viewport; CTAs full-width no mobile; desktop igual.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/About.tsx
git commit -m "fix(about): ritmo mobile, CTA full-width e teto na mídia dos especiais"
```

---

### Task 6: Gallery, Depoimentos e Casas

**Files:**
- Modify: `src/components/portfolio/GallerySection.tsx`
- Modify: `src/components/portfolio/Depoimentos.tsx`
- Modify: `src/components/portfolio/Casas.tsx`

**Interfaces:**
- Consumes: `.carousel-dots`, `.carousel-dot` (depoimentos/casas); opcionalmente `max-h` no carrossel de casas
- Produces: seções com ritmo mobile + toque alinhado

- [ ] **Step 1: `GallerySection.tsx`**

```tsx
<section
  id="obras"
  className="section-shell rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_15%,rgba(151,147,117,0.92),rgba(132,130,101,0.97)_58%,rgba(119,119,91,1)_100%)] py-12 md:py-20"
>
  ...
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-cta btn-cta-primary w-full max-w-sm sm:w-fit"
  >
    Agende sua data
  </a>
```

- [ ] **Step 2: `Depoimentos.tsx` — `py` + dots**

```tsx
<section id="depoimentos" className="section-shell py-12 md:py-24">
```

Nos carrosséis com dots, trocar wrapper/dots para `.carousel-dots` / `.carousel-dot` (mesma estrutura da Task 2). Manter setas `h-10 w-10` no mínimo — se menores que 44px, subir para `h-11 w-11` no mobile.

- [ ] **Step 3: `Casas.tsx` — `py` + mídia + dots**

```tsx
<section id="casas" className="section-shell py-12 md:py-24">
```

No `CasasMediaCarousel`, adicionar teto leve no mobile (pode reutilizar `.media-frame-special` ou `max-h-[52vh]` + `aspect-[9/16]` + `max-w-[15.5rem]`). Preferir classe compartilhada se couber sem distorcer o layout ao lado do marquee:

```tsx
className="media-frame-special relative mx-auto shrink-0 overflow-hidden rounded-[1.5rem] bg-[#d8c7b7] shadow-[0_30px_70px_-50px_rgba(30,26,24,0.55)] sm:max-w-[17rem] md:max-w-[18.5rem]"
```

Se `.media-frame-special` fixar `max-width: 18.8rem` e conflitar com `sm:max-w-[17rem]`, ajustar o utilitário ou usar classes Tailwind locais:

```tsx
className="relative mx-auto aspect-[9/16] w-full max-w-[15.5rem] max-h-[52vh] shrink-0 overflow-hidden rounded-[1.5rem] ... sm:max-w-[17rem] md:max-h-none md:max-w-[18.5rem]"
```

Dots → `.carousel-dots` / `.carousel-dot`. Marquee: não alterar comportamento.

- [ ] **Step 4: Verificar visual (scroll completo no mobile)**

Expected checklist:
1. Hero foto ≤ ~60vh
2. Footer livre da sticky
3. CTAs principais full-width / fáceis de tocar
4. Desktop sem regressão óbvia
5. Texto do hero intacto

- [ ] **Step 5: Commit**

```bash
git add src/components/portfolio/GallerySection.tsx src/components/portfolio/Depoimentos.tsx src/components/portfolio/Casas.tsx
git commit -m "fix(mobile): ritmo, dots e CTAs em galeria, depoimentos e casas"
```

---

### Task 7: Passada final de verificação

**Files:**
- Nenhum (somente QA), salvo hotfix mínimo se algum critério falhar

- [ ] **Step 1: Mobile 390×844**

Percorrer: Início → Registros → Repertórios → Especiais → Depoimentos → Casas → Contato.

Checklist dos critérios de sucesso do spec (1–5).

- [ ] **Step 2: Desktop ≥768px**

Comparar hero, especiais e footer com o estado esperado (sem sticky WhatsApp; frames sem `max-height`).

- [ ] **Step 3: Hotfix se necessário + commit**

Se precisar de ajuste fino (ex. `58vh` → `55vh`, `pb-24` → `pb-22` via valor arbitrário), fazer o menor diff possível e commit:

```bash
git add -u
git commit -m "fix(mobile): calibra altura/padding após QA"
```

Se nenhum hotfix: não criar commit vazio.

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Hero max-height ~55–60vh | 1, 2 |
| Hero dots compactos | 1, 2 |
| Hero ritmo + CTAs full-width | 3 |
| WhatsApp safe-area + body padding | 4 |
| Carrosséis setas ≥44px / dots | 2, 5, 6 |
| CTAs full-width (repertórios, registros, especiais) | 5, 6 |
| Seções `py` menor; cards `p-5` | 5, 6 |
| Especiais teto de altura | 1, 5 |
| Footer toque / respiro | 4 |
| Sem motion nova / reduced-motion | implícito (não alterar bloco) |
| Critérios de sucesso | 7 |

Sem placeholders; marquee e conteúdo do hero explicitamente intocados.
