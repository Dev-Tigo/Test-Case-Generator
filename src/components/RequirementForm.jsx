import { useState } from 'react';
import StatusMessage from './StatusMessage.jsx';

export default function RequirementForm({ onGenerate, status }) {
  const [reqText, setReqText] = useState('');
  const [qty, setQty] = useState('10');

  const handleSubmit = () => onGenerate(reqText, qty);

  return (
    <div className="panel panel-input">
      <div className="panel-head">
        <div className="panel-title">2 · Requisito / Funcionalidade</div>
      </div>

      <div className="field">
        <label htmlFor="reqInput">Descreva o que precisa ser testado</label>
        <textarea
          id="reqInput"
          rows={6}
          value={reqText}
          onChange={(e) => setReqText(e.target.value)}
          placeholder="Ex: Tela de login com e-mail e senha. Deve validar formato de e-mail, bloquear após 5 tentativas erradas, permitir 'esqueci minha senha' e manter sessão por 7 dias se 'lembrar de mim' estiver marcado."
        />
      </div>

      <div className="selector-row">
        <div className="field quantity-field">
          <label htmlFor="qty">Quantidade aproximada</label>
          <select id="qty" value={qty} onChange={(e) => setQty(e.target.value)}>
            <option value="6">6 casos</option>
            <option value="10">10 casos</option>
            <option value="15">15 casos</option>
            <option value="20">20 casos</option>
          </select>
        </div>

        <div className="field actions-field">
          <div className="actions">
            <button className="btn-primary" onClick={handleSubmit} disabled={status.loading}>
              Gerar casos de teste
            </button>
            {!status.error && status.message && <StatusMessage status={status} />}
          </div>
        </div>
      </div>

      {status.error && <div className="actions-error-wrap"><StatusMessage status={status} /></div>}
    </div>
  );
}
