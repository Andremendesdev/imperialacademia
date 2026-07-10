---
target: landing / homepage
total_score: 20
p0_count: 2
p1_count: 2
timestamp: 2026-07-10T12-13-05Z
slug: src-app-page-tsx
---
# Critique: Academia Imperial landing (`src/app/page.tsx`)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Billing/gallery ok; Assinar sem feedback; nav sem estado ativo |
| 2 | Match System / Real World | 3 | PT-BR claro; “Resultados” ≠ reviews; “VIP” opaco |
| 3 | User Control and Freedom | 3 | Scroll/exit fáceis; Assinar é beco sem saída |
| 4 | Consistency and Standards | 2 | Chrome de seção consistente; CTAs inconsistentes (WA vs Assinar morto) |
| 5 | Error Prevention | 1 | Assinar clicável sem ação; placeholders de WA/telefone |
| 6 | Recognition Rather Than Recall | 3 | Caminhos visíveis; FAB label só no hover; planos exigem ler lista |
| 7 | Flexibility and Efficiency | 2 | Vários WA bons; sem mensagem pré-preenchida por plano |
| 8 | Aesthetic and Minimalist Design | 1 | Hero lotada, glass default, eyebrows, ouro demais |
| 9 | Error Recovery | 1 | Falha silenciosa no Assinar; sem recovery |
| 10 | Help and Documentation | 2 | WA como ajuda; sem FAQ/orientação na decisão de plano |
| **Total** | | **20/40** | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment:** Falha no AI slop test. Dark gym + amber glow + glass + eyebrow scaffold é o reflexo saturado de landing fitness. Gradient text em “Imperial”, glass-card default, hero-metric strip, Benefits 6× card idêntico, badges uppercase em toda seção. North Star “O Hall Dourado” violada: ouro/glow em título, ícones, divisores, popular card — não só CTA.

**Deterministic scan:** 18 findings, todos `design-system-font-size` (advisory). Maioria FP vs prose do DESIGN.md (1.05rem body, labels 9–11px). Hits reais: Navbar `13px`, Benefits `0.9rem`, Hero Explorar `8px` borderline.

**Visual overlays:** Indisponível — sem browser tool na sessão.

## Overall Impression

A marca na hero e a seção Estrutura (fotos reais) são o que salvam. O funil quebra no momento de maior intenção: Assinar não faz nada, e Contato/WhatsApp ainda são placeholders. Visual premium-cyber compete com “acolhedora / começo sem medo”.

## What's Working

1. **Brand-as-hero** — Academia/Imperial em Bebas sobre foto full-bleed passa o brand test.
2. **Affordances de WhatsApp** — Navbar + Começar Agora + FAB pós-hero alinhados ao sucesso do PRODUCT.
3. **Estrutura** — Galeria fotográfica é a prova mais on-positioning e menos template.

## Priority Issues

### [P0] Pricing `Assinar` é controle morto
- **What:** Botão Assinar sem href/onClick/WhatsApp.
- **Why:** Quebra “plano → WhatsApp” no pico de intenção.
- **Fix:** Link `getWhatsAppHref()` com plano+billing; label “Quero o plano X no Zap”.
- **Suggested command:** `$impeccable harden` / `$impeccable clarify`

### [P0] Contato e WhatsApp são placeholders
- **What:** `site-contact.ts` com Rua Exemplo, telefone/WA zeros, maps fora de Piraju; reviews placeholder.
- **Why:** Fim da jornada e CTA primário sem confiança local.
- **Fix:** Dados reais de Piraju antes de polish visual.
- **Suggested command:** `$impeccable harden`

### [P1] Hero estoura budget + bans
- **What:** Gradient text Imperial; métricas; trust chips; badge; divider; 2 CTAs + Explorar.
- **Why:** Carga cognitiva; AI slop; enfraquece North Star.
- **Fix:** Brand + uma linha + WA + secundário; métricas abaixo da dobra; ouro sólido sem clip.
- **Suggested command:** `$impeccable distill` / `$impeccable quieter` / `$impeccable layout`

### [P1] Ouro/glow/glass contra North Star e anti-ref
- **What:** glass-card default; neon-* em ícones/linhas; wpp-gold-pulse em WA.
- **Why:** Cyber-premium, não acolhedora; ouro deixa de sinalizar CTA.
- **Fix:** Flat; glow só no CTA primário; aposentar neon decorativo.
- **Suggested command:** `$impeccable quieter`

### [P2] Benefits = grid idêntico sem substância
- **What:** 6 glass cards, só título.
- **Why:** Carga extrínseca; zero progresso na belief ladder.
- **Fix:** 3 pontos com uma frase, ou cortar a seção.
- **Suggested command:** `$impeccable distill`

## Persona Red Flags

**Jordan (first-timer):** Hero barulhenta; Assinar parece checkout e não faz nada; VIP/App sem explicação; sem “sem compromisso, só Zap” em Planos.

**Casey (mobile):** FAB ajuda após scroll; WA da nav some no mobile; labels 9px; FAB label precisa hover; PNGs pesados.

**Riley (stress):** Assinar no-op; placeholders que parecem reais; opacity-0 até IO; marquee duplicado; Footer cita modalidades ausentes.

**Morador de Piraju:** “Melhor de Piraju” com maps/endereço fake; linha “perto de você” ausente; Assinar morto + número fake; visual capital/influencer vs vizinho acolhedor.

## Minor Observations

- Nav “Resultados” vs badge “Avaliações”.
- Footer climax é “Ver planos”, não WhatsApp.
- Pricing popular scale+glow = clichê SaaS.
- Modalidades removidas da página mas citadas no Footer.
- Cognitive load: 6/8 checklist fails (high).

## Questions to Consider

1. Se o job é WhatsApp, por que a palavra “Assinar” existe?
2. Remover Benefits aumentaria conversão encurtando tempo-até-plano?
3. E se o first viewport fosse só foto + marca + “Perto de você em Piraju” + um botão WA?
4. Dark+neon é “acolhedora”, ou a marca performa premium enquanto o usuário só quer segurança para começar?
5. Dá para shipar dados reais de Contato/WA antes de outro pass visual?
