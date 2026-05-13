export async function runPython(pyodide: any, code: string, input: string) {
  if (!pyodide) return "Python engine not loaded"

  try {
    // Setup stdout & simulate input
    await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()

input_lines = """${input.replace(/\n/g, "\\n")}""".split("\\n")
input_iter = iter(input_lines)
input = lambda: next(input_iter)
`)

    // Run user code
    await pyodide.runPythonAsync(code)

    // Get stdout
    const stdout = pyodide.runPython("sys.stdout.getvalue()")
    return stdout
  } catch (err: any) {
    if (err.name === "PythonError" && err.message) {
      // Split traceback into lines
      const lines = err.message
      .split("\n")
      .map((l: string) => l.trim())
      .filter(Boolean)


      // Find the last line that contains the actual Python error
      let lastLine = "PythonError: Unknown error"
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].includes(":")) {
          lastLine = lines[i]
          break
        }
      }

      return `❌ ${lastLine}`
    }

    // fallback
    return `❌ ${err.name}: ${err.message}`
  }
}
