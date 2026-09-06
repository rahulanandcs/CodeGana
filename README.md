CodeGana
CodeGana is an interactive, web-based platform designed to teach Python through gamified coding challenges and real-time execution. Built to move beyond passive tutorial video consumption, the platform provides immediate feedback in an isolated environment, helping users build problem-solving skills and code literacy.

Technical Overview
CodeGana operates completely client-side to keep hosting friction low while maintaining fast execution speeds. By compiling Python scripts directly inside the browser using WebAssembly, users can run, test, and debug code without needing a sandboxed backend server infrastructure.

Core Stack
Frontend: React, TypeScript, Vite

Styling & UI: Custom CSS Modules, Tailwind CSS, Lottie Web Animations

Code Execution Engine: Pyodide (Python runtime compiled to WebAssembly)

Routing & State: React Router v6, Context API, LocalStorage persistence

Architectural Highlights
Client-Side Execution Engine
Instead of routing user code to a remote Docker container or AWS Lambda function, CodeGana loads a lightweight Pyodide WebAssembly instance directly into the client browser runtime.

Intercepts standard output (sys.stdout) to stream execution logs directly to the integrated UI terminal.

Captures and parses custom test cases in memory to evaluate user solutions against expected outputs.

Isolates code execution from the main application thread to keep the web interface responsive during runtime calculations.

Gamification & State Persistence
Keeps track of user experience points (XP), daily streaks, and challenge completion status using browser LocalStorage.

Features custom avatar rendering and progression logic via React Context state wrappers.

Employs custom CSS animations and WebGL lighting effects to build an engaging, arcade-style aesthetic.

Challenge System & Testing Infrastructure
Every challenge inside the platform includes a structured test suite:

Public Test Cases: Visible input and output pairings that help guide the initial solution path.

Hidden Edge Cases: Hidden assertion checks (handling zero values, negative numbers, boundary limits, and empty inputs) to test edge-case handling.

Automated Hint Engine: Dynamic hints that trigger when specific assertion checks fail.
