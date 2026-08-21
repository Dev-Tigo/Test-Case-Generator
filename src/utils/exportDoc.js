import { dateStamp } from './dateStamp.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[m]));
}

export function exportToDoc(testCases) {
  if (!testCases.length) return;

  const rowsHtml = testCases.map((tc) => `
    <tr>
      <td>${escapeHtml(tc.id || '')}</td>
      <td>${escapeHtml(tc.titulo || '')}</td>
      <td>${escapeHtml(tc.modulo || '')}</td>
      <td>${escapeHtml(tc.tipo || '')}</td>
      <td>${escapeHtml(tc.prioridade || '')}</td>
      <td>${escapeHtml(tc.pre_condicoes || '')}</td>
      <td>${(tc.passos || []).map((p, i) => `${i + 1}. ${escapeHtml(p)}`).join('<br>')}</td>
      <td>${escapeHtml(tc.dados_teste || '')}</td>
      <td>${escapeHtml(tc.resultado_esperado || '')}</td>
    </tr>`).join('');

  const html = `
  <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
  <head><meta charset='utf-8'><title>Relatório de Casos de Teste</title>
  <style>
    body{font-family:Calibri, Arial, sans-serif; font-size:11pt; color:#17233D;}
    h1{font-size:20pt; margin-bottom:2pt;}
    .meta{color:#555; font-size:9.5pt; margin-bottom:18pt;}
    table{border-collapse:collapse; width:100%;}
    th,td{border:1px solid #999; padding:6px 8px; font-size:9.5pt; vertical-align:top; text-align:left;}
    th{background:#E7E9E0;}
  </style></head>
  <body>
    <h1>Relatório de Casos de Teste</h1>
    <p class="meta">Gerado em ${new Date().toLocaleString('pt-BR')} · ${testCases.length} casos de teste</p>
    <table>
      <tr><th>ID</th><th>Título</th><th>Módulo</th><th>Tipo</th><th>Prioridade</th><th>Pré-condições</th><th>Passos</th><th>Dados</th><th>Resultado Esperado</th></tr>
      ${rowsHtml}
    </table>
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
