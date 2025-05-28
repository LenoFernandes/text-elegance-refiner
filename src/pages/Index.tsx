
import { useState } from 'react';
import { TextFormatter } from '@/components/TextFormatter';
import { MagazinePreview } from '@/components/MagazinePreview';
import { FileText, Download, Copy, Eye, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('orange');

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const themes = [
    { name: 'orange', color: 'bg-orange-500', label: 'Laranja' },
    { name: 'green', color: 'bg-green-500', label: 'Verde' },
    { name: 'yellow', color: 'bg-yellow-500', label: 'Amarelo' },
    { name: 'pink', color: 'bg-pink-500', label: 'Rosa' },
    { name: 'blue', color: 'bg-blue-500', label: 'Azul' },
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
      a.download = 'revista_formatada.doc';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Moderno */}
      <div className="bg-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                  Editor de Revista
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  Crie layouts profissionais estilo magazine
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
          {/* Painel de Entrada - Estilo Revista */}
          <div>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <div className={`bg-${selectedTheme}-500 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-wide">
                      Texto Original
                    </h2>
                    <p className="text-lg opacity-90 font-medium">
                      Digite seu conteúdo aqui
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
                    Criar Layout
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

          {/* Painel de Preview - Estilo Revista */}
          <div>
            <Card className="bg-white shadow-xl border-0 overflow-hidden">
              <div className={`bg-${selectedTheme}-500 p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-wide">
                      Preview Magazine
                    </h2>
                    <p className="text-lg opacity-90 font-medium">
                      Layout estilo revista
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
                  <MagazinePreview text={formattedText} theme={selectedTheme} />
                ) : (
                  <div className="h-96 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p className="text-xl font-bold text-gray-400">Preview da Revista</p>
                      <p className="text-sm text-gray-400">Digite seu texto e clique em "Criar Layout"</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Características do Layout */}
        <Card className="mt-8 bg-white shadow-xl border-0 overflow-hidden">
          <div className={`bg-gradient-to-r from-${selectedTheme}-500 to-${selectedTheme}-600 p-6 text-white`}>
            <h3 className="text-2xl font-black uppercase tracking-wide mb-2">
              Características do Layout Magazine
            </h3>
            <p className="text-lg opacity-90">
              Design moderno inspirado em revistas profissionais
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-black text-orange-800 text-lg">Layout Colorido</h4>
                <p className="text-sm text-orange-600 font-medium">Seções com cores vibrantes e contrastantes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-black text-green-800 text-lg">Tipografia Bold</h4>
                <p className="text-sm text-green-600 font-medium">Títulos grandes e impactantes</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-black text-blue-800 text-lg">Grid Moderno</h4>
                <p className="text-sm text-blue-600 font-medium">Organização visual profissional</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-black text-purple-800 text-lg">Elementos Visuais</h4>
                <p className="text-sm text-purple-600 font-medium">Ícones e seções destacadas</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                <h4 className="font-black text-pink-800 text-lg">Responsivo</h4>
                <p className="text-sm text-pink-600 font-medium">Adaptável a diferentes telas</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-black text-yellow-800 text-lg">Temas Customizáveis</h4>
                <p className="text-sm text-yellow-600 font-medium">6 paletas de cores diferentes</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
