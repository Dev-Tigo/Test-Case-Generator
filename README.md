# QA TestGen — Frontend (React + Vite)

Frontend do gerador de casos de teste. Este projeto **não guarda nenhuma chave de
API** — ele só chama `POST /api/gerar-casos` e espera que um backend (a ser
construído) processe a chamada para a IA e devolva os casos de teste.

## Estrutura

```
src/
├── main.jsx                       # entry point
├── App.jsx                        # componente raiz
├── index.css                      # design tokens e estilos globais
├── api/
│   └── generateTestCases.js       # cliente HTTP para o backend
├── hooks/
│   └── useTestCaseGenerator.js    # estado: prompt fixo, modelo, casos, status
├── components/
│   ├── Letterhead.jsx
│   ├── ConfigPanel.jsx            # modelo + prompt fixo (editável)
│   ├── RequirementForm.jsx        # input do requisito + botão gerar
│   ├── StatusMessage.jsx
│   ├── ResultsPanel.jsx           # botões de exportação + tabela
│   └── ResultsTable.jsx
└── utils/
    ├── exportExcel.js             # exporta .xlsx (biblioteca xlsx)
    ├── exportDoc.js                # exporta .doc (relatório Word)
    └── dateStamp.js
```

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Sem um backend rodando, o botão "Gerar casos de
teste" vai mostrar erro de conexão — isso é esperado até você montar o backend.

## Contrato que o backend precisa seguir

```
POST /api/gerar-casos
Content-Type: application/json

Body enviado pelo frontend:
{
  "model": "gemini-2.5-flash",
  "systemPrompt": "...",   // prompt fixo (instrução da IA)
  "userPrompt": "..."      // requisito do usuário + quantidade pedida
}

Resposta esperada (200):
{
  "casos_de_teste": [
    {
      "id": "TC-001",
      "titulo": "...",
      "modulo": "...",
      "tipo": "Funcional",
      "prioridade": "Alta",
      "pre_condicoes": "...",
      "passos": ["...", "..."],
      "dados_teste": "...",
      "resultado_esperado": "..."
    }
  ]
}

Resposta de erro (4xx/5xx):
{ "error": "mensagem legível para mostrar ao usuário" }
```

O backend é quem deve guardar a chave da IA (variável de ambiente, nunca no
frontend) e fazer a chamada real para o provedor (Gemini, Groq, etc.).

## Apontando para o backend

Por padrão o frontend chama `/api/gerar-casos` (caminho relativo). Duas formas
de conectar ao backend quando ele existir:

**Opção A — proxy do Vite (já configurado em `vite.config.js`)**
Se o backend rodar em `http://localhost:8787`, o Vite já redireciona `/api/*`
para lá automaticamente durante `npm run dev`. Só ajustar a porta se for
diferente.

**Opção B — variável de ambiente**
Crie um arquivo `.env` com:
```
VITE_API_URL=http://localhost:8787
```
e o frontend vai chamar essa URL diretamente (útil se o backend estiver em outro
domínio/porta, especialmente em produção).

## Próximo passo

Quando você montar o backend, ele só precisa implementar essa única rota. Posso
ajudar a construir esse backend (Node/Express, por exemplo) quando você estiver
pronto — é só chamar.
