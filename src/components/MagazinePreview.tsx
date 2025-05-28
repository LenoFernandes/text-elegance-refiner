
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, User, Tag } from 'lucide-react';

interface MagazinePreviewProps {
  text: string;
  theme: string;
}

export const MagazinePreview = ({ text, theme }: MagazinePreviewProps) => {
  const formatTextForMagazine = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const title = paragraphs[0]?.slice(0, 80) || "TÍTULO DA MATÉRIA";
    const subtitle = paragraphs[0]?.slice(81, 150) || "Subtítulo complementar da matéria";
    const content = paragraphs.slice(1).join('\n\n') || paragraphs[0] || text;

    return { title, subtitle, content };
  };

  const { title, subtitle, content } = formatTextForMagazine(text);

  const themeColors = {
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', border: 'border-orange-500' },
    green: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-500', border: 'border-pink-500' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', border: 'border-purple-500' }
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.orange;

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-lg">
      <div className={`${colors.bg} p-3 text-white`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wide">
            Preview - Estilo Magazine
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3" />
            <span>2024</span>
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-96">
        <div className="bg-white">
          {/* Header da Revista */}
          <div className={`${colors.bg} h-3`}></div>
          
          {/* Seção Principal */}
          <div className="p-6">
            {/* Título Principal */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 leading-tight mb-2">
                {title.toUpperCase()}
              </h1>
              <div className={`h-1 w-20 ${colors.bg} mb-3`}></div>
              <p className={`text-lg font-bold ${colors.text} mb-4`}>
                {subtitle}
              </p>
            </div>

            {/* Metadados */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span className="font-medium">Redação</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Janeiro 2024</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Tag className="h-4 w-4" />
                <span>Matéria</span>
              </div>
            </div>

            {/* Seção EM CONTEXTO */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              <div className={`${colors.bg} p-4 rounded-lg text-white lg:col-span-1`}>
                <h3 className="font-black text-sm uppercase tracking-wide mb-3">
                  EM CONTEXTO
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold">TEMA:</span>
                    <p className="opacity-90">Informação relevante</p>
                  </div>
                  <div>
                    <span className="font-bold">DATA:</span>
                    <p className="opacity-90">2024</p>
                  </div>
                  <div>
                    <span className="font-bold">FONTE:</span>
                    <p className="opacity-90">Pesquisa atual</p>
                  </div>
                </div>
              </div>

              {/* Conteúdo Principal */}
              <div className="lg:col-span-3">
                <div className="text-sm leading-relaxed text-gray-800 space-y-4">
                  {content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-justify">
                      {index === 0 && (
                        <span className={`text-6xl font-black ${colors.text} float-left mr-2 leading-none`}>
                          {paragraph.charAt(0)}
                        </span>
                      )}
                      {index === 0 ? paragraph.slice(1) : paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção de Destaque */}
            <div className={`${colors.bg} p-4 rounded-lg text-white mb-6`}>
              <h4 className="font-black text-sm uppercase tracking-wide mb-2">
                DESTAQUE
              </h4>
              <p className="text-sm opacity-90 italic">
                "Esta é uma informação importante destacada do texto principal"
              </p>
            </div>

            {/* Footer da Página */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 text-xs text-gray-500">
              <span>Veja também: Temas relacionados</span>
              <span className="font-bold">Página 1</span>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
