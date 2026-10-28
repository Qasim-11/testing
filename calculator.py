"""Basic terminal calculator."""

import operator

OPS = {
    "+": operator.add,
    "-": operator.sub,
    "*": operator.mul,
    "/": operator.truediv,
    "%": operator.mod,
    "**": operator.pow,
}


def calculate(a, op, b):
    if op not in OPS:
        raise ValueError(f"Unknown operator: {op}")
    if op in ("/", "%") and b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return OPS[op](a, b)


def main():
    print("Terminal Calculator")
    print("Enter expressions like: 3 + 4  (operators: + - * / % **). Type 'q' to quit.")
    while True:
        try:
            line = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if line.lower() in ("q", "quit", "exit"):
            break
        if not line:
            continue
        parts = line.split()
        if len(parts) != 3:
            print("Format: <number> <operator> <number>")
            continue
        try:
            a, op, b = float(parts[0]), parts[1], float(parts[2])
            result = calculate(a, op, b)
            print(int(result) if result == int(result) else result)
        except (ValueError, ZeroDivisionError, OverflowError) as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()
