import { useState, useCallback } from 'react';
import { generateTestCases } from '../api/generateTestCases.js';

export const DEFAULT_SYSTEM_PROMPT = `Você é um analista de QA sênior, especialista em escrever casos de teste claros, objetivos e cobrindo cenários positivos, negativos e de borda.

Para o requisito que o usuário descrever, gere casos de teste completos.

Responda ESTRITAMENTE em JSON válido, sem nenhum texto fora do JSON, seguindo este formato exato:

{
  "casos_de_teste": [
    {
      "id": "TC-001",
      "titulo": "string curta e clara",
      "modulo": "string",
      "tipo": "Funcional | Regressão | Segurança | Usabilidade | Performance",
      "prioridade": "Alta | Média | Baixa",
      "pre_condicoes": "string",
      "passos": ["passo 1", "passo 2", "..."],
      "dados_teste": "string",
      "resultado_esperado": "string"
    }
  ]
}

Regras:
- IDs sequenciais no formato TC-001, TC-002, etc.
- Inclua cenários de sucesso, de erro/validação e casos de borda.
- Seja específico nos passos (ações concretas, não vagas).
- Escreva em português do Brasil.`;

export function useTestCaseGenerator() {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [provider, setProvider] = useState('gemini');
  const [model, setModel] = useState('gemini-3.6-flash');
  const [testCases, setTestCases] = useState([]);
  const [status, setStatus] = useState({ message: '', error: false, loading: false });

  const generate = useCallback(
    async (requirementText, quantity) => {
      if (!requirementText.trim()) {
        setStatus({ message: 'Descreva o requisito ou funcionalidade a testar.', error: true, loading: false });
        return;
      }

      setStatus({ message: 'Gerando casos de teste...', error: false, loading: true });

      const userPrompt = `Requisito/funcionalidade a testar:\n"""\n${requirementText}\n"""\n\nGere aproximadamente ${quantity} casos de teste cobrindo esse requisito.`;

      try {
        const casos = await generateTestCases({ provider, model, systemPrompt, userPrompt });
        setTestCases(casos);
        setStatus({ message: `${casos.length} casos de teste gerados com sucesso.`, error: false, loading: false });
      } catch (err) {
        setStatus({ message: 'Falha ao gerar: ' + err.message, error: true, loading: false });
      }
    },
    [provider, model, systemPrompt]
  );

  return {
    systemPrompt,
    setSystemPrompt,
    provider,
    setProvider,
    model,
    setModel,
    testCases,
    status,
    generate,
  };
}