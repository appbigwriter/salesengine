export type OpportunitySource = 'amazon' | 'maxweb' | 'digistore24' | 'clickbank';
export type OpportunityTier = 'A' | 'B' | 'C' | 'D'; // A: >=75, B: 55-74, C: 35-54, D: <35 (Descartar)
export type OpportunityVerdict = 'pesquisar' | 'testar' | 'seguir' | 'descartar';
export type OpportunityMarket = 'BR' | 'US' | 'EU';

export interface ScoreFactors {
  demanda: number;        // Peso 22 (0-5)
  monetizacao: number;    // Peso 20 (0-5)
  provaSocial: number;    // Peso 12 (0-5)
  tendencia: number;      // Peso 12 (0-5)
  fitBlog: number;        // Peso 12 (0-5)
  reputacao: number;      // Peso 8 (0-5)
  facilidadeSeo: number;  // Peso 8 (0-5)
  conformidade: number;   // Peso 6 (0-5)
}

export interface ScoreWeights {
  demanda: number;
  monetizacao: number;
  provaSocial: number;
  tendencia: number;
  fitBlog: number;
  reputacao: number;
  facilidadeSeo: number;
  conformidade: number;
}

export interface ScoreHistoryEntry {
  id: string;
  opportunityId: string;
  score: number;
  tier: OpportunityTier;
  ratings: ScoreFactors;
  reason?: string;
  changedBy: string;
  createdAt: string;
}

export interface DossierSection {
  completed: boolean;
  checks: Record<string, boolean>;
  notes: string;
}

export interface OpportunityDossier {
  demandaMercado: DossierSection;
  publicoDor: DossierSection;
  concorrenciaSeo: DossierSection;
  anguloEditorial: DossierSection;
  monetizacaoConfirmada: DossierSection;
  conformidadeRisco: DossierSection;
}

export interface OpportunityBlog {
  id: string;
  name: string;
  niche: string;
  url?: string;
  externalBlogId?: string;
}

export interface OpportunityPauta {
  opportunityId: string;
  blogId: string;
  title: string;
  hook: string;
  targetAudience: string;
  disclosureNotice: string;
  sensitiveAlert?: string;
  recommendedAngle: string;
  callToAction: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  name: string;
  source: OpportunitySource;
  category: string;
  subcategory?: string;
  market: OpportunityMarket;
  url?: string;
  signals: string;
  ratings: ScoreFactors;
  score: number;
  tier: OpportunityTier;
  verdict?: OpportunityVerdict;
  verdictNote?: string;
  blogId?: string;
  blogName?: string;
  dossier: OpportunityDossier;
  scoreHistory: ScoreHistoryEntry[];
  pauta?: OpportunityPauta;
  createdAt: string;
  updatedAt: string;
}
