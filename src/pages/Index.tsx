
import { useState } from 'react';
import { TextFormatter } from '@/components/TextFormatter';
import { ScienceBookPreview } from '@/components/ScienceBookPreview';
import { FileText, Download, Copy, Eye, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('pink');

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const themes = [
    { name: 'pink', color: 'bg-pink-500', label: 'Rosa' },
    { name: 'yellow', color: 'bg-yellow-400', label: 'Amarelo' },
    { name: 'blue', color: 'bg-blue-600', label: 'Azul' },
    { name: 'green', color: 'bg-green-500', label: 'Verde' },
    { name: 'orange', color: 'bg-orange-500', label: 'Laranja' },
    { name: 'purple', color: 'bg-purple-500', label: 'Roxo' }
  ];

  const handleFormatText = () => {
    if (!inputText.trim()) return;
    
    setFormattedText(inputText.trim());
    setShowPreview(true);
  };

  const handleCopyText = async () => {
    if (!formattedText) return;
    try {
      await navigator.clipboard.writeText(formattedText);
    } catch (err) {
      console.error('Erro ao copiar texto:', err);
    }
  };

  const handleDownload = (format: 'doc' | 'pdf') => {
    if (!formattedText) return;
    
    if (format === 'doc') {
      const blob = new Blob([formattedText], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'grande_ideia.doc';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                  Grandes Ideias de Todos os Tempos
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Editor de Layout Estilo "O Livro da Ciência"
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Temas:</span>
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`w-8 h-8 rounded-full ${theme.color} shadow-md border-2 transition-all ${
                    selectedTheme === theme.name ? 'border-gray-800 scale-110' : 'border-white hover:scale-105'
                  }`}
                  title={theme.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Painel de Entrada */}
          <div>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <div className={`bg-${selectedTheme}-500 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-wide">
                      Texto da Grande Ideia
                    </h2>
                    <p className="text-lg opacity-90 font-medium">
                      Digite o conteúdo da sua ideia
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm font-bold">
                      {wordCount} palavras
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm font-bold">
                      {charCount} chars
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <TextFormatter
                  value={inputText}
                  onChange={setInputText}
                  onFormat={handleFormatText}
                />
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={handleFormatText}
                    disabled={!inputText.trim()}
                    className={`bg-${selectedTheme}-500 hover:bg-${selectedTheme}-600 text-white font-bold px-6 py-3 text-lg shadow-lg`}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Criar Grande Ideia
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                    disabled={!formattedText}
                    className="border-2 font-bold px-6 py-3"
                  >
                    <Eye className="h-5 w-5 mr-2" />
                    {showPreview ? 'Ocultar' : 'Visualizar'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Painel de Preview */}
          <div>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <div className={`bg-${selectedTheme}-500 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-wide">
                      Preview da Grande Ideia
                    </h2>
                    <p className="text-lg opacity-90 font-medium">
                      Layout estilo "O Livro da Ciência"
                    </p>
                  </div>
                  {formattedText && (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCopyText}
                        className="bg-white/20 text-white border-0 hover:bg-white/30 font-bold"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleDownload('doc')}
                        className="bg-white/20 text-white border-0 hover:bg-white/30 font-bold"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        .DOC
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                {showPreview && formattedText ? (
                  <ScienceBookPreview text={formattedText} theme={selectedTheme} />
                ) : (
                  <div className="h-96 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p className="text-xl font-bold text-gray-400">Preview da Grande Ideia</p>
                      <p className="text-sm text-gray-400">Digite seu texto e clique em "Criar Grande Ideia"</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
