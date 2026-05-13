type Props = {
  output: string
}

export function OutputPanel({ output }: Props) {
  return (
    <div className="bg-black text-green-400 font-mono p-3 rounded h-40 overflow-y-auto">
      <pre>{output || "▶ Run your code to see output"}</pre>
    </div>
  )
}
