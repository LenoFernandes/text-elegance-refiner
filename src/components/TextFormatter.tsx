
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface TextFormatterProps {
  value: string;
  onChange: (value: string) => void;
  onFormat: () => void;
}

export const TextFormatter = ({ value, onChange, onFormat }: TextFormatterProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      onFormat();
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="input-text" className="text-base font-bold text-gray-800">
        Digite o conteúdo da sua Grande Ideia (Ctrl+Enter para gerar layout)
      </Label>
      <Textarea
        id="input-text"
        placeholder="Digite aqui o conteúdo da sua Grande Ideia...

O primeiro parágrafo será usado como título principal.

Exemplo:
A Teoria da Relatividade

Einstein revolucionou a física ao mostrar que tempo e espaço são relativos. Esta descoberta mudou nossa compreensão fundamental do universo.

A velocidade da luz é constante para todos os observadores, levando a consequências profundas sobre a natureza da realidade."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-80 resize-none text-sm border-2 focus:border-pink-500 focus:ring-pink-500"
        style={{ fontFamily: 'Georgia, serif' }}
      />
      <div className="text-xs text-gray-500 mt-2">
        💡 <strong>Dica:</strong> Use parágrafos separados para diferentes seções do conteúdo. 
        O layout seguirá o estilo visual do "Livro da Ciência" da coleção "Grandes Ideias de Todos os Tempos".
      </div>
    </div>
  );
};
