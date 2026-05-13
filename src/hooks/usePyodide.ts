import { useEffect, useState } from "react"

export function usePyodide() {
  const [pyodide, setPyodide] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPyodide() {
      setLoading(true)
      const pyodideModule = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/"
      })
      setPyodide(pyodideModule)
      setLoading(false)
    }

    // Dynamically load Pyodide script
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
    script.onload = loadPyodide
    document.body.appendChild(script)
  }, [])

  return { pyodide, loading }
}
