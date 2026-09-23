import { ScoreFactors, ScoreWeights, OpportunityTier } from '../types/opportunity';

export const DEFAULT_SCORE_WEIGHTS: ScoreWeights = {
  demanda: 22,
  monetizacao: 20,
  provaSocial: 12,
  tendencia: 12,
  fitBlog: 12,
  reputacao: 8,
  facilidadeSeo: 8,
  conformidade: 6,
};

/**
 * Calcula o Opportunity Score ponderado (0 a 100).
 * Fórmula: Score = soma((nota_f / 5) * peso_f)
 */
export function calculateOpportunityScore(
  ratings: ScoreFactors,
  weights: ScoreWeights = DEFAULT_SCORE_WEIGHTS
): { score: number; tier: OpportunityTier; factorContributions: Record<keyof ScoreFactors, number> } {
  const totalWeight = Object.values(weights).reduce((acc, curr) => acc + curr, 0) || 100;

  const factorContributions = {
    demanda: ((ratings.demanda || 0) / 5) * weights.demanda,
    monetizacao: ((ratings.monetizacao || 0) / 5) * weights.monetizacao,
    provaSocial: ((ratings.provaSocial || 0) / 5) * weights.provaSocial,
    tendencia: ((ratings.tendencia || 0) / 5) * weights.tendencia,
    fitBlog: ((ratings.fitBlog || 0) / 5) * weights.fitBlog,
    reputacao: ((ratings.reputacao || 0) / 5) * weights.reputacao,
    facilidadeSeo: ((ratings.facilidadeSeo || 0) / 5) * weights.facilidadeSeo,
    conformidade: ((ratings.conformidade || 0) / 5) * weights.conformidade,
  };

  const rawScore = Object.values(factorContributions).reduce((acc, curr) => acc + curr, 0);
  
  // Normalização caso a soma não seja exatamente 100
  const normalizedScore = Math.round((rawScore / totalWeight) * 100);
  const finalScore = Math.min(100, Math.max(0, normalizedScore));

  let tier: OpportunityTier = 'D';
  if (finalScore >= 75) {
    tier = 'A';
  } else if (finalScore >= 55) {
    tier = 'B';
  } else if (finalScore >= 35) {
    tier = 'C';
  } else {
    tier = 'D';
  }

  return {
    score: finalScore,
    tier,
    factorContributions,
  };
}

export function getTierLabel(tier: OpportunityTier): { label: string; badgeColor: string; description: string } {
  switch (tier) {
    case 'A':
      return {
        label: 'Tier A (≥ 75)',
        badgeColor: 'bg-accent-emerald/20 text-accent-emerald border-accent-emerald/40',
        description: 'Prioridade Alta — Seguir para Pauta',
      };
    case 'B':
      return {
        label: 'Tier B (55–74)',
        badgeColor: 'bg-brand/20 text-brand border-brand/40',
        description: 'Promissora — Testar & Validar',
      };
    case 'C':
      return {
        label: 'Tier C (35–54)',
        badgeColor: 'bg-accent-amber/20 text-accent-amber border-accent-amber/40',
        description: 'Fraca — Pesquisar Mais',
      };
    case 'D':
    default:
      return {
        label: 'Descartar (< 35)',
        badgeColor: 'bg-accent-rose/20 text-accent-rose border-accent-rose/40',
        description: 'Cortar do Pipeline',
      };
  }
}
