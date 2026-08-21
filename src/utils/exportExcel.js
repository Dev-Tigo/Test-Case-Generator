import * as XLSX from 'xlsx';
import { dateStamp } from './dateStamp.js';

export function exportToExcel(testCases) {
  if (!testCases.length) return;

  const rows = testCases.map((tc) => ({
    ID: tc.id || '',
    Título: tc.titulo || '',
    Módulo: tc.modulo || '',
    Tipo: tc.tipo || '',
    Prioridade: tc.prioridade || '',
    'Pré-condições': tc.pre_condicoes || '',
    Passos: (tc.passos || []).map((p, i) => `${i + 1}. ${p}`).join('\n'),
    'Dados de Teste': tc.dados_teste || '',
    'Resultado Esperado': tc.resultado_esperado || '',
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [
    { wch: 8 }, { wch: 28 }, { wch: 16 }, { wch: 14 }, { wch: 10 },
    { wch: 26 }, { wch: 40 }, { wch: 24 }, { wch: 30 },
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Casos de Teste');
  XLSX.writeFile(wb, `casos-de-teste-${dateStamp()}.xlsx`);
}
