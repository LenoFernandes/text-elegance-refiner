
import { useState } from 'react';
import { TextFormatter } from '@/components/TextFormatter';
import { PreviewPane } from '@/components/PreviewPane';
import { FileText, Download, Copy, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  const handleFormatText = () => {
    if (!inputText.trim()) return;
    
    // Aplicar formatação básica mantendo parágrafos
    const paragraphs = inputText.split('\n\n').filter(p => p.trim());
    const formatted = paragraphs.map(paragraph => {
      const trimmed = paragraph.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      return `    ${trimmed}`; // Recuo de primeira linha
    }).join('\n\n');
    
    setFormattedText(formatted);
    setShowPreview(true);
  };

  const handleCopyText = async () => {
    if (!formattedText) return;
    try {
      await navigator.clipboard.writeText(formattedText);
      // Aqui você poderia adicionar um toast de sucesso
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
      a.download = 'documento_formatado.doc';
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // Para implementação completa do PDF, seria necessário usar uma biblioteca como jsPDF
      console.log('Download PDF - implementação futura');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Formatador de Texto Acadêmico
              </h1>
              <p className="text-sm text-gray-600">
                Formate seu texto seguindo padrões acadêmicos profissionais
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Painel de Entrada */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Texto Original
                </h2>
                <div className="flex gap-2">
                  <Badge variant="outline">{wordCount} palavras</Badge>
                  <Badge variant="outline">{charCount} caracteres</Badge>
                </div>
              </div>
              
              <TextFormatter
                value={inputText}
                onChange={setInputText}
                onFormat={handleFormatText}
              />
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleFormatText}
                  disabled={!inputText.trim()}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Formatar Texto
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={!formattedText}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? 'Ocultar' : 'Visualizar'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Painel de Resultado */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Texto Formatado
                </h2>
                {formattedText && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyText}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload('doc')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      .DOC
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              {showPreview && formattedText ? (
                <PreviewPane text={formattedText} />
              ) : (
                <div className="h-96 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>O texto formatado aparecerá aqui</p>
                    <p className="text-sm">Digite seu texto e clique em "Formatar Texto"</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Especificações de Formatação */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Especificações de Formatação Aplicadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="bg-orange-100 p-3 rounded-lg">
                <h4 className="font-medium text-orange-800">Margem</h4>
                <p className="text-sm text-orange-600">2cm em todos os lados</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <h4 className="font-medium text-green-800">Fonte</h4>
                <p className="text-sm text-green-600">Times New Roman, 12pt</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <h4 className="font-medium text-blue-800">Espaçamento</h4>
                <p className="text-sm text-blue-600">Entre linhas: 1.5</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <h4 className="font-medium text-purple-800">Alinhamento</h4>
                <p className="text-sm text-purple-600">Texto justificado</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-pink-100 p-3 rounded-lg">
                <h4 className="font-medium text-pink-800">Recuo</h4>
                <p className="text-sm text-pink-600">Primeira linha: 1.25cm</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <h4 className="font-medium text-yellow-800">Páginas</h4>
                <p className="text-sm text-yellow-600">Numeração automática</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
