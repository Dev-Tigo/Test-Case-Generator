export default function ConfigPanel({ model, setModel, systemPrompt, setSystemPrompt }) {
  return (
    <div className="panel panel-config">
      <div className="panel-head">
        <div className="panel-title">1 · Configuração da IA</div>
        <span className="tag">backend cuida da chave</span>
      </div>

      <div className="row">
        <div className="field" style={{ maxWidth: 240 }}>
          <label htmlFor="model">Modelo</label>
          <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="gemini-3.6-flash">gemini-3.6-flash</option>
            <option value="gemini-3.7-flash">gemini-3.7-flash</option>
          </select>
          <div className="hint">
            O nome do modelo é só repassado ao backend — troque aqui se seu backend
            suportar outro provedor/modelo.
          </div>
        </div>
      </div>

      <details>
        <summary>Prompt fixo (instrução da IA) — editar</summary>
        <div className="field" style={{ marginTop: 12 }}>
          <textarea
            className="mono"
            rows={10}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
          />
          <div className="hint">
            Esse é o prompt fixo enviado ao backend em toda geração — edite se quiser
            mudar o padrão, os campos ou o estilo de escrita dos casos de teste.
          </div>
        </div>
      </details>
    </div>
  );
}
