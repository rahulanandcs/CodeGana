import { useEffect, useState, useRef, useCallback } from "react"

// The raw Web Worker code as a string.
const workerCode = `
  importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");

  let pyodide = null;

  async function init() {
    try {
      pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
      postMessage({ type: "INIT_COMPLETE" });
    } catch (err) {
      const message = err?.message || err?.toString() || "Unknown error";
      postMessage({ type: "INIT_ERROR", error: "❌ Failed to initialize Python engine: " + message });
    }
  }

  init();

  self.onmessage = async (event) => {
    const { id, code, input } = event.data;
    
    if (!pyodide) {
      postMessage({ id, error: "❌ Python engine not ready yet." });
      return;
    }

    try {
      const safeInput = input || "";
      pyodide.globals.set("__user_input__", safeInput);

      // FIX: We use a JS array joined by newlines to completely avoid template literal escape bugs
      const setupCode = [
        "import sys",
        "from io import StringIO",
        "import builtins",
        "sys.stdout = StringIO()",
        "sys.stderr = StringIO()",
        "_input_lines = __user_input__.splitlines()",
        "_input_iter = iter(_input_lines)",
        "def _custom_input(prompt=''):",
        "    try:",
        "        return next(_input_iter)",
        "    except StopIteration:",
        "        raise EOFError('EOF when reading a line')",
        "builtins.input = _custom_input"
      ].join("\\n");

      await pyodide.runPythonAsync(setupCode);
      await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      
      postMessage({ id, result: stdout });
    } catch (err) {
      let errorMsg = err.message || err.toString();
      
      if (err.name === "PythonError" && err.message) {
        const lines = err.message.split("\\n").map(l => l.trim()).filter(Boolean);
        let lastLine = "PythonError: Unknown error";
        for (let i = lines.length - 1; i >= 0; i--) {
          if (lines[i].includes(":")) {
            lastLine = lines[i];
            break;
          }
        }
        errorMsg = "❌ " + lastLine;
      } else {
        errorMsg = "❌ " + err.name + ": " + err.message;
      }
      
      postMessage({ id, error: errorMsg });
    }
  };
`;

export function usePyodide() {
  const [loading, setLoading] = useState(true);
  const workerRef = useRef<Worker | null>(null);
  const messageIdRef = useRef(0);
  const callbacksRef = useRef<{ [key: number]: { resolve: (val: string) => void } }>({});

  const initWorker = useCallback(() => {
    setLoading(true);

    // Terminate existing worker if we are restarting
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    // Create a new Blob worker
    const blob = new Blob([workerCode], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    let initializationTimedOut = false;

    const finishInitialization = (ready: boolean, message?: string) => {
      if (initializationTimedOut) return;
      initializationTimedOut = true;
      clearTimeout(initTimer);
      setLoading(false);

      if (!ready && message) {
        console.error(message);
      }
    };

    const initTimer = window.setTimeout(() => {
      finishInitialization(false, "Python engine initialization timed out.");
    }, 10000);

    worker.onmessage = (event) => {
      const { type, id, result, error } = event.data;

      if (type === "INIT_COMPLETE") {
        finishInitialization(true);
        return;
      }

      if (type === "INIT_ERROR") {
        finishInitialization(false, error || "Python engine failed to initialize.");
        return;
      }

      // Resolve the specific execution promise
      if (id !== undefined && callbacksRef.current[id]) {
        callbacksRef.current[id].resolve(error || result);
        delete callbacksRef.current[id];
      }
    };

    worker.onerror = (event) => {
      finishInitialization(false, `Worker error: ${event.message}`);
    };

    workerRef.current = worker;
  }, []);

  useEffect(() => {
    initWorker();
    return () => workerRef.current?.terminate();
  }, [initWorker]);

  const runPython = useCallback((code: string, input: string): Promise<string> => {
    return new Promise((resolve) => {
      if (!workerRef.current || loading) {
        resolve("❌ Error: Python engine is still loading.");
        return;
      }

      const id = messageIdRef.current++;
      callbacksRef.current[id] = { resolve };

      workerRef.current.postMessage({ id, code, input });

      // THE KILL SWITCH: 3-Second Timeout for Infinite Loops
      setTimeout(() => {
        if (callbacksRef.current[id]) {
          resolve("❌ TimeoutError: Your code took too long to run. Possible infinite loop.");
          delete callbacksRef.current[id];
          
          // Terminate the frozen worker and spin up a fresh one automatically
          initWorker(); 
        }
      }, 3000);
    });
  }, [loading, initWorker]);

  return { runPython, loading };
}