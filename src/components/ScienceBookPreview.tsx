
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, Quote } from 'lucide-react';

interface ScienceBookPreviewProps {
  text: string;
  theme: string;
}

export const ScienceBookPreview = ({ text, theme }: ScienceBookPreviewProps) => {
  const formatTextForScienceBook = (text: string) => {
    const paragraphs = text.split('\n\n').filter(p => p.trim());
    const mainTitle = paragraphs[0]?.slice(0, 50).toUpperCase() || "A TEORIA DA RELATIVIDADE";
    const author = "ALBERT EINSTEIN (1879-1955)";
    const content = paragraphs.slice(1).join('\n\n') || paragraphs[0] || text;

    return { mainTitle, author, content };
  };

  const { mainTitle, author, content } = formatTextForScienceBook(text);

  const themeColors = {
    pink: { 
      context: 'bg-yellow-400', 
      quote: 'bg-pink-500', 
      bio: 'bg-blue-600',
      section: 'bg-green-500',
      text: 'text-pink-500'
    },
    yellow: { 
      context: 'bg-yellow-400', 
      quote: 'bg-orange-500', 
      bio: 'bg-blue-600',
      section: 'bg-purple-500',
      text: 'text-yellow-600'
    },
    blue: { 
      context: 'bg-yellow-400', 
      quote: 'bg-blue-500', 
      bio: 'bg-indigo-600',
      section: 'bg-teal-500',
      text: 'text-blue-500'
    },
    green: { 
      context: 'bg-yellow-400', 
      quote: 'bg-green-500', 
      bio: 'bg-blue-600',
      section: 'bg-emerald-500',
      text: 'text-green-500'
    },
    orange: { 
      context: 'bg-yellow-400', 
      quote: 'bg-orange-500', 
      bio: 'bg-blue-600',
      section: 'bg-red-500',
      text: 'text-orange-500'
    },
    purple: { 
      context: 'bg-yellow-400', 
      quote: 'bg-purple-500', 
      bio: 'bg-blue-600',
      section: 'bg-violet-500',
      text: 'text-purple-500'
    }
  };

  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.pink;

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-2xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <ScrollArea className="h-[600px]">
        <div className="bg-white p-6 md:p-10">
          
          {/* Cabeçalho da Seção Temática */}
          <div className="text-center mb-8">
            <div className={`${colors.section} inline-block px-6 py-2 rounded-full mb-4`}>
              <h3 className="text-white font-black text-lg uppercase tracking-wide">
                REVOLUÇÃO CIENTÍFICA
              </h3>
            </div>
            <div className={`h-1 w-16 ${colors.section} mx-auto mb-2`}></div>
            <p className="text-gray-600 text-sm uppercase tracking-wide">
              SÉCULO XX - 1905-1915
            </p>
          </div>

          {/* Título Principal da Grande Ideia */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 uppercase tracking-tight leading-none mb-6" 
                style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
              {mainTitle}
            </h1>
            
            {/* Nome do Autor */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 uppercase tracking-wide">
              {author}
            </h2>
          </div>

          {/* Layout Principal - Duas Colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna da Esquerda - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Caixa EM CONTEXTO */}
              <div className={`${colors.context} p-6 rounded-lg`}>
                <h3 className="font-black text-2xl uppercase tracking-wide text-gray-900 mb-4" 
                    style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                  EM CONTEXTO
                </h3>
                
                <div className="space-y-4 text-gray-800">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-1">RAMO</h4>
                    <p className="text-sm">Física Teórica / Cosmologia</p>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-gray-600" />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-1">ANTES</h4>
                      <p className="text-sm">Física newtoniana dominava a compreensão do universo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-1 text-gray-600" />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-1">DEPOIS</h4>
                      <p className="text-sm">Revolução na física moderna e cosmologia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Texto Principal */}
              <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4" 
                   style={{ fontFamily: 'Georgia, serif', textAlign: 'justify' }}>
                {content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
                
                {content.length < 200 && (
                  <>
                    <p>A teoria da relatividade revolucionou nossa compreensão do universo, mostrando que o tempo e o espaço são relativos e interconectados. Esta descoberta fundamental mudou para sempre a física moderna.</p>
                    <p>Einstein demonstrou que a velocidade da luz é constante para todos os observadores, independentemente de seu movimento, levando a consequências profundas sobre a natureza da realidade.</p>
                  </>
                )}
              </div>
            </div>

            {/* Coluna da Direita - 1/3 */}
            <div className="space-y-6">
              
              {/* Placeholder para Ilustração */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Diagrama E=mc²</span>
                </div>
                <p className="text-xs text-gray-500 italic">
                  Representação visual da equivalência massa-energia
                </p>
              </div>

              {/* Bloco de Citação Destacada */}
              <div className={`${colors.quote} p-6 rounded-lg text-white relative overflow-hidden`}>
                {/* Aspas Gráficas Gigantes */}
                <Quote className="absolute top-2 left-2 h-8 w-8 opacity-30" />
                <Quote className="absolute bottom-2 right-2 h-8 w-8 opacity-30 rotate-180" />
                
                <blockquote className="text-lg md:text-xl font-serif italic leading-relaxed relative z-10" 
                           style={{ fontFamily: 'Georgia, serif' }}>
                  "A imaginação é mais importante que o conhecimento."
                </blockquote>
                <cite className="block text-right text-sm font-bold mt-4 opacity-90">
                  — Albert Einstein
                </cite>
              </div>

              {/* Caixa de Biografia */}
              <div className={`${colors.bio} p-6 rounded-lg text-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🔬</span>
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-wide" 
                        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                      ALBERT EINSTEIN
                    </h4>
                    <p className="text-sm opacity-90">1879-1955</p>
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed mb-4">
                  Físico teórico alemão, considerado um dos maiores gênios da história da ciência. 
                  Desenvolveu as teorias da relatividade especial e geral.
                </p>
                
                <div>
                  <h5 className="font-bold text-sm uppercase tracking-wide mb-2">PRINCIPAIS OBRAS</h5>
                  <ul className="text-xs space-y-1 opacity-90">
                    <li>• Teoria da Relatividade Especial (1905)</li>
                    <li>• Teoria da Relatividade Geral (1915)</li>
                    <li>• Prêmio Nobel de Física (1921)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
