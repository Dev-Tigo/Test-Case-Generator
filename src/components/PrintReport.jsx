export default function PrintReport({ testCases }) {
  if (!testCases.length) return null;

  return (
    <div className="print-only print-report">
      <h1>Relatório de Casos de Teste</h1>
      <p className="print-meta">
        Gerado em {new Date().toLocaleString('pt-BR')} · {testCases.length} casos de teste
      </p>
      {testCases.map((tc, idx) => (
        <div className="print-case" key={tc.id || idx}>
          <h2>{tc.id} — {tc.titulo}</h2>
          <p className="print-case-meta">
            <strong>Módulo:</strong> {tc.modulo || '—'} &nbsp;|&nbsp;
            <strong>Tipo:</strong> {tc.tipo || '—'} &nbsp;|&nbsp;
            <strong>Prioridade:</strong> {tc.prioridade || '—'}
          </p>
          <p><strong>Pré-condições:</strong><br />{tc.pre_condicoes || '—'}</p>
          <p><strong>Passos:</strong></p>
          <ol>
            {(tc.passos || []).map((p, i) => <li key={i}>{p}</li>)}
          </ol>
          <p><strong>Dados de Teste:</strong><br />{tc.dados_teste || '—'}</p>
          <p><strong>Resultado Esperado:</strong><br />{tc.resultado_esperado || '—'}</p>
        </div>
      ))}
    </div>
  );
}