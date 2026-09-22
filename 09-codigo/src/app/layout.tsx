import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FBR Sales Engine — Revenue Acceleration Platform',
  description: 'Motor de prospecção, qualificação autônoma por IA e gestão de pipeline para a FBR Agency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-background text-slate-100 min-h-screen antialiased selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
