import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format') || 'md';

  if (format === 'json') {
    return NextResponse.json({
      exportedAt: new Date().toISOString(),
      format: 'json',
      version: '1.0.0',
      message: 'Exportação completa do pipeline de oportunidades'
    });
  }

  if (format === 'csv') {
    const csvContent = [
      'ID,Produto,Fonte,Mercado,Score,Tier,Veredito,Blog,Notas',
      '1,"Fritadeira Air Fryer Conectada 6L",amazon,BR,88,A,seguir,"Gourmet & Café Brasil","Top 1 mais vendido"',
      '2,"Suplemento Nootrópico Natural",maxweb,US,76,A,testar,"Saúde & Longevidade Prática","EPC $3.80"',
      '3,"Guia de Automação com IA para Negócios",digistore24,EU,62,B,pesquisar,"Finanças & Renda Digital","Comissão 70%"'
    ].join('\n');

    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="pipeline-oportunidades.csv"',
      },
    });
  }

  // Markdown Default
  const markdownReport = [
    '# Relatório Executivo do Pipeline — Opportunity Builder',
    `*Gerado em: ${new Date().toLocaleString('pt-BR')}*`,
    '',
    '## 1. Oportunidades Prioritárias (Tier A — Score ≥ 75)',
    '- **Fritadeira Air Fryer Conectada 6L (Amazon BR)** — Score: **88/100** | Blog: *Gourmet & Café Brasil* | Veredito: **Seguir para Pauta**',
    '- **Suplemento Nootrópico Natural (MaxWeb US)** — Score: **76/100** | Blog: *Saúde & Longevidade Prática* | Veredito: **Testar**',
    '',
    '## 2. Oportunidades em Validação (Tier B — Score 55–74)',
    '- **Guia de Automação com IA para Negócios (Digistore24 EU)** — Score: **62/100** | Blog: *Finanças & Renda Digital* | Veredito: **Pesquisar mais**',
  ].join('\n');

  return new Response(markdownReport, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Disposition': 'attachment; filename="relatorio-oportunidades.md"',
    },
  });
}
