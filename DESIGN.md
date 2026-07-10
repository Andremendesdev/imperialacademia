---
name: Academia Imperial
description: Landing escura e acolhedora — ouro como convite, tipografia como marca, WhatsApp como próximo passo.
colors:
  bg-deep: "#060608"
  gold: "#d97706"
  gold-bright: "#fbbf24"
  gold-core: "#fcd34d"
  gold-dim: "#b45309"
  white-neon: "#F2F2FF"
  white: "#ffffff"
  zinc-300: "#d4d4d8"
  zinc-400: "#a1a1aa"
  zinc-500: "#71717a"
  zinc-600: "#52525b"
  whatsapp: "#25D366"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(1.875rem, 5.5vw, 3.35rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.02em"
  display-lg:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.25rem, 6.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.02em"
  hero-display:
    fontFamily: "Bebas Neue, sans-serif"
    fontSize: "clamp(2.75rem, 12vw, 6.25rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.16em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section-y: "64px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "16px 36px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.white}"
  button-secondary:
    backgroundColor: "#00000000"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "16px 36px"
  badge-section:
    backgroundColor: "#ffffff0a"
    textColor: "{colors.zinc-400}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  badge-neon:
    backgroundColor: "#451a0340"
    textColor: "{colors.gold-bright}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  card-glass:
    backgroundColor: "#08080cb8"
    textColor: "{colors.zinc-300}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Academia Imperial

## 1. Overview

**Creative North Star: "O Hall Dourado"**

O sistema visual da Academia Imperial é um hall escuro e acolhedor: o visitante entra num espaço quase noturno (`#060608`), onde o ouro não grita — convida. A tipografia display (Bebas Neue) carrega a marca; o ouro (`#d97706` → `#fbbf24`) aparece com parcimônia em CTAs, acentos e prova. O tom é claro e motivador: dá para começar, sem medo.

Densidade média-baixa: seções com respiro, hierarquia tipográfica forte, poucos cards. Glass e blur existem, mas como superfície de apoio — nunca como estética principal. Fotos reais da academia e prova local (reviews, números) sustentam a conversão para WhatsApp.

O sistema rejeita explicitamente o anti-referência do PRODUCT.md: **visual neon/cyber demais** — brilho exagerado, estética gamer ou futurista que compete com a marca e afasta quem só quer treinar.

**Key Characteristics:**
- Escuro profundo + ouro âmbar como convite (não como neon de pista)
- Display Bebas + corpo DM Sans: marca tipográfica, corpo legível
- Glow dourado reservado a CTA / estado — superfícies flat no restante
- Premium contido: tipografia e imagem carregam; ouro é raro
- Conversão óbvia: WhatsApp primário, estrutura/fotos secundário

## 2. Colors

Paleta committed: um fundo quase preto e uma família ouro âmbar; neutros zinc para texto e bordas.

### Primary
- **Âmbar Imperial** (`#d97706`): CTA sólido, botão WhatsApp da navbar, estados ativos de plano. É a voz de ação.
- **Ouro Brilhante** (`#fbbf24`): hover de CTA, texto accent, ícones dourados, badge hero. Mais claro que o âmbar de botão.
- **Núcleo Claro** (`#fcd34d`): highlight de gradiente no botão primário da hero; uso pontual.
- **Ouro Dim** (`#b45309`): bordas e anéis de foco (`ring-amber-600`); nunca como fill principal.

### Neutral
- **Preto Hall** (`#060608`): body e fundo de seção — a superfície padrão.
- **Branco Frio** (`#F2F2FF`): títulos de seção (linha superior) e display branco “neon” suave — sem ciano.
- **Branco Puro** (`#ffffff`): linha inferior de títulos de seção, texto de CTA.
- **Zinc 300–600** (`#d4d4d8` → `#52525b`): lead, labels, meta, divisores.

### Named Rules
**The Invitation Gold Rule.** O ouro aparece em ≤10% da tela em fill sólido. Fora do CTA, preferir tipografia branca, foto e zinc. Se a tela “pisca” dourado, o ouro está demais.

**The No Cyber Neon Rule.** Proibido glow multi-camada em texto, grid futurista, bordas neon brancas/douradas decorativas e estética gamer. Ouro = convite; não = pista de LED.

## 3. Typography

**Display Font:** Bebas Neue (com sans-serif)
**Body Font:** DM Sans (com sans-serif)

**Character:** Display condensado e atlético carrega a marca; corpo humanist leve acolhe a leitura. O contraste é a assinatura — não o glow.

### Hierarchy
- **Hero Display** (400, `clamp(2.75rem, 12vw, 6.25rem)`, lh 0.88, tracking `0.04em`): “Academia” / “Imperial” na hero. Imperial pode ser maior no mobile.
- **Display / Section** (400, `clamp(1.875rem, 5.5vw, 3.35rem)`, lh 0.88): títulos de seção em duas linhas (`.section-title-top` / `.section-title-bottom`).
- **Display LG** (400, `clamp(2.25rem, 6.5vw, 4.25rem)`): títulos grandes (ex.: Estrutura).
- **Body** (300, `1rem`–`1.05rem`, lh ~1.75): leads e parágrafos; max ~27–40rem de largura.
- **Label** (600, ~9–11px, tracking `0.12em`–`0.2em`, uppercase): badges de seção, meta, eyebrow.

### Named Rules
**The Type Carries Brand Rule.** Em seções fora da hero, a marca tipográfica (Bebas + hierarquia) vem antes do ouro. Não compensar tipografia fraca com mais glow.

## 4. Elevation

Híbrida: superfícies flat por padrão; profundidade via scrims escuros sobre foto, bordas `white/8–12%`, e glass leve (`rgba(8,8,12,0.72)` + blur). Glow dourado e sombra ampla aparecem **só** em CTA, card de plano popular e hover de ação — nunca como decoração de seção.

### Shadow Vocabulary
- **CTA glow** (`0 4px 28px rgba(217,119,6,0.42), 0 0 26px rgba(251,191,36,0.28)`): botão primário / WhatsApp pulse.
- **Card hover** (`0 0 28px rgba(217,119,6,0.15)`): cards de plano e contato no hover.
- **Navbar scrolled** (`0 4px 32px rgba(0,0,0,0.22)`): barra após scroll — sombra neutra, sem ouro.
- **Glass border** (`1px solid rgba(255,255,255,0.07–0.12)`): contorno de card/trust; substitui sombra em repouso.

### Named Rules
**The Glow-On-Action Rule.** Glow dourado = resposta a intenção (CTA, popular, hover de conversão). Em repouso, flat + borda. Se o glow não aponta para um clique, remova.

## 5. Components

Premium contido: ouro raro, tipografia e foto carregam; componentes limpos e óbvios.

### Buttons
- **Shape:** cantos suaves (`8px` / `rounded-lg` na hero; `12–16px` no Button base)
- **Primary:** fill âmbar (`#d97706`), texto branco, padding generoso (`h-14` / `px-9` no lg); na hero, gradiente ouro + `wpp-gold-pulse` só no CTA de conversão
- **Hover / Focus:** sobe para `#fbbf24` / âmbar mais claro; `focus-visible:ring-2 ring-amber-600/60` com offset no `#060608`
- **Secondary / Outline:** transparente, borda `white/24`, sem blur; hover só reforça borda — sem fill dourado

### Chips / Badges
- **Section badge:** `variant="section"` — borda `white/12`, fundo quase transparente, texto zinc-400, bolinha cinza (sem neon). Uso padrão fora da hero.
- **Hero badge:** `variant="neon"` permitido só na hero, com glow mínimo.
- **Popular plan:** badge uppercase tracking largo, âmbar contido (`amber-400/90`), sem shadow neon forte.

### Cards / Containers
- **Corner Style:** `14–16px` (`rounded-2xl` em pricing/contato)
- **Background:** `glass-card` ou `amber-950/20` no plano popular
- **Shadow Strategy:** flat em repouso; glow só no popular / hover (Elevation)
- **Border:** `white/8` padrão; `amber-600/60` no plano em destaque
- **Internal Padding:** `24–28px` (`p-6` / `lg:p-7`)

### Inputs / Fields
- Poucos campos no site atual. Quando existirem: fundo escuro, borda `white/10`, focus ring âmbar alinhado aos botões. Sem glass decorativo.

### Navigation
- Logo centralizada; links zinc-400 → white no hover (sem underline neon)
- Navbar: transparente no topo (`navbar-glass-top`), glass + sombra neutra no scroll
- CTA desktop: botão âmbar WhatsApp; mobile: menu hamburger neutro + drawer glass
- Sem borda inferior neon na barra

### Signature: Hero CTA + WhatsApp FAB
- Hero: “Começar Agora” (primário com pulse) + “Ver fotos da Academia” (outline limpo)
- FAB WhatsApp (`#25D366`): aparece após a hero sair da viewport; pulse dourado opcional no anel — conversão, não decoração

## 6. Do's and Don'ts

### Do:
- **Do** manter o fundo em Preto Hall (`#060608`) e deixar a foto + scrim carregarem atmosfera.
- **Do** usar Bebas Neue nos títulos de seção e DM Sans no corpo — tipografia como marca.
- **Do** concentrar ouro sólido no CTA WhatsApp / “Começar Agora” e na escolha de plano.
- **Do** preferir badge `section` (neutra) fora da hero.
- **Do** respeitar `prefers-reduced-motion` nas animações de entrada e no pulse do WhatsApp.

### Don't:
- **Don't** usar visual neon/cyber demais: brilho exagerado, estética gamer ou futurista que compete com a marca (PRODUCT.md anti-reference).
- **Don't** recolocar grid futurista, bordas neon brancas/douradas na navbar, ou glow em todo texto/ícone.
- **Don't** encher a tela de cards glass idênticos com ícone + título + texto.
- **Don't** usar eyebrow uppercase tracked em toda seção como muleta; badges de seção são pontuais, não scaffolding AI.
- **Don't** misturar fill ouro + sombra larga + borda 1px no mesmo elemento decorativo (ghost-card); no CTA, o glow é intencional e único.
- **Don't** deixar o ouro virar a superfície — se a página parece pista de LED, falhou The Invitation Gold Rule.
