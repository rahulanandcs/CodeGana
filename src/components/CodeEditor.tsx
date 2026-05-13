import Editor from "@monaco-editor/react"

type CodeEditorProps = {
  value: string
  onChange: (val: string) => void
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <Editor
      height="300px"
      language="python"
      theme="vs-dark"
      value={value}
      onChange={(v) => onChange(v || "")}
      options={{
        fontSize: 18,          // 🔥 Bigger text
        lineHeight: 28,        // ✨ Taller lines
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        padding: { top: 12, bottom: 12 },
        cursorSmoothCaretAnimation: "on",
        smoothScrolling: true,
      }}
    />
  )
}