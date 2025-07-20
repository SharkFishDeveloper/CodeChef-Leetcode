import * as monaco from "monaco-editor";

export default function handleEditorWillMount(monacoInstance: typeof monaco) {
  // Disable all validation globally
  monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true,
  });

  // Optional: disable all markers for any language
  monacoInstance.editor.onDidCreateModel((model) => {
    monacoInstance.editor.setModelMarkers(model, 'owner', []);
  });
}
