import { OpportunityMarket, OpportunitySource } from '../types/opportunity';

export interface GeneratedQuery {
  category: string;
  query: string;
  purpose: string;
}

/**
 * Gera consultas estratégicas de pesquisa de mercado nos padrões do Radar de Afiliados.
 */
export function generateMarketSearchQueries(
  productName: string,
  source: OpportunitySource,
  market: OpportunityMarket = 'US'
): GeneratedQuery[] {
  const isBR = market === 'BR';

  if (isBR) {
    return [
      {
        category: 'Demanda & Avaliações Reais',
        query: `"${productName}" vale a pena OR funciona OR resenha site:youtube.com OR site:reclameaqui.com.br`,
        purpose: 'Descobrir dores reais, qualidade da entrega e reclamações de consumidores.',
      },
      {
        category: 'Comunidades & Opiniões Espontâneas',
        query: `"${productName}" site:reddit.com/r/brasil OR site:hardmob.com.br OR "alguém já usou"`,
        purpose: 'Opiniões sem incentivo financeiro de comissão.',
      },
      {
        category: 'Concorrência & Ângulo de Conteúdo',
        query: `melhores alternativas "${productName}" -site:mercadolivre.com.br -site:amazon.com.br`,
        purpose: 'Identificar concorrentes diretos e lacunas não cobertas por outros blogs.',
      },
      {
        category: 'Conformidade & YMYL (Saúde/Finanças)',
        query: `"${productName}" Anvisa OR golpe OR alerta OR contraindicação`,
        purpose: 'Checar restrições regulatórias e claims proibidos.',
      },
    ];
  }

  // Mercado US / Global (Inglês)
  return [
    {
      category: 'Real Consumer Reviews & Complaints',
      query: `"${productName}" review OR "is it worth it" site:reddit.com OR site:youtube.com`,
      purpose: 'Uncover unbiased feedback and primary pain points.',
    },
    {
      category: 'Unsponsored Community Discussions',
      query: `"${productName}" "honest review" -site:amazon.com -site:clickbank.net`,
      purpose: 'Filter out affiliate landing pages to find authentic user reactions.',
    },
    {
      category: 'Competitive & SEO Angles',
      query: `best alternatives to "${productName}" vs`,
      purpose: 'Map comparison keywords and search intent gaps.',
    },
    {
      category: 'Compliance & Risk Check (FTC/YMYL)',
      query: `"${productName}" scam OR lawsuit OR "side effects" OR "FDA warning"`,
      purpose: 'Ensure compliance with FTC endorsement guides and AdSense safety.',
    },
  ];
}
