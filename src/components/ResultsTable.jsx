function prioClass(p) {
  const v = (p || '').toLowerCase();
  if (v.startsWith('alta')) return 'prio-alta';
  if (v.startsWith('m')) return 'prio-media';
  return 'prio-baixa';
}

export default function ResultsTable({ testCases }) {
  if (!testCases.length) {
    return (
      <div className="empty">
        Nenhum caso de teste gerado ainda. Preencha o requisito acima e clique em
        &quot;Gerar casos de teste&quot;.
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Tipo</th>
          <th>Prioridade</th>
          <th>Pré-condições</th>
          <th>Passos</th>
          <th>Dados</th>
          <th>Resultado esperado</th>
        </tr>
      </thead>
      <tbody>
        {testCases.map((tc, idx) => (
          <tr key={tc.id || idx}>
            <td className="id-cell">{tc.id}</td>
            <td>
              <strong>{tc.titulo}</strong>
              <br />
              <span style={{ color: 'var(--ink-soft)', fontSize: 11.5 }}>{tc.modulo}</span>
            </td>
            <td>{tc.tipo}</td>
            <td><span className={`prio ${prioClass(tc.prioridade)}`}>{tc.prioridade}</span></td>
            <td>{tc.pre_condicoes}</td>
            <td>
              <ol className="steps-list">
                {(tc.passos || []).map((p, i) => <li key={i}>{p}</li>)}
              </ol>
            </td>
            <td>{tc.dados_teste}</td>
            <td>{tc.resultado_esperado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
