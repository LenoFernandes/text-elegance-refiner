
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
    <div className="space-y-2">
      <Label htmlFor="input-text" className="text-sm font-medium">
        Cole ou digite seu texto aqui (Ctrl+Enter para formatar)
      </Label>
      <Textarea
        id="input-text"
        placeholder="Cole seu texto aqui para formatação acadêmica..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-96 resize-none font-mono text-sm"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", monospace' }}
      />
    </div>
  );
};
