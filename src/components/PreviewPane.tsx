
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewPaneProps {
  text: string;
}

export const PreviewPane = ({ text }: PreviewPaneProps) => {
  const formatTextForDisplay = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p 
        key={index} 
        className="mb-4 last:mb-0"
        style={{
          textIndent: '1.25cm',
          textAlign: 'justify',
          lineHeight: '1.5',
        }}
      >
        {paragraph.trim()}
      </p>
    ));
  };

  return (
    <div className="border rounded-lg bg-white">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-sm font-medium text-gray-700">
          Visualização - Formato Acadêmico
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Margem 2cm • Times New Roman 12pt • Espaçamento 1.5 • Justificado
        </p>
      </div>
      
      <ScrollArea className="h-96">
        <div 
          className="p-8 bg-white shadow-inner"
          style={{
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: '12pt',
            margin: '2cm',
            lineHeight: '1.5',
            textAlign: 'justify',
            minHeight: '400px',
          }}
        >
          {text ? formatTextForDisplay(text) : (
            <div className="text-gray-400 italic text-center py-8">
              Nenhum texto formatado para exibir
            </div>
          )}
          
          {/* Simulação de numeração de página */}
          {text && (
            <div className="mt-8 pt-4 border-t border-gray-200 text-center">
              <span className="text-xs text-gray-500">Página 1</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
