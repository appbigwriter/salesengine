# FBR Sales Engine

Estrutura padrão de projeto da FBR Agency para o Sales Engine.

## Objetivo

Centralizar visão de negócio, requisitos, arquitetura, dados, workflows, design, marketing, histórico e código do Sales Engine.

## Estrutura

- `01-conceitual/` — visão, escopo, hipóteses e decisões de negócio.
- `02-prd/` — requisitos, histórias, critérios de aceite e Gates.
- `03-arquitetura/` — arquitetura técnica, ADRs, integrações e contratos.
- `04-database/` — schemas, migrations, seeds e políticas RLS.
- `05-workflows/` — processos operacionais, automações e handoffs.
- `06-design/` — identidade, referências, tokens e interfaces.
- `07-marketing/` — posicionamento, oferta, mensagens e distribuição.
- `08-historico/` — receipts, decisões, evidências e handoffs.
- `09-codigo/` — implementação, testes e configuração executável.

## Padrões

- Stack padrão para projeto novo: Next.js + TypeScript, salvo decisão explícita.
- Secrets somente em ambiente seguro/Secret Manager; nunca em documentação ou Git.
- Integrações externas usam adapters e contratos explícitos.
- Publicação, gasto, exclusão, deploy e alterações irreversíveis exigem Gate humano.
- Arquivos seguem nomenclatura sem espaços/acentos quando forem versionados tecnicamente.

## Estado inicial

Estrutura criada; implementação ainda não iniciada.
