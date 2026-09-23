import { NextResponse } from 'next/server';
import { OpportunityBlog } from '../../../../types/opportunity';

// Blogs temáticos do ecossistema FBR
const mockBlogs: OpportunityBlog[] = [
  {
    id: 'blog-1',
    name: 'Tech & Home Guide',
    niche: 'Tecnologia, Casa Inteligente & Gadgets',
    url: 'https://techhome.fbr.news',
    externalBlogId: 'fbr-blog-01'
  },
  {
    id: 'blog-2',
    name: 'Saúde & Longevidade Prática',
    niche: 'Nutrição, Suplementos & Bem-Estar (YMYL)',
    url: 'https://saudepratica.fbr.news',
    externalBlogId: 'fbr-blog-02'
  },
  {
    id: 'blog-3',
    name: 'Finanças & Renda Digital',
    niche: 'Ferramentas de Negócios, Investimentos & SaaS',
    url: 'https://financasdigital.fbr.news',
    externalBlogId: 'fbr-blog-03'
  },
  {
    id: 'blog-4',
    name: 'Gourmet & Café Brasil',
    niche: 'Gastronomia, Eletrodomésticos & Cozinha',
    url: 'https://gourmetcafe.fbr.news',
    externalBlogId: 'fbr-blog-04'
  }
];

export async function GET() {
  return NextResponse.json({
    blogs: mockBlogs,
    count: mockBlogs.length,
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, niche, url, externalBlogId } = body;

    if (!name || !niche) {
      return NextResponse.json({ error: 'Nome e nicho são obrigatórios' }, { status: 400 });
    }

    const newBlog: OpportunityBlog = {
      id: `blog-${Date.now()}`,
      name,
      niche,
      url: url || '',
      externalBlogId: externalBlogId || `fbr-blog-${Date.now()}`
    };

    return NextResponse.json({ blog: newBlog, message: 'Blog cadastrado com sucesso' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Falha ao processar cadastro de blog' }, { status: 500 });
  }
}
