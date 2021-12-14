# Typescript Brainfuck Interpreter

A simple and easy to use Brainfuck interpreter, written in TypeScript.

### How To Use

1. Include this file in your TypeScript project.
2. Import the default export into your target location.
3. Call `BrainfuckInterpreter.parse` with your Brainfuck string.

### Example

```ts
import BrainfuckInterpreter from "./brainfuck-interpreter";

BrainfuckInterpreter.parse(
    `>+++++++++[<++++++++>-]<.
     >+++++++[<++++>-]<+.
     >+++[<++>-]<+..
     +++.
     >+++++++++++++[<------>-]<-.
     >+++++++++++[<+++++>-]<.
     >++++++++[<+++>-]<.
     +++.
     ------.
     --------.
     >+++++++++++[<------>-]<-.`
);
```
