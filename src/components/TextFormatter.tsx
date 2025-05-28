
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
        Digite ou cole seu texto aqui (Ctrl+Enter para criar layout)
      </Label>
      <Textarea
        id="input-text"
        placeholder="Cole ou digite seu texto aqui para criar um layout estilo magazine...

Dica: O primeiro parágrafo será usado como título principal da matéria."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-80 resize-none text-sm border-2 focus:border-orange-500 focus:ring-orange-500"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace' }}
      />
    </div>
  );
};
