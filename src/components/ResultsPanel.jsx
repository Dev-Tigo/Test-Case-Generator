import ResultsTable from './ResultsTable.jsx';
import { exportToExcel } from '../utils/exportExcel.js';
import { exportToDoc } from '../utils/exportDoc.js';

export default function ResultsPanel({ testCases }) {
  return (
    <div className="panel">
      <div className="results-head">
        <div className="panel-title">3 · Casos de teste gerados</div>
        {testCases.length > 0 && (
          <span className="count-stamp">{testCases.length} casos gerados</span>
        )}
      </div>

      {testCases.length > 0 && (
        <div className="actions" style={{ marginBottom: 16 }}>
          <button className="btn-ghost" onClick={() => exportToExcel(testCases)}>
            Exportar Excel (.xlsx)
          </button>
          <button className="btn-ghost" onClick={() => exportToDoc(testCases)}>
            Exportar Relatório (Word)
          </button>
          <button className="btn-ghost" onClick={() => window.print()}>
            Exportar PDF (imprimir)
          </button>
        </div>
      )}

      <ResultsTable testCases={testCases} />
    </div>
  );
}
