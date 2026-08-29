export default function ConfigPanel({ provider, setProvider, model, setModel, systemPrompt, setSystemPrompt }) {
  const modelOptions = {
    gemini: ['gemini-3.6-flash', 'gemini-3.7-flash'],
    groq: ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.6-27b'],
  };

  const handleProviderChange = (e) => {
    const newProvider = e.target.value;
    setProvider(newProvider);
    setModel(modelOptions[newProvider][0]);
  };

  return (
    <div className="panel panel-config">
      <div className="panel-head">
        <div className="panel-title">1 · Configuração da IA</div>
        <span className="tag">backend cuida da chave</span>
      </div>

      <div className="row">
        <div className="field" style={{ maxWidth: 180 }}>
          <label htmlFor="provider">Provedor</label>
          <select id="provider" value={provider} onChange={handleProviderChange}>
            <option value="gemini">Gemini</option>
            <option value="groq">Groq</option>
          </select>
        </div>

        <div className="field" style={{ maxWidth: 240 }}>
          <label htmlFor="model">Modelo</label>
          <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
            {modelOptions[provider].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
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