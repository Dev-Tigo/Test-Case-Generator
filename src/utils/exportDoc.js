import { dateStamp } from './dateStamp.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));
}

export function exportToDoc(testCases) {
  if (!testCases.length) return;

  const blocksHtml = testCases.map((tc) => `
    <div class="case-block">
      <h2>${escapeHtml(tc.id || '')} — ${escapeHtml(tc.titulo || '')}</h2>
      <p class="case-meta">
        <strong>Módulo:</strong> ${escapeHtml(tc.modulo || '—')} &nbsp;|&nbsp;
        <strong>Tipo:</strong> ${escapeHtml(tc.tipo || '—')} &nbsp;|&nbsp;
        <strong>Prioridade:</strong> ${escapeHtml(tc.prioridade || '—')}
      </p>
      <p><strong>Pré-condições:</strong><br>${escapeHtml(tc.pre_condicoes || '—')}</p>
      <p><strong>Passos:</strong></p>
      <ol>
        ${(tc.passos || []).map((p) => `<li>${escapeHtml(p)}</li>`).join('')}
      </ol>
      <p><strong>Dados de Teste:</strong><br>${escapeHtml(tc.dados_teste || '—')}</p>
      <p><strong>Resultado Esperado:</strong><br>${escapeHtml(tc.resultado_esperado || '—')}</p>
    </div>
    <hr class="case-divider">`).join('');

  const html = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head><meta charset='utf-8'><title>Relatório de Casos de Teste</title>
  <style>
    body{font-family:Calibri, Arial, sans-serif; font-size:11pt; color:#17233D;}
    h1{font-size:20pt; margin-bottom:2pt;}
    h2{font-size:14pt; color:#C23B22; margin:22pt 0 4pt;}
    .meta{color:#555; font-size:9.5pt; margin-bottom:18pt;}
    .case-meta{font-size:9.5pt; color:#3C4A66; margin:2pt 0 10pt;}
    ol{margin:4pt 0 10pt; padding-left:20pt;}
    p{margin:4pt 0;}
    .case-divider{border:none; border-top:1px dashed #C7CBBE; margin:18pt 0;}
  </style></head>
  <body>
    <h1>Relatório de Casos de Teste</h1>
    <p class="meta">Gerado em ${new Date().toLocaleString('pt-BR')} · ${testCases.length} casos de teste</p>
    ${blocksHtml}
  </body></html>`;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `relatorio-casos-de-teste-${dateStamp()}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}