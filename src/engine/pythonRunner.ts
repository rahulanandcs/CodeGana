// export async function runPython(pyodide: any, code: string, input: string): Promise<string> {
//   if (!pyodide) return "Python engine not loaded"

//   const safeInput = input ?? ""

//   try {
//     // Setup stdout & simulate input
//     pyodide.globals.set("__user_input__", safeInput)
//     await pyodide.runPythonAsync(`
// import sys
// from io import StringIO
// import builtins

// sys.stdout = StringIO()
// sys.stderr = StringIO()

// _input_lines = """${safeInput.replace(/\n/g, "\\n")}""".split("\\n")
// _input_iter = iter(_input_lines)

// def _custom_input(prompt=""):
//     try:
//         return next(_input_iter)
//     except StopIteration:
//         raise EOFError("EOF when reading a line")

// builtins.input = _custom_input
// `)

//     // Run user code
//     await pyodide.runPythonAsync(code)

//     // Get stdout
//     const stdout = pyodide.runPython("sys.stdout.getvalue()")
//     return stdout
//   } catch (err: any) {
//     if (err.name === "PythonError" && err.message) {
//       // Split traceback into lines
//       const lines = err.message
//       .split("\n")
//       .map((l: string) => l.trim())
//       .filter(Boolean)


//       // Find the last line that contains the actual Python error
//       let lastLine = "PythonError: Unknown error"
//       for (let i = lines.length - 1; i >= 0; i--) {
//         if (lines[i].includes(":")) {
//           lastLine = lines[i]
//           break
//         }
//       }

//       return `❌ ${lastLine}`
//     }

//     // fallback
//     return `❌ ${err.name}: ${err.message}`
//   }
// }
