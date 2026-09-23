import React, { useState, useEffect } from 'react';
import { Opportunity, OpportunityVerdict, OpportunityBlog, OpportunityPauta } from '../../types/opportunity';
import { X, FileText, Check, AlertTriangle, ShieldCheck, ExternalLink, Sparkles, Copy } from 'lucide-react';

interface VerdictPautaModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity: Opportunity | null;
  onSaveVerdict: (opp: Opportunity) => void;
}

export const VerdictPautaModal: React.FC<VerdictPautaModalProps> = ({
  isOpen,
  onClose,
  opportunity,
  onSaveVerdict,
}) => {
  if (!isOpen || !opportunity) return null;

  const [verdict, setVerdict] = useState<OpportunityVerdict>(opportunity.verdict || 'seguir');
  const [verdictNote, setVerdictNote] = useState(opportunity.verdictNote || '');
  const [selectedBlogId, setSelectedBlogId] = useState(opportunity.blogId || 'blog-1');
  const [blogs, setBlogs] = useState<OpportunityBlog[]>([
    { id: 'blog-1', name: 'Tech & Home Guide', niche: 'Tecnologia, Casa Inteligente & Gadgets' },
    { id: 'blog-2', name: 'Saúde & Longevidade Prática', niche: 'Nutrição, Suplementos & Bem-Estar (YMYL)' },
    { id: 'blog-3', name: 'Finanças & Renda Digital', niche: 'Ferramentas de Negócios, Investimentos & SaaS' },
    { id: 'blog-4', name: 'Gourmet & Café Brasil', niche: 'Gastronomia, Eletrodomésticos & Cozinha' },
  ]);

  const [generatedPauta, setGeneratedPauta] = useState<OpportunityPauta | null>(opportunity.pauta || null);
  const [isCopied, setIsCopied] = useState(false);

  const selectedBlog = blogs.find(b => b.id === selectedBlogId) || blogs[0];

  const handleGeneratePauta = () => {
    const isYMYL = opportunity.ratings.conformidade <= 2;
    const pauta: OpportunityPauta = {
      opportunityId: opportunity.id,
      blogId: selectedBlog.id,
      title: `[Pauta] Vale a pena comprar ${opportunity.name}? Análise Completa & Testes Reais`,
      hook: `Você já se perguntou se o ${opportunity.name} realmente entrega o que promete no dia a dia? Testamos e analisamos todas as principais características, vantagens reais e pontos fracos antes de você tomar sua decisão de compra.`,
      targetAudience: `Consumidores no nicho de ${selectedBlog.niche} que buscam uma solução eficiente e com bom custo-benefício.`,
      disclosureNotice: 'Transparência editorial: Este artigo contém links de afiliados. Ao comprar por meio de nossas recomendações, nosso blog pode receber uma comissão sem nenhum custo extra para você.',
      sensitiveAlert: isYMYL ? 'ALERTA DE CONFORMIDADE YMYL: Este produto trata de saúde/finanças. Não fazer promessas milagrosas. Incluir recomendação de consulta profissional.' : undefined,
      recommendedAngle: `Estrutura em 5 seções: 1. O que é e para quem é indicado | 2. Prós e Contras Reais (sem viés) | 3. Comparativo com alternativas do mercado | 4. Veredito final | 5. Onde encontrar o melhor preço oficial.`,
      callToAction: `Confira a oferta oficial com desconto e garantia de entrega no link verificado abaixo.`,
      createdAt: new Date().toISOString(),
    };

    setGeneratedPauta(pauta);
  };

  const handleSave = () => {
    const updatedOpp: Opportunity = {
      ...opportunity,
      verdict,
      verdictNote,
      blogId: selectedBlog.id,
      blogName: selectedBlog.name,
      pauta: generatedPauta || undefined,
      updatedAt: new Date().toISOString(),
    };

    onSaveVerdict(updatedOpp);
    onClose();
  };

  const handleCopyMarkdown = () => {
    if (!generatedPauta) return;
    const md = [
      `# ${generatedPauta.title}`,
      `**Blog Destino:** ${selectedBlog.name} (${selectedBlog.niche})`,
      `**Data de Geração:** ${new Date().toLocaleDateString('pt-BR')}`,
      '',
      `> ℹ️ **Divulgação Obrigatória de Afiliado (CDC/CONAR/FTC):**`,
      `> ${generatedPauta.disclosureNotice}`,
      '',
      generatedPauta.sensitiveAlert ? `> ⚠️ **${generatedPauta.sensitiveAlert}**\n` : '',
      `## Gancho de Abertura`,
      generatedPauta.hook,
      '',
      `## Público-Alvo`,
      generatedPauta.targetAudience,
      '',
      `## Ângulo Recomendado & Estrutura de Tópicos`,
      generatedPauta.recommendedAngle,
      '',
      `## Chamada para Ação (CTA Ético)`,
      generatedPauta.callToAction,
    ].join('\n');

    navigator.clipboard.writeText(md);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-surface-border rounded-2xl w-full max-w-3xl max-h-[92vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Veredito & Encaminhamento para Blog</h3>
              <p className="text-[11px] text-slate-400">
                Produto: <strong className="text-slate-200">{opportunity.name}</strong> • Score: <strong className="text-accent-emerald">{opportunity.score}/100</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Veredito Grid */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Veredito do Editor</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'seguir', label: 'Seguir (Pauta)', color: 'border-accent-emerald text-accent-emerald bg-accent-emerald/10' },
                { id: 'testar', label: 'Testar', color: 'border-brand text-brand bg-brand/10' },
                { id: 'pesquisar', label: 'Pesquisar Mais', color: 'border-accent-amber text-accent-amber bg-accent-amber/10' },
                { id: 'descartar', label: 'Descartar', color: 'border-accent-rose text-accent-rose bg-accent-rose/10' },
              ].map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVerdict(v.id as OpportunityVerdict)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    verdict === v.id ? v.color : 'border-surface-border text-slate-400 bg-surface-elevated/40 hover:bg-surface-elevated'
                  }`}
                >
                  {verdict === v.id && <Check className="w-3.5 h-3.5" />}
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vínculo de Blog */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Vincular ao Blog Temático</label>
              <select
                value={selectedBlogId}
                onChange={(e) => setSelectedBlogId(e.target.value)}
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand font-medium"
              >
                {blogs.map(b => (
                  <option key={b.id} value={b.id}>{b.name} — ({b.niche})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400">Justificativa do Veredito</label>
              <input
                type="text"
                value={verdictNote}
                onChange={(e) => setVerdictNote(e.target.value)}
                placeholder="Ex: Produto com excelente volume e ticket médio atrativo"
                className="w-full bg-surface-card border border-surface-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Gerador de Pauta */}
          <div className="pt-2 border-t border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-purple" />
                  Esqueleto de Pauta Editorial
                </h4>
                <p className="text-[11px] text-slate-400">Pauta estruturada nos padrões do Radar de Afiliados com aviso de conformidade</p>
              </div>

              <button
                type="button"
                onClick={handleGeneratePauta}
                className="px-3 py-1.5 bg-gradient-to-r from-brand to-accent-purple hover:opacity-90 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> {generatedPauta ? 'Regerar Pauta' : 'Gerar Esqueleto de Pauta'}
              </button>
            </div>

            {generatedPauta && (
              <div className="p-4 rounded-xl bg-surface-elevated/80 border border-surface-border space-y-3 text-xs animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{generatedPauta.title}</span>
                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="p-1.5 rounded bg-surface-card hover:bg-brand/20 text-slate-300 hover:text-brand transition flex items-center gap-1 text-[11px]"
                  >
                    {isCopied ? <><Check className="w-3.5 h-3.5 text-accent-emerald" /> Copiado</> : <><Copy className="w-3.5 h-3.5" /> Copiar Markdown</>}
                  </button>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-card border border-surface-border text-slate-300 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Gancho de Abertura:</span>
                  <p className="italic">{generatedPauta.hook}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-surface-card border border-surface-border text-slate-300 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase">Aviso Obrigatório de Divulgação:</span>
                  <p className="text-[11px] text-accent-emerald">{generatedPauta.disclosureNotice}</p>
                </div>

                {generatedPauta.sensitiveAlert && (
                  <div className="p-2.5 rounded-lg bg-accent-rose/15 border border-accent-rose/30 text-accent-rose text-[11px]">
                    {generatedPauta.sensitiveAlert}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-card flex items-center justify-end gap-2 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-surface-elevated hover:bg-surface-border text-slate-300 rounded-lg font-medium transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-brand hover:bg-brand-hover text-white rounded-lg font-semibold shadow-md shadow-brand/20 transition flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Salvar Veredito & Vincular
          </button>
        </div>
      </div>
    </div>
  );
};
