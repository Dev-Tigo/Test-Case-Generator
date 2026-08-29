// Chama o backend, que deve expor POST /api/gerar-casos e guardar a chave
// da IA (ex: Gemini) do lado do servidor — nunca no frontend.
//
// Contrato esperado do backend:
//   POST /api/gerar-casos
//   body: { model, systemPrompt, userPrompt }
//   resposta 200: { casos_de_teste: [ {...}, {...} ] }
//   resposta erro: { error: "mensagem legível" }

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function generateTestCases({ model, systemPrompt, userPrompt }) {
  let res;
  try {
    res = await fetch(`${API_BASE}/api/generate-test-cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, systemPrompt, userPrompt }),
    });
  } catch (networkErr) {
    throw new Error(
      'Não foi possível contatar o backend. Confirme que ele está rodando e que VITE_API_URL (se usado) aponta para o endereço certo.'
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Erro ${res.status} ao gerar os casos de teste.`);
  }

  const casos = data.casos_de_teste || data.test_cases;
  if (!Array.isArray(casos) || !casos.length) {
    throw new Error('O backend respondeu, mas sem casos de teste válidos.');
  }
  return casos;
}
