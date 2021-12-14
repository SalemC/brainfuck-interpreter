class BrainfuckInterpreter {
    /**
     * The array.
     *
     * @var {Uint8Array}
     */
    private static array = new Uint8Array(30000);

    /**
     * The pointer to the array.
     *
     * @var {number}
     */
    private static pointer: number = 0;

    /**
     * The target string to parse.
     *
     * @var {string}
     */
    public static target: string = "";

    /**
     * The result.
     *
     * @var {string}
     */
    public static result: string = "";

    /**
     * Parse a character.
     *
     * @param {string} character The character to parse.
     *
     * @return {void}
     */
    private static parseCharacter(character: string): void {
        switch (character) {
            case "+": {
                BrainfuckInterpreter.array[BrainfuckInterpreter.pointer] += 1;

                break;
            }

            case "-": {
                BrainfuckInterpreter.array[BrainfuckInterpreter.pointer] -= 1;

                break;
            }

            case ">": {
                BrainfuckInterpreter.pointer += 1;

                if (BrainfuckInterpreter.pointer > 30000) throw new Error("Pointer out of bounds!");

                break;
            }

            case "<": {
                BrainfuckInterpreter.pointer -= 1;

                if (BrainfuckInterpreter.pointer < 0) throw new Error("Pointer out of bounds!");

                break;
            }

            case ".": {
                BrainfuckInterpreter.result += String.fromCharCode(
                    BrainfuckInterpreter.array[BrainfuckInterpreter.pointer]
                );

                break;
            }

            case ",": {
                const input = prompt("Please enter an ascii value");

                if (!input) throw new Error("You must enter a value!");

                BrainfuckInterpreter.array[BrainfuckInterpreter.pointer] = input.charCodeAt(0);

                break;
            }
        }
    }

    /**
     * Start a loop.
     *
     * @param {number} sliceFrom The index where the loop starts in the original string.
     *
     * @return {number} The number of characters the loop consists of.
     */
    private static loop = (sliceFrom: number): number => {
        const sliced = BrainfuckInterpreter.target.slice(sliceFrom);

        let closeIndex = -1;
        let closingTagsRequired = 0;

        for (let i = 0; i < sliced.length; i += 1) {
            const character = sliced.charAt(i);

            if (character === "[") {
                closingTagsRequired += 1;

                continue;
            }

            if (character === "]") {
                if (closingTagsRequired === 0) {
                    closeIndex = i;

                    break;
                }

                closingTagsRequired -= 1;

                continue;
            }
        }

        if (closeIndex === -1) throw new Error("You're missing a closing loop tag!");

        const loopString = sliced.slice(0, closeIndex);

        while (BrainfuckInterpreter.array[BrainfuckInterpreter.pointer] > 0) {
            for (let i = 0; i < loopString.length; i += 1) {
                const loopChar = loopString.charAt(i);

                switch (loopChar) {
                    case "[": {
                        i += BrainfuckInterpreter.loop(sliceFrom + i + 1);

                        break;
                    }

                    default: {
                        BrainfuckInterpreter.parseCharacter(loopChar);

                        break;
                    }
                }
            }
        }

        return loopString.length;
    };

    /**
     * Reset the interpreter.
     *
     * @param {string} target The target string.
     *
     * @return {string} The parsed result.
     */
    private static reset(target: string): void {
        BrainfuckInterpreter.array = new Uint8Array(30000);
        BrainfuckInterpreter.target = target;
        BrainfuckInterpreter.result = "";
        BrainfuckInterpreter.pointer = 0;
    }

    /**
     * Parse a string.
     *
     * @param {string} target The target string.
     *
     * @return {string} The parsed result.
     */
    public static parse(target: string): string {
        BrainfuckInterpreter.reset(target);

        for (let i = 0; i < BrainfuckInterpreter.target.length; i += 1) {
            const character = BrainfuckInterpreter.target.charAt(i);

            switch (character) {
                case "[": {
                    i += BrainfuckInterpreter.loop(i + 1);

                    break;
                }

                default: {
                    BrainfuckInterpreter.parseCharacter(character);

                    break;
                }
            }
        }

        return this.result;
    }
}

export default BrainfuckInterpreter;
