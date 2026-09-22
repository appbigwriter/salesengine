# Design System & Tokens — FBR Sales Engine

---

## 1. Princípios Visuais & Identidade

O **FBR Sales Engine** utiliza uma interface com estética **Premium Dark Mode**, micro-interações refinadas, contraste nítido para leitura de métricas financeiras e componentes de alta densidade de informação sem sobrecarregar o usuário.

---

## 2. Paleta de Cores (Design Tokens)

### 2.1. Superfícies & Fundos (Dark Slate)
- **Background Principal:** `#090d16` (Deep Midnight Blue)
- **Superfície dos Cards (Card/Panel):** `#111827` (Rich Slate) com bordas sutis em `#1f293d`
- **Superfície Elevada / Modais:** `#1a2234`
- **Glassmorphism Overlay:** `rgba(17, 24, 39, 0.75)` com `backdrop-blur: 12px`

### 2.2. Acentos & Cores Primárias (Brand Identity)
- **Primary / Brand Accent:** `#3b82f6` (Electric Blue) -> Hover: `#2563eb`
- **Secondary Accent:** `#6366f1` (Indigo Glow)
- **Gradient Hero:** `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`

### 2.3. Cores Semânticas de Status
- **Sucesso / Deal Ganho / E-mail Válido:** `#10b981` (Emerald Glow)
- **Atenção / Resposta Pendente / Em Cadência:** `#f59e0b` (Amber)
- **Erro / Bounce / Perdido / Desqualificado:** `#ef4444` (Rose/Red)
- **Inteligência Artificial / Agente SDR:** `#a855f7` (Purple AI Glow)

---

## 3. Tipografia

- **Família Principal (Sans):** `Inter`, `Plus Jakarta Sans`, sans-serif.
- **Hierarquia:**
  - `H1 (Page Titles):` 28px - 32px | Bold (700) | Letter-spacing: -0.02em
  - `H2 (Section Headers):` 20px - 24px | SemiBold (600)
  - `H3 (Card Titles):` 16px - 18px | Medium (500)
  - `Body / Data Labels:` 13px - 14px | Regular (400)
  - `Micro / Badges:` 11px - 12px | Medium (500) | Uppercase tracking

---

## 4. Componentes Chave da Interface

1. **Kanban de Oportunidades:** Cartões arrastáveis com avatar do closer, valor do deal, dias na etapa e badge de próximo passo.
2. **Lead Data Grid:** Tabela com ordenação por `icp_score`, tags de canais validados (Email/WhatsApp/LinkedIn) e botão rápido de enriquecimento.
3. **AI Chat Copilot Widget:** Gaveta lateral expansível para consultar resumos de leads, rascunhar respostas de e-mail e simular o AI SDR.
