type InputBoxProps = {
  value: string
  onChange: (val: string) => void
}

export default function InputBox({ value, onChange }: InputBoxProps) {
  return (
    <textarea
      className="input-box"
      rows={8}
      placeholder="Program input (one per line)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )

}
