# QA TestGen

Aplicação frontend em React + Vite para gerar casos de teste a partir de um requisito ou funcionalidade informada pelo usuário. O fluxo atual é:

- o usuário define o provedor e o modelo de IA;
- edita o prompt base do QA;
- descreve o requisito funcional;
- o frontend envia os dados para o backend;
- o backend retorna os casos de teste em JSON;
- o usuário pode visualizar, exportar para Excel e Word ou imprimir em PDF.

Este projeto não guarda chaves de IA no frontend. A lógica de autenticação e acesso ao modelo fica no backend.

## Funcionalidades

- seleção de provedor: Gemini ou Groq;
- seleção de modelo por provedor;
- edição do prompt fixo que orienta a geração;
- entrada do requisito funcional em texto livre;
- quantidade aproximada de casos de teste a gerar;
- renderização dos casos em tabela;
- exportação para Excel (.xlsx);
- exportação para relatório Word (.doc);
- impressão em PDF via navegador;
- tratamento de erros e status de carregamento.

## Stack

- React 18
- Vite 5
- xlsx
- CSS puro

## Estrutura do projeto

```bash
.
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── api/
│   │   └── generateTestCases.js
│   ├── components/
│   │   ├── ConfigPanel.jsx
│   │   ├── Letterhead.jsx
│   │   ├── RequirementForm.jsx
│   │   ├── ResultsPanel.jsx
│   │   ├── ResultsTable.jsx
│   │   └── StatusMessage.jsx
│   ├── hooks/
│   │   └── useTestCaseGenerator.js
│   └── utils/
│       ├── dateStamp.js
│       ├── exportDoc.js
│       └── exportExcel.js
└── public/
```

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie a aplicação:

```bash
npm run dev
```

3. Acesse no navegador:

```bash
http://localhost:5173
```

> O frontend depende de um backend com a rota de geração implementada para funcionar corretamente.

## Configuração da API

O cliente do frontend envia a requisição para:

```http
POST /api/generate-test-cases
```

O endereço base pode ser definido via variável de ambiente do Vite:

```env
VITE_API_URL=http://localhost:8787
```

Se a variável não for definida, o app usa a URL relativa do mesmo host.

## Contrato da API esperado pelo frontend

### Requisição

```json
{
  "provider": "gemini",
  "model": "gemini-3.6-flash",
  "systemPrompt": "Você é um analista de QA sênior...",
  "userPrompt": "Requisito/funcionalidade a testar:\n...\n\nGere aproximadamente 10 casos de teste..."
}
```

### Resposta bem-sucedida

```json
{
  "casos_de_teste": [
    {
      "id": "TC-001",
      "titulo": "Validar login com credenciais corretas",
      "modulo": "Autenticação",
      "tipo": "Funcional",
      "prioridade": "Alta",
      "pre_condicoes": "Usuário cadastrado e página de login acessível.",
      "passos": [
        "Acessar a página de login",
        "Informar e-mail e senha válidos",
        "Clicar em Entrar"
      ],
      "dados_teste": "E-mail: usuario@teste.com | Senha: Senha@123",
      "resultado_esperado": "O usuário é autenticado e redirecionado para a área inicial."
    }
  ]
}
```

### Resposta de erro

```json
{
  "error": "Mensagem legível para o usuário"
}
```

## Observações importantes

- O frontend não chama a IA diretamente.
- A autenticação da API da IA deve ocorrer no backend.
- O prompt fixo é enviado em toda geração e pode ser editado na interface.
- A estrutura de casos esperada inclui os campos: id, titulo, modulo, tipo, prioridade, pre_condicoes, passos, dados_teste e resultado_esperado.

## Scripts disponíveis

```bash
npm run dev       # inicia o ambiente de desenvolvimento
dnpm run build    # gera build de produção
npm run preview   # visualiza a build localmente
```

## Fluxo principal da aplicação

```text
Usuário → descreve requisito
   ↓
Frontend envia provider/model/prompt/requisito
   ↓
Backend chama provedor de IA
   ↓
Retorna casos de teste em JSON
   ↓
Frontend exibe e exporta resultados
```

## Próximo passo recomendado

Implementar o backend responsável por receber a requisição em /api/generate-test-cases, chamar o provedor escolhido (Gemini, Groq ou outro) e devolver o JSON no formato esperado pelo frontend.
