import { demos } from "./algorithms.js";

const algoSelect = document.getElementById("algo");
const inputA = document.getElementById("inputA");
const inputB = document.getElementById("inputB");
const labelA = document.getElementById("labelA");
const labelB = document.getElementById("labelB");
const codeArea = document.getElementById("code");

const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");
const explainBtn = document.getElementById("explainBtn");

const output = document.getElementById("output");
const statusEl = document.getElementById("status");

const explainPanel = document.getElementById("explainPanel");
const explainText = document.getElementById("explainText");

let currentDemo = demos[0];

function setOutput(text) {
  output.textContent = text;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function applyLabels(demo) {
  labelA.textContent = demo.labels?.a ?? "Input A";
  labelB.textContent = demo.labels?.b ?? "Input B";
}

function loadDemo(demo) {
  currentDemo = demo;
  applyLabels(demo);
  inputA.value = demo.defaults?.inputA ?? "";
  inputB.value = demo.defaults?.inputB ?? "";
  codeArea.value = demo.code ?? "";
  explainText.textContent = demo.explain ?? "";
  setOutput("");
  setStatus("Ready.");
}

function resetCode() {
  codeArea.value = currentDemo.code ?? "";
  setStatus("Code reset to default for this algorithm.");
}

function showExplain() {
  explainPanel.open = true;
  explainText.textContent = currentDemo.explain ?? "(no explanation provided)";
}

for (const d of demos) {
  const opt = document.createElement("option");
  opt.value = d.id;
  opt.textContent = d.name;
  algoSelect.appendChild(opt);
}

algoSelect.addEventListener("change", () => {
  const demo = demos.find(d => d.id === algoSelect.value);
  if (demo) loadDemo(demo);
});

resetBtn.addEventListener("click", resetCode);
explainBtn.addEventListener("click", showExplain);

loadDemo(demos[0]);

// Load Pyodide
setStatus("Loading Pyodide…");
setOutput("Downloading Python runtime. First load can take a bit.");

import("https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.mjs")
  .then(async (pyodideModule) => {
    const pyodide = await pyodideModule.loadPyodide();
    window.__pyodide = pyodide;

    runBtn.disabled = false;
    resetBtn.disabled = false;
    explainBtn.disabled = false;

    runBtn.textContent = "Run";
    setStatus("Ready.");

    runBtn.addEventListener("click", async () => {
      runBtn.disabled = true;
      setStatus("Running…");
      setOutput("");

      const userCode = codeArea.value;

      window.__pyodide.globals.set("inputA", inputA.value);
      window.__pyodide.globals.set("inputB", inputB.value);

      const indentedUserCode = userCode.split("\n").map(l => "    " + l).join("\n");

      const pythonWrapper = `
import sys, io
_buf = io.StringIO()
_old = sys.stdout
sys.stdout = _buf

try:
${indentedUserCode}
except Exception as e:
    print("Error:", type(e).__name__, e)
finally:
    sys.stdout = _old

_buf.getvalue()
`;

      try {
        const result = await window.__pyodide.runPythonAsync(pythonWrapper);
        setOutput(result || "(no output)");
        setStatus("Done.");
      } catch (e) {
        setOutput("Runtime error: " + e);
        setStatus("Error.");
      } finally {
        runBtn.disabled = false;
      }
    });
  })
  .catch((e) => {
    setStatus("Failed to load Pyodide.");
    setOutput(String(e));
  });
