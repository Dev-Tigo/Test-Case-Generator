function prioClass(p) {
  const v = (p || '').toLowerCase();
  if (v.startsWith('alta')) return 'prio-alta';
  if (v.startsWith('m')) return 'prio-media';
  return 'prio-baixa';
}

export default function ResultsTable({ testCases, onUpdateTestCase }) {
  if (!testCases.length) {
    return (
      <div className="empty">
        Nenhum caso de teste gerado ainda. Preencha o requisito acima e clique em
        &quot;Gerar casos de teste&quot;.
      </div>
    );
  }

  const handleStepsChange = (index, rawText) => {
    const passos = rawText.split('\n').filter((linha) => linha.trim() !== '');
    onUpdateTestCase(index, 'passos', passos);
  };

  return (
    <div className="table-wrap">
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
                <input
                  type="text"
                  value={tc.titulo || ''}
                  onChange={(e) => onUpdateTestCase(idx, 'titulo', e.target.value)}
                />
                <br />
                <span style={{ color: 'var(--ink-soft)', fontSize: 11.5 }}>{tc.modulo}</span>
              </td>
              <td>{tc.tipo}</td>
              <td>
                <select
                  className={`prio-select ${prioClass(tc.prioridade)}`}
                  value={tc.prioridade || ''}
                  onChange={(e) => onUpdateTestCase(idx, 'prioridade', e.target.value)}
                >
                  <option value="Alta">Alta</option>
                  <option value="Média">Média</option>
                  <option value="Baixa">Baixa</option>
                </select>
              </td>
              <td>
                <textarea
                  rows={3}
                  value={tc.pre_condicoes || ''}
                  onChange={(e) => onUpdateTestCase(idx, 'pre_condicoes', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  rows={4}
                  value={(tc.passos || []).join('\n')}
                  onChange={(e) => handleStepsChange(idx, e.target.value)}
                  placeholder="Um passo por linha"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={tc.dados_teste || ''}
                  onChange={(e) => onUpdateTestCase(idx, 'dados_teste', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  rows={3}
                  value={tc.resultado_esperado || ''}
                  onChange={(e) => onUpdateTestCase(idx, 'resultado_esperado', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}