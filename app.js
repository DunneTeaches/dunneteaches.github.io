import { demos } from "./algorithms.js";

const algoSelect = document.getElementById("algo");
const inputA = document.getElementById("inputA");
const inputB = document.getElementById("inputB");
const codeArea = document.getElementById("code");
const runBtn = document.getElementById("runBtn");
const output = document.getElementById("output");
const statusEl = document.getElementById("status");

function setOutput(text) {
    output.textContent = text;
}

function setStatus(text) {
    statusEl.textContent = text;
}

function loadDemo(demo) {
    inputA.value = demo.defaults.inputA ?? "";
    inputB.value = demo.defaults.inputB ?? "";
    codeArea.value = demo.code ?? "";
    setOutput("");
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

loadDemo(demos[0]);

// Load Pyodide
setStatus("Loading Pyodide…");
setOutput("Downloading Python runtime. First load can take a bit.");

import("https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.mjs")
    .then(async (pyodideModule) => {
        const pyodide = await pyodideModule.loadPyodide();
        window.__pyodide = pyodide;

        runBtn.disabled = false;
        runBtn.textContent = "Run";
        setStatus("Ready.");

        runBtn.addEventListener("click", async () => {
            runBtn.disabled = true;
            setStatus("Running…");
            setOutput("");

            const userCode = codeArea.value;

            // Provide inputs into Python globals
            window.__pyodide.globals.set("inputA", inputA.value);
            window.__pyodide.globals.set("inputB", inputB.value);

            // Capture stdout
            const pythonWrapper = `
import sys, io
_buf = io.StringIO()
_old = sys.stdout
sys.stdout = _buf

try:
${userCode.split("\n").map(l => "    " + l).join("\n")}
except Exception as e:
    print("Error:", type(e).__name__, e)
finally:
    sys.stdout = _old

_buf.getvalue()
`;

            try {
                const result = await window.__pyodide.runPythonAsync(pythonWrapper);
                setOutput(result || "(no output)");
            } catch (e) {
                setOutput("Runtime error: " + e);
            } finally {
                runBtn.disabled = false;
                setStatus("Ready.");
            }
        });
    })
    .catch((e) => {
        setStatus("Failed to load Pyodide.");
        setOutput(String(e));
    });