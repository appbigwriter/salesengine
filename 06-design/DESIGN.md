---
version: alpha
name: FBR Sales Engine
description: "Operational dark design system combining Authority Engine control-room clarity with FBR Agency Flux governance density."
colors:
  background: "#0B0D14"
  surface: "#121622"
  surface-raised: "#171C2B"
  surface-sidebar: "#0E111B"
  border: "#2A3247"
  border-strong: "#334269"
  text: "#F5F7FB"
  text-muted: "#8F9AB2"
  text-soft: "#D3D9EA"
  primary: "#5B8CFF"
  accent: "#A979FF"
  success: "#57D6A0"
  warning: "#F5BD5A"
  danger: "#FF7080"
  on-primary: "#0B0D14"
typography:
  display:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.07em"
  heading-xl:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.05em"
  heading-md:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  body-md:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: "Manrope, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.1em"
  data:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
rounded:
  xs: "6px"
  sm: "7px"
  md: "10px"
  lg: "12px"
  pill: "20px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
components:
  surface-sidebar:
    backgroundColor: "{colors.surface-sidebar}"
    textColor: "{colors.text}"
    rounded: "{rounded.xs}"
    padding: "16px"
  divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.text}"
    rounded: "{rounded.xs}"
    padding: "1px"
  focus-ring:
    backgroundColor: "{colors.border-strong}"
    textColor: "{colors.text}"
    rounded: "{rounded.xs}"
    padding: "2px"
  text-muted:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.xs}"
    padding: "4px"
  text-soft:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-soft}"
    rounded: "{rounded.xs}"
    padding: "4px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: "10px 14px"
  surface-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "22px"
  surface-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "16px"
  status-success:
    backgroundColor: "#121622"
    textColor: "{colors.success}"
    rounded: "{rounded.pill}"
    padding: "5px 8px"
  status-warning:
    backgroundColor: "#121622"
    textColor: "{colors.warning}"
    rounded: "{rounded.pill}"
    padding: "5px 8px"
  status-danger:
    backgroundColor: "#121622"
    textColor: "{colors.danger}"
    rounded: "{rounded.pill}"
    padding: "5px 8px"
---

## Overview

FBR Sales Engine uses an operational dark interface: dense enough for pipelines, approvals and governance, but calm enough for daily commercial work. The system combines the shared palette and layered surfaces present in Authority Engine and FBR Agency Flux with Flux's Manrope/DM Mono typography pairing.

The visual hierarchy is: **workspace context → module/action → data state → governance constraint**. Blue is the primary action color; purple is an accent, not a second primary CTA. Green, amber and red communicate state only.

## Colors

- **Background `#0B0D14`:** application canvas.
- **Surface `#121622`:** panels, sheets and primary containers.
- **Surface raised `#171C2B`:** cards, inputs, secondary navigation and nested content.
- **Sidebar `#0E111B`:** persistent navigation rail from Authority Engine.
- **Primary blue `#5B8CFF`:** links, active navigation, primary actions and focus emphasis.
- **Accent purple `#A979FF`:** hover, secondary emphasis and gradients; never use for destructive actions.
- **Success `#57D6A0`:** completed, healthy, approved.
- **Warning `#F5BD5A`:** pending, review, human decision required.
- **Danger `#FF7080`:** blocked, failed, unsafe.

Use the dark canvas and surfaces as a system, not as independent ad hoc colors. Borders should use `border` or `border-strong`; do not introduce arbitrary grays.

## Typography

Use **Manrope** for interface text, headings and narrative content. Use **DM Mono** for eyebrows, IDs, timestamps, status labels, metrics provenance and other operational metadata. The fallback stack is `Inter`, then system UI.

Headings use tight tracking and high weight. Body text must remain readable at 14px/1.5. Labels are uppercase, monospace and letter-spaced; never use uppercase for paragraphs.

## Layout

- Desktop shell: persistent left navigation, content max-width around 1440px, 32–42px outer padding.
- Mobile breakpoint: 800–900px; navigation becomes horizontal/compact and grids collapse.
- Use 12px–16px gaps for cards; 24px–32px for major sections.
- Prefer 4-column metric rows and 2–4-column content grids; never let cards become narrower than their readable content.
- Keep page title, breadcrumb/kicker and contextual action in one clear header row.

## Elevation & Depth

Depth comes from surface contrast and a 1px border, not heavy shadows. Use `surface` over `background`, and `surface-raised` for nested cards. If a modal or detail sheet is required, use a dark scrim and retain the same surface tokens.

## Shapes

Use 6–7px rounding for controls, 10–12px for panels/cards and 20px for statuses. Avoid excessive pill-shaped containers outside statuses and filters.

## Components

- **Primary button:** one high-emphasis action per context, blue, white text, 10×14px padding.
- **Secondary button:** raised surface with border; used for navigation, cancel and low-risk actions.
- **Panel/card:** border plus layered surface; cards may be interactive with a blue border on hover.
- **Status badge:** monospace, pill-shaped, semantic color and explicit text; never rely on color alone.
- **Kicker/eyebrow:** DM Mono, uppercase, blue or muted; identifies module/context.
- **Data table:** 12px body, muted uppercase headers, bottom borders, horizontal overflow on mobile.
- **Navigation:** persistent left rail on desktop, grouped items on mobile; active route uses text plus surface/blue indicator.
- **Approval/blocked banner:** amber or red border, readable explanation, explicit next action and owner.
- **Form controls:** raised surface, 1px border, 7px radius, visible focus ring in primary blue.

## States and Governance

Every async or external-dependent surface must represent loading, empty, error and blocked states. Human approval, spend, publication, account creation and irreversible changes require an explicit Gate UI; disabled is not a substitute for explaining the blocker. Provider/source provenance and limitations remain visible near metrics and generated content.

## Do's and Don'ts

- **Do** use the shared tokens and semantic state colors.
- **Do** expose tenant, owner, role, source, period and Gate context where relevant.
- **Do** keep DEMO/FAKE or LIVE provenance visible.
- **Do** provide keyboard focus and text labels for status meaning.
- **Don't** introduce a new accent color per module.
- **Don't** use gradients as backgrounds for the whole application; reserve them for small informational emphasis.
- **Don't** hide a blocked action without cause, owner or next step.
- **Don't** place secrets, credentials or provider values in UI artifacts.

## Source reconciliation

- Authority Engine: `09-codigo/public/dashboard.html` — shared palette, dark control-room shell, left navigation, layered cards, fail-closed state treatment.
- FBR Agency Flux: `09-codigo/src/app/globals.css` and `page.module.css` — Manrope + DM Mono, shared palette, panel/status/button/table conventions, 1440px shell and responsive breakpoints.

This Design System is a new Sales Engine artifact; source projects remain unmodified.
