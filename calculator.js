// Basic terminal calculator.

const readline = require("readline");

const OPS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "%": (a, b) => ((a % b) + b) % b, // match Python's floor-mod semantics
  "**": (a, b) => a ** b,
};

function calculate(a, op, b) {
  if (!(op in OPS)) {
    throw new Error(`Unknown operator: ${op}`);
  }
  if ((op === "/" || op === "%") && b === 0) {
    throw new Error("Cannot divide by zero");
  }
  const result = OPS[op](a, b);
  if (!Number.isFinite(result)) {
    throw new Error("Numerical result out of range");
  }
  return result;
}

function parseNumber(s) {
  const n = Number(s);
  if (s.trim() === "" || Number.isNaN(n)) {
    throw new Error(`could not convert string to float: '${s}'`);
  }
  return n;
}

function main() {
  console.log("Terminal Calculator");
  console.log("Enter expressions like: 3 + 4  (operators: + - * / % **). Type 'q' to quit.");

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "> " });
  rl.prompt();

  rl.on("line", (raw) => {
    const line = raw.trim();
    if (["q", "quit", "exit"].includes(line.toLowerCase())) {
      rl.close();
      return;
    }
    if (line) {
      const parts = line.split(/\s+/);
      if (parts.length !== 3) {
        console.log("Format: <number> <operator> <number>");
      } else {
        try {
          const a = parseNumber(parts[0]);
          const b = parseNumber(parts[2]);
          console.log(calculate(a, parts[1], b));
        } catch (e) {
          console.log(`Error: ${e.message}`);
        }
      }
    }
    rl.prompt();
  });

  rl.on("SIGINT", () => {
    console.log();
    rl.close();
  });
}

if (require.main === module) {
  main();
}

module.exports = { calculate };
