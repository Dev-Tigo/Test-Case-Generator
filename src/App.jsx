import Letterhead from './components/Letterhead.jsx';
import ConfigPanel from './components/ConfigPanel.jsx';
import RequirementForm from './components/RequirementForm.jsx';
import ResultsPanel from './components/ResultsPanel.jsx';
import { useTestCaseGenerator } from './hooks/useTestCaseGenerator.js';

export default function App() {
  const {
    systemPrompt,
    setSystemPrompt,
    model,
    setModel,
    testCases,
    status,
    generate,
  } = useTestCaseGenerator();

  return (
    <div className="sheet">
      <Letterhead />
      <ConfigPanel
        model={model}
        setModel={setModel}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
      />
      <RequirementForm onGenerate={generate} status={status} />
      <ResultsPanel testCases={testCases} />
      <footer>frontend em react · a chave da ia fica só no backend</footer>
    </div>
  );
}
