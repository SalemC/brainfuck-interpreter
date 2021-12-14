class BrainfuckInterpreter {
    /**
     * The array.
     *
     * @var {Uint8Array}
     */
    private static readonly array = new Uint8Array(30000);

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

                break;
            }

            case "<": {
                BrainfuckInterpreter.pointer -= 1;

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

        const loopCloseIndex = sliced.indexOf("]");

        if (loopCloseIndex === -1) {
            throw new Error("You're missing a closing loop tag!");
        }

        const loopString = sliced.slice(0, loopCloseIndex);

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
     * Parse a string.
     *
     * @param {string} target The target string.
     *
     * @return {string} The parsed result.
     */
    public static parse(target: string): string {
        BrainfuckInterpreter.target = target;
        BrainfuckInterpreter.result = "";

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
