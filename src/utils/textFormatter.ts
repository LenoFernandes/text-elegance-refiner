
export interface FormattingOptions {
  margin: string;
  fontSize: string;
  fontFamily: string;
  lineHeight: number;
  textAlign: string;
  textIndent: string;
}

export const defaultFormattingOptions: FormattingOptions = {
  margin: '2cm',
  fontSize: '12pt',
  fontFamily: 'Times New Roman, Times, serif',
  lineHeight: 1.5,
  textAlign: 'justify',
  textIndent: '1.25cm',
};

export const formatText = (text: string, options: FormattingOptions = defaultFormattingOptions): string => {
  if (!text.trim()) return '';
  
  // Dividir o texto em parágrafos
  const paragraphs = text.split('\n\n').filter(p => p.trim());
  
  // Aplicar formatação a cada parágrafo
  const formattedParagraphs = paragraphs.map(paragraph => {
    // Limpar espaços extras e quebras de linha desnecessárias
    const cleanParagraph = paragraph.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
    
    // Adicionar recuo na primeira linha
    return `    ${cleanParagraph}`;
  });
  
  return formattedParagraphs.join('\n\n');
};

export const getWordCount = (text: string): number => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

export const getCharacterCount = (text: string): number => {
  return text.length;
};

export const exportToDoc = (text: string, filename: string = 'documento_formatado'): void => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${filename}</title>
        <style>
            body {
                font-family: "Times New Roman", Times, serif;
                font-size: 12pt;
                line-height: 1.5;
                margin: 2cm;
                text-align: justify;
            }
            p {
                text-indent: 1.25cm;
                margin-bottom: 0.5em;
            }
        </style>
    </head>
    <body>
        ${text.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
