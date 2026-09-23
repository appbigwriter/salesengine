import { OpportunitySource, OpportunityMarket } from '../../types/opportunity';

export interface SourceSignalField {
  key: string;
  label: string;
  placeholder: string;
  hint: string;
}

export interface SourceAdapterConfig {
  source: OpportunitySource;
  displayName: string;
  defaultMarket: OpportunityMarket;
  signalFields: SourceSignalField[];
  apiReady: boolean;
  notes: string;
}

export const SOURCE_ADAPTERS: Record<OpportunitySource, SourceAdapterConfig> = {
  amazon: {
    source: 'amazon',
    displayName: 'Amazon Associates / Creators API',
    defaultMarket: 'BR',
    apiReady: true,
    notes: 'Suporte a intake de Mais Vendidos, Nº de Avaliações, Selo Escolha da Amazon e Creators API oficial.',
    signalFields: [
      { key: 'reviewsCount', label: 'Nº de Avaliações', placeholder: 'Ex: 2.450 avaliações', hint: 'Volume de prova social acumulada' },
      { key: 'averageRating', label: 'Nota Média', placeholder: 'Ex: 4.6 de 5 estrelas', hint: 'Qualidade percebida pelo comprador' },
      { key: 'badge', label: 'Selo / Posição', placeholder: 'Ex: Mais Vendido em Cozinha / Amazon Choice', hint: 'Indicação de alta velocidade de venda' },
      { key: 'commissionRate', label: '% de Comissão Padrão', placeholder: 'Ex: 9% a 15%', hint: 'Tabela de associados por categoria' },
    ],
  },
  clickbank: {
    source: 'clickbank',
    displayName: 'ClickBank Marketplace',
    defaultMarket: 'US',
    apiReady: false,
    notes: 'Métricas de marketplace de alta conversão: Gravity Score, Valor médio por venda e comissão recorrente.',
    signalFields: [
      { key: 'gravity', label: 'Gravity Score', placeholder: 'Ex: 145.8', hint: 'Número de afiliados distintos que converteram nos últimos 14 dias' },
      { key: 'initialPayout', label: '$/Venda Inicial', placeholder: 'Ex: $128.50', hint: 'Comissão média na primeira compra' },
      { key: 'recurringCommission', label: 'Comissão Recorrente / Upsell', placeholder: 'Ex: $49/mês (Rebill)', hint: 'Potencial de LTV por comprador' },
      { key: 'refundRate', label: 'Taxa de Reembolso Estimada', placeholder: 'Ex: < 3%', hint: 'Sinal de qualidade do produto' },
    ],
  },
  maxweb: {
    source: 'maxweb',
    displayName: 'MaxWeb CPA Network',
    defaultMarket: 'US',
    apiReady: false,
    notes: 'Rede CPA de alta performance: EPC (Earnings Per Click), Payout fixo e ofertas VSL testadas.',
    signalFields: [
      { key: 'epc', label: 'EPC Médio', placeholder: 'Ex: $3.40 EPC', hint: 'Ganhos médios por clique gerado' },
      { key: 'payout', label: 'Payout CPA por Conversão', placeholder: 'Ex: $85.00 CPA', hint: 'Valor pago por venda aprovada' },
      { key: 'vslType', label: 'Formato da Oferta', placeholder: 'Ex: VSL Longa + Texto', hint: 'Tipo de criativo e página de destino' },
      { key: 'geoAllowed', label: 'Geolocalizações Permitidas', placeholder: 'Ex: US, CA, UK, AU', hint: 'Países com tráfego liberado' },
    ],
  },
  digistore24: {
    source: 'digistore24',
    displayName: 'Digistore24 Marketplace',
    defaultMarket: 'EU',
    apiReady: false,
    notes: 'Plataforma forte na Europa e EUA: % de comissão líquida, taxa de cancelamento e conversão de carrinho.',
    signalFields: [
      { key: 'commission', label: '% de Comissão', placeholder: 'Ex: 65% a 85%', hint: 'Porcentagem repassada ao afiliado' },
      { key: 'cartConversion', label: 'Conversão do Carrinho', placeholder: 'Ex: 8.5%', hint: 'Taxa de checkout da página do produtor' },
      { key: 'cancellationRate', label: 'Taxa de Cancelamento', placeholder: 'Ex: Baixa (2.1%)', hint: 'Retenção de comissão' },
      { key: 'vatCompliance', label: 'Fit com UE / IVA (VAT)', placeholder: 'Ex: Faturado na Alemanha', hint: 'Conformidade com mercado europeu' },
    ],
  },
};
