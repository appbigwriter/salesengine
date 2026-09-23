# PRD — Módulo Opportunity Builder

Sep 22, 2026 · Autor: @Someone · Status: rascunho para revisão de engenharia

## Resumo executivo

O Opportunity Builder é um módulo do sistema da empresa que descobre, pontua e ranqueia oportunidades de produtos afiliados de alta procura, e conduz a pesquisa profunda de mercado antes de cada produto virar pauta em um dos blogs temáticos. Na fase inicial, cobre quatro fontes — Amazon, MaxWeb, Digistore24 e ClickBank — dentro das categorias e subcategorias que a equipe fornece.

O módulo substitui a prospecção manual e dispersa por um fluxo único: entrada de candidatos por fonte e categoria, pontuação transparente (Opportunity Score de 0 a 100), dossiê de pesquisa de mercado em seis frentes e encaminhamento da oportunidade aprovada para o blog certo, com esqueleto de pauta pronto. Tudo fica versionado e auditável.

Resultado esperado: menos tempo por oportunidade avaliada, decisões de conteúdo baseadas em sinais reais (não em achismo) e um pipeline priorizado que alimenta os blogs de forma contínua e em conformidade com CDC/CONAR/FTC e políticas do AdSense.

Este PRD assume o mesmo stack dos blogs da empresa: Next.js (App Router) + React + Tailwind + Supabase. Um protótipo funcional já existe (ver Anexos) e serve de referência de UX e de regras de negócio.

## Contexto e problema

Hoje a descoberta de produtos é manual e vive fora do sistema: buscas soltas em cada plataforma, planilhas paralelas e critérios que mudam de pessoa para pessoa. Isso gera três problemas concretos.

1. **Sem ranqueamento comparável.** Não há um score único que permita comparar um produto da Amazon com uma oferta da MaxWeb ou um curso da Digistore24 sob os mesmos critérios.
2. **Pesquisa de mercado inconsistente.** A profundidade da análise (demanda, concorrência, conformidade) depende de quem fez, e raramente fica registrada.
3. **Sem rastreabilidade até o blog.** Não se sabe qual oportunidade virou qual pauta, em qual blog, nem por quê — o que dificulta medir o que converte.

Como a operação roda múltiplos blogs temáticos no mesmo sistema, faz sentido a prospecção ser um módulo interno: reaproveita autenticação, papéis, banco (Supabase) e a ligação direta com o cadastro de blogs e a API de ingestão de artigos que já existem.

## Objetivos, métricas e não-objetivos

**Objetivos**

1. Centralizar a descoberta de oportunidades das 4 fontes em um único fluxo dentro do sistema.
2. Ranquear oportunidades por um score transparente e ajustável.
3. Padronizar a pesquisa de mercado em um dossiê reutilizável.
4. Encaminhar oportunidades aprovadas ao blog certo, com pauta inicial.

**Métricas de sucesso**

| Métrica | Alvo do MVP |
| --- | --- |
| Tempo médio para avaliar uma oportunidade | Reduzir vs. processo manual atual |
| Oportunidades registradas por semana | ≥ volume da prospecção manual |
| % de oportunidades Tier A que viram pauta publicada | Rastreável de ponta a ponta |
| Oportunidades com dossiê completo antes da decisão | ≥ 90% |
| Cobertura de conformidade (nichos YMYL sinalizados) | 100% dos casos sensíveis |

**Não-objetivos (fase inicial)**

- Não gera nem publica o artigo final — apenas o esqueleto de pauta (a redação segue no fluxo de conteúdo existente).
- Não faz compra de mídia nem gestão de campanhas de tráfego pago.
- Não substitui o painel de cada plataforma de afiliados; complementa com validação no painel.
- Não promete coleta 100% automática das 4 fontes no MVP (ver Fontes e conectores).

## Escopo da fase inicial

**Dentro do escopo**

- Fontes: Amazon, MaxWeb, Digistore24, ClickBank.
- Escopo de prospecção definido pelo usuário: categorias e subcategorias por fonte.
- Cadastro de candidatos com sinais próprios de cada fonte.
- Motor de ranqueamento com 8 fatores ponderados e pesos ajustáveis.
- Dossiê de pesquisa profunda em 6 frentes, com checklist, buscas geradas e registro de achados.
- Gerador de buscas por termo/fonte/mercado (BR, EUA, Europa).
- Veredito (pesquisar / testar / seguir / descartar) e encaminhamento ao blog temático.
- Esqueleto de pauta no formato do radar de afiliados (gancho ético + divulgação).
- Exportação do pipeline (Markdown, CSV, JSON) e integração com o cadastro de blogs.
- Papéis e permissões; trilha de auditoria.

**Fora do escopo (fase inicial)**

- Redação e publicação automática de artigos.
- Automação completa de coleta nas 4 fontes (o MVP prioriza ingestão assistida — ver Fontes e conectores).
- Rastreamento de comissões/vendas reais por link (fica no painel de cada rede).
- Recomendação por IA de qual blog usar (decisão humana no MVP; assistência de IA fica para v2).

## Usuários e papéis

O módulo reaproveita a autenticação e os papéis do sistema atual. Três papéis no MVP.

| Papel | O que faz | Permissões |
| --- | --- | --- |
| Analista de prospecção | Cadastra candidatos, coleta sinais, preenche dossiê, pontua fatores | Criar/editar oportunidades próprias; ler todas; rodar gerador de buscas |
| Editor / gestor de conteúdo | Revisa ranking, dá o veredito, encaminha ao blog, aprova pauta | Tudo do analista + editar qualquer oportunidade, definir veredito e blog, exportar |
| Admin | Configura fontes, categorias, blogs e pesos do score; gerencia usuários | Acesso total, incluindo configuração do modelo de pontuação e limpeza de dados |

Regras de acesso a dados (RLS no Supabase) seguem o padrão do sistema: todos os papéis leem o pipeline; escrita de configuração (pesos, fontes, categorias) restrita a Admin; veredito e encaminhamento restritos a Editor e Admin.

## Requisitos funcionais

Agrupados por área. Cada requisito é testável.

**Configuração (RF-C)**

1. RF-C1 — Admin cadastra blogs temáticos (nome, nicho) e vincula ao cadastro de blogs existente do sistema.
2. RF-C2 — Admin define o escopo de prospecção: pares de categoria/subcategoria por fonte.
3. RF-C3 — Admin ajusta os pesos dos 8 fatores do score; o sistema valida que a soma é 100.
4. RF-C4 — Admin seleciona o mercado padrão (BR, EUA, Europa), usado para gerar buscas.

**Intake de oportunidades (RF-I)**

1. RF-I1 — Usuário cadastra uma oportunidade: produto/oferta, fonte, categoria, subcategoria, blog, mercado, link e sinais.
2. RF-I2 — O formulário exibe dinamicamente os sinais esperados da fonte selecionada (ex.: nº de avaliações e selo na Amazon; Gravity e $/venda na ClickBank; EPC e payout na MaxWeb; comissão e fit UE/VAT na Digistore24).
3. RF-I3 — Sinais são armazenados como texto livre no MVP; campos estruturados por fonte ficam para v1.

**Ranqueamento (RF-R)**

1. RF-R1 — Cada fator é pontuado de 0 a 5; o sistema calcula o Opportunity Score (0–100) conforme o motor de ranqueamento.
2. RF-R2 — O sistema atribui o tier (A/B/C/Descartar) a partir do score.
3. RF-R3 — O painel exibe as oportunidades ranqueadas, com a leitura de sinal (contribuição de cada fator) visível.
4. RF-R4 — Filtros por fonte, blog e tier; busca textual; ordenação por score, recência ou nome.

**Pesquisa profunda (RF-P)**

1. RF-P1 — Cada oportunidade tem um dossiê com 6 frentes: demanda & mercado, público & dor, concorrência & SEO, ângulo editorial, monetização confirmada, conformidade & risco.
2. RF-P2 — Cada frente traz um checklist de verificação e um campo de achados.
3. RF-P3 — O gerador de buscas produz consultas por termo/fonte/mercado, nos padrões do radar de afiliados, com botão de copiar.

**Veredito e encaminhamento (RF-V)**

1. RF-V1 — Editor registra o veredito: pesquisar mais, testar, seguir ou descartar, com justificativa.
2. RF-V2 — Oportunidade aprovada é vinculada a um blog temático.
3. RF-V3 — O sistema gera um esqueleto de pauta com gancho e lembrete de divulgação, pronto para o fluxo de conteúdo.

**Pipeline e exportação (RF-E)**

1. RF-E1 — Exportar o pipeline em Markdown (relatório), CSV (planilha) e JSON (backup).
2. RF-E2 — O relatório inclui ranking, sinais, dossiê e veredito por oportunidade.
3. RF-E3 — Toda criação, edição, veredito e mudança de configuração é registrada na trilha de auditoria.

## Modelo de dados

Proposta de schema no Supabase (Postgres). `opportunity` é a entidade central; `ratings` e `dossier` ficam como JSONB para flexibilidade no MVP e podem ser normalizados depois.

| Tabela | Papel |
| --- | --- |
| `blog` | Blogs temáticos (reusa o cadastro existente se houver) |
| `source_category` | Escopo de prospecção: categoria/subcategoria por fonte |
| `score_weight` | Pesos vigentes dos 8 fatores (uma linha ativa) |
| `opportunity` | Produto/oferta candidato, sinais, notas, veredito |
| `opportunity_dossier` | Achados por frente de pesquisa (ou JSONB em `opportunity`) |
| `audit_log` | Trilha de auditoria de ações |

```sql
create type source_enum as enum ('amazon','maxweb','digistore24','clickbank');
create type tier_enum as enum ('A','B','C','D');
create type verdict_enum as enum ('pesquisar','testar','seguir','descartar');
create type market_enum as enum ('BR','US','EU');

create table blog (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  niche text,
  external_blog_id text,        -- vínculo com o cadastro de blogs do sistema
  created_at timestamptz default now()
);

create table source_category (
  id uuid primary key default gen_random_uuid(),
  source source_enum not null,
  category text not null,
  subcategory text,
  active boolean default true
);

create table score_weight (
  id uuid primary key default gen_random_uuid(),
  weights jsonb not null,        -- {demanda:22, monetizacao:20, ...} soma = 100
  active boolean default true,
  updated_by uuid references auth.users,
  updated_at timestamptz default now()
);

create table opportunity (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source source_enum not null,
  category text,
  subcategory text,
  blog_id uuid references blog,
  market market_enum not null default 'US',
  url text,
  signals text,                 -- sinais coletados (texto livre no MVP)
  ratings jsonb not null default '{}',  -- {demanda:0..5, monetizacao:0..5, ...}
  dossier jsonb not null default '{}',  -- {demanda:{checks,notes}, ...}
  score int generated always as (0) stored, -- calculado na aplicação; ver motor
  verdict verdict_enum,
  verdict_note text,
  is_example boolean default false,
  created_by uuid references auth.users,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table audit_log (
  id bigint generated always as identity primary key,
  actor uuid references auth.users,
  action text not null,         -- create|update|verdict|config|delete
  entity text not null,
  entity_id uuid,
  diff jsonb,
  created_at timestamptz default now()
);
```

Observações: o `score` e o `tier` são derivados dos pesos ativos e das notas; recomenda-se calcular na aplicação (ou numa view/RPC) para refletir mudanças de peso sem migração. RLS ativa em todas as tabelas, conforme papéis.

## Motor de ranqueamento

O Opportunity Score é a soma ponderada de 8 fatores, cada um pontuado de 0 a 5. Os fatores e pesos padrão saem do radar de afiliados da empresa e são ajustáveis por Admin (soma sempre 100).

| Fator | Peso padrão | O que mede |
| --- | --- | --- |
| Demanda | 22 | Volume de busca, posição em mais vendidos, nº de avaliações |
| Monetização | 20 | Comissão × ticket × recorrência (EPC quando houver) |
| Prova social | 12 | Nota média + qualidade real dos comentários |
| Tendência | 12 | Subindo, estável ou caindo |
| Fit com o blog | 12 | Alinhamento ao sub-nicho e público do blog |
| Reputação | 8 | Vendedor/produtor: entrega, reembolso, reclamações |
| Facilidade SEO | 8 | Quanto menos saturada a busca, maior a nota |
| Conformidade | 6 | Menor risco YMYL/claims proibidos, maior a nota |

Fórmula (nota de cada fator normalizada por 5, ponderada pelo peso):

```latex
\text{Score} = \sum_{f=1}^{8} \left( \frac{\text{nota}_f}{5} \times \text{peso}_f \right)
```

O resultado é arredondado para inteiro de 0 a 100. Faixas de tier:

| Tier | Faixa | Leitura |
| --- | --- | --- |
| A | ≥ 75 | Prioridade — seguir |
| B | 55–74 | Promissora — testar |
| C | 35–54 | Fraca — pesquisar mais |
| Descartar | < 35 | Cortar |

Regras: se a soma dos pesos for diferente de 100, a UI bloqueia salvar e o cálculo usa a normalização pela soma vigente. Mudar pesos recalcula todos os scores (por isso o cálculo mora na aplicação, não em coluna fixa). Os limiares de tier são constantes no MVP e podem virar configuração na v1.

## Fontes e conectores

Decisão de arquitetura importante: **não existe hoje uma via limpa e oficial de descoberta automática de produtos para afiliados nas quatro fontes**. Por isso o MVP adota um padrão de *adaptador por fonte* (interface comum `SourceAdapter`) e prioriza **ingestão assistida** — cadastro manual guiado pelos sinais de cada fonte, importação por CSV e o gerador de buscas — com automação incremental onde for viável e permitido.

| Fonte | Via de dados atual | Estratégia no MVP |
| --- | --- | --- |
| Amazon | A PA-API 5.0 foi descontinuada em 15/05/2026; a nova [Creators API](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction) exige conta Associates ativa com vendas qualificadas recentes | Ingestão manual/CSV de "mais vendidos"; adaptador para Creators API só quando a conta for elegível |
| ClickBank | [APIs de conta](https://support.clickbank.com/en/articles/10535400-clickbank-apis) (Analytics, Orders); a Products API é só para vendedores; o marketplace é público mas sem API de descoberta para afiliado | Cadastro manual de Gravity, $/venda, comissão e recorrência; automação de descoberta fica como risco/possível v2 |
| Digistore24 | [API oficial](https://docs.digistore24.com/knowledge-base/api-grundlagen/) voltada a conta/transações; marketplace filtrável no app | Manual/CSV do marketplace; adaptador de conta para dados de comissão/recorrência quando fizer sentido |
| MaxWeb | Rede CPA sobre HasOffers/Tapfilliate; ofertas (inclusive exclusivas) vistas no painel após aprovação, muitas via gerente | Ingestão manual assistida; sem descoberta automática |

Contrato do adaptador (mesma forma para todas as fontes), para não acoplar o resto do módulo à realidade de cada plataforma:

```ts
interface SourceCandidate {
  name: string; category?: string; subcategory?: string;
  url?: string; signals: Record<string, string|number>; market: 'BR'|'US'|'EU';
}
interface SourceAdapter {
  source: 'amazon'|'maxweb'|'digistore24'|'clickbank';
  mode: 'manual' | 'csv' | 'api';
  // MVP: manual/csv retornam candidatos a partir de entrada humana;
  // 'api' é implementado por fonte quando/se a via oficial estiver disponível e permitida.
  fetchCandidates?(scope: {category:string; subcategory?:string}): Promise<SourceCandidate[]>;
  parseCsv?(file: File): SourceCandidate[];
}
```

Nota de conformidade técnica: qualquer automação de coleta deve respeitar os termos de uso de cada plataforma; scraping do marketplace não é recomendado como dependência do produto por risco de bloqueio e de violação de termos. As datas e regras de API acima devem ser reconfirmadas na documentação oficial no início do desenvolvimento — mudam com frequência.

## API / endpoints

Route handlers Next.js (App Router) sob `/app/api/opportunity-builder/`. Autenticação via Supabase; autorização por papel. Payloads em JSON.

| Método | Rota | Papel | Descrição |
| --- | --- | --- | --- |
| GET | `/opportunities` | todos | Lista ranqueada, com filtros (fonte, blog, tier, busca, ordenação) |
| POST | `/opportunities` | analista+ | Cria oportunidade |
| GET | `/opportunities/:id` | todos | Detalhe + dossiê |
| PATCH | `/opportunities/:id` | analista+ (dono) / editor+ | Atualiza campos, notas, ratings |
| DELETE | `/opportunities/:id` | editor+ | Remove |
| POST | `/opportunities/:id/verdict` | editor+ | Define veredito + blog + justificativa |
| POST | `/opportunities/:id/pauta` | editor+ | Gera esqueleto de pauta |
| POST | `/opportunities/import` | analista+ | Importa candidatos por CSV (por fonte) |
| GET | `/export?format=md\|csv\|json` | editor+ | Exporta pipeline |
| POST | `/search-queries` | todos | Gera buscas por termo/fonte/mercado |
| GET/PUT | `/config/weights` | admin | Lê/atualiza pesos do score |
| GET/POST/DELETE | `/config/categories` | admin | Escopo de prospecção |
| GET/POST/DELETE | `/config/blogs` | admin | Blogs temáticos |

O cálculo do score fica numa função pura compartilhada (`lib/score.ts`) usada tanto no cliente (preview ao pontuar) quanto no servidor (persistência e export), garantindo um único ponto de verdade.

## UX e telas

O protótipo funcional (ver Anexos) já define a UX de referência e as regras de negócio; o dev pode usá-lo como espec viva de comportamento. Telas do MVP:

1. **Painel ranqueado** — lista de oportunidades com score, tier, chip de fonte, blog e a "leitura de sinal" (contribuição por fator); barra lateral com filtros, busca, ordenação e visão geral (total, score médio, distribuição por tier).
2. **Ficha & score** — formulário de identidade e sinais (com dica dinâmica por fonte) e a pontuação dos 8 fatores, com o score recalculado ao vivo.
3. **Pesquisa profunda** — dossiê com as 6 frentes, cada uma com checklist, buscas prontas (copiar) e campo de achados.
4. **Veredito & pauta** — escolha do veredito, justificativa e geração do esqueleto de pauta.
5. **Gerador de buscas** — modal por termo/fonte/mercado.
6. **Exportação** — Markdown, CSV, JSON.
7. **Configuração** — blogs, categorias/subcategorias por fonte, pesos do score, mercado padrão.

Diretrizes visuais: seguir o design system dos painéis internos (Tailwind), tema claro/escuro, responsivo até mobile, foco de teclado visível e `prefers-reduced-motion` respeitado. O elemento central de cada oportunidade é a leitura de sinal — mantê-la como o destaque visual.

## Requisitos não-funcionais

- **Desempenho.** Painel com até \~1.000 oportunidades responde sem paginação pesada; ordenação e filtros no cliente para o conjunto ativo, no servidor acima disso. Cálculo de score em memória (função pura).
- **Segurança.** Autenticação Supabase; RLS por papel em todas as tabelas; nenhuma credencial de plataforma de afiliado trafega ou é armazenada em texto puro — chaves de API (quando houver) ficam em variáveis de ambiente/secret manager, nunca no banco de dados de negócio.
- **LGPD.** O módulo lida com dados de produtos e de mercado, não com dados pessoais de consumidores; qualquer nota que inclua dados pessoais deve seguir a política de retenção do sistema. Trilha de auditoria não guarda dado sensível de terceiros.
- **Auditoria.** Toda criação, edição, veredito e mudança de configuração registrada em `audit_log` com autor, ação, entidade e diff.
- **Confiabilidade dos dados.** O sistema nunca preenche números sozinho: sinais e métricas vêm de pesquisa real ou do painel da plataforma. Campos sem fonte ficam marcados como "verificar", refletindo a regra do radar de afiliados de nunca inventar dados.
- **Internacionalização.** UI e geração de buscas suportam BR (PT) e US/EU (EN); mercado por oportunidade.
- **Acessibilidade.** Contraste adequado, navegação por teclado, foco visível, movimento reduzido respeitado.

## Conformidade e políticas

A conformidade é parte do produto, não um aviso solto. Regras embutidas:

- **Fator de conformidade no score.** Nichos YMYL (saúde, finanças, emagrecimento, apostas) recebem nota menor no fator Conformidade, o que reduz o score e força pesquisa antes de seguir.
- **Sinalização no dossiê.** A frente "Conformidade & risco" checa se há claims proibidos, se o disclaimer de afiliado está previsto (CDC art. 36 e CONAR no BR; FTC nos EUA) e se a oferta é compatível com as políticas do AdSense e do tráfego pago.
- **Esqueleto de pauta.** Quando o fator Conformidade é baixo, a pauta gerada já traz o alerta de nicho sensível — nada de promessa de cura, ganho garantido ou resultado milagroso; ganchos ficam em benefícios reais e verificáveis, com "consulte um profissional" quando cabível.
- **Divulgação obrigatória.** Toda pauta lembra o aviso de link de afiliado no topo e junto ao CTA.

Essas regras espelham o radar de afiliados da empresa e protegem a reputação, a conta de AdSense e a relação com a audiência.

## Fases de entrega e roadmap

| Fase | Entrega |
| --- | --- |
| MVP | Intake manual/CSV das 4 fontes; motor de score + tiers; painel ranqueado com filtros; dossiê das 6 frentes; gerador de buscas; veredito + vínculo a blog; esqueleto de pauta; exportação MD/CSV/JSON; papéis, RLS e auditoria |
| v1 | Sinais estruturados por fonte (campos dedicados em vez de texto livre); adaptador Amazon Creators API para contas elegíveis; adaptador de conta Digistore24; limiares de tier configuráveis; histórico de score por oportunidade |
| v2 | Assistência de IA (sugestão de blog e de ângulo, rascunho de dossiê a partir de buscas); integração direta com a API de ingestão de artigos; alertas de tendência/sazonalidade; dashboards de conversão cruzando pauta publicada × oportunidade |

Dependências: cadastro de blogs e API de ingestão de artigos já existentes no sistema; disponibilidade e elegibilidade das APIs das fontes para os itens de v1/v2.

## Riscos e mitigações

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| APIs das fontes indisponíveis ou restritivas (Amazon exige vendas; sem descoberta pública) | Coleta automática limitada no MVP | Padrão de adaptador + ingestão manual/CSV; automação incremental onde permitido |
| Scraping como dependência | Bloqueio, quebra de parser, violação de termos | Não usar scraping como dependência do produto; preferir vias oficiais e entrada humana |
| Pontuação subjetiva entre analistas | Ranking inconsistente | Descrições claras por fator, exemplos calibrados, revisão do editor antes do veredito |
| Dados inventados ("achismo") | Decisão ruim, risco de reputação | Regra de nunca inventar dados; campos "verificar"; sinais sempre de fonte real |
| Nicho YMYL mal tratado | Suspensão de AdSense/tráfego pago | Fator de conformidade no score + checagem no dossiê + alerta na pauta |
| Mudança de políticas/APIs das plataformas | Retrabalho | Isolar cada fonte no adaptador; reconfirmar docs no início do dev |

## Critérios de aceite do MVP

- [ ] Admin cadastra blogs, categorias/subcategorias por fonte e ajusta pesos (soma validada em 100).
- [ ] Usuário cria oportunidade nas 4 fontes, com dica de sinais por fonte.
- [ ] Score (0–100) e tier calculados corretamente conforme a fórmula; recalculam ao mudar notas ou pesos.
- [ ] Painel ranqueia, filtra (fonte/blog/tier), busca e ordena; leitura de sinal visível.
- [ ] Dossiê das 6 frentes com checklist, buscas geradas (copiáveis) e achados persistidos.
- [ ] Gerador de buscas produz consultas corretas por termo/fonte/mercado.
- [ ] Editor registra veredito, vincula blog e gera esqueleto de pauta com divulgação.
- [ ] Exportação MD/CSV/JSON íntegra.
- [ ] Papéis e RLS aplicados; ações registradas na auditoria.
- [ ] Tema claro/escuro, responsivo em mobile, acessível por teclado.

## Questões em aberto

1. O cadastro de blogs e a API de ingestão de artigos do sistema atual expõem os campos de que o módulo precisa (id do blog, criação de rascunho de pauta)?
2. O MVP deve incluir importação por CSV já na primeira entrega, ou só cadastro manual?
3. Os limiares de tier (75/55/35) atendem à operação ou precisam ser configuráveis desde o MVP?
4. Precisamos de histórico de score por oportunidade já no MVP, ou basta o valor atual?
5. Haverá conta Amazon Associates elegível à Creators API para justificar o adaptador de API na v1?
6. Quem são os papéis reais na equipe e como mapeiam para analista/editor/admin?

## Anexos e referências

- **Protótipo funcional (UX e regras de negócio):** [Opportunity Builder](https://claude.ai/artifact/GBBczTvuoYJbWUAZaoKRPE) — console de prospecção com intake, score, dossiê, gerador de buscas e exportação; use como espec viva de comportamento.
- **Modelo de pontuação:** deriva do radar de afiliados interno (critérios de "alto resultado" e regras de conformidade CDC/CONAR/FTC).

**Fontes técnicas consultadas (reconfirmar no início do dev — mudam com frequência):**

- Amazon: [Creators API (introdução)](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction) e o aviso de descontinuação da PA-API 5.0 em 15/05/2026 na [documentação PA-API](https://webservices.amazon.com/paapi5/documentation/register-for-pa-api.html).
- ClickBank: [ClickBank APIs](https://support.clickbank.com/en/articles/10535400-clickbank-apis) e [como criar chaves de API](https://support.clickbank.com/en/articles/10535395-how-to-create-clickbank-api-keys).
- Digistore24: [API — fundamentos](https://docs.digistore24.com/knowledge-base/api-grundlagen/).
- MaxWeb: rede CPA sobre infraestrutura HasOffers/Tapfilliate; ofertas acessadas no painel após aprovação.
