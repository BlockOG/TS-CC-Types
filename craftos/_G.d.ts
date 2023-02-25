/** @noSelfInFile */

// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * Functions in the global environment, defined in `bios.lua`. This does not include standard Lua
 * functions.
 *
 * | API                                                                  | Description                                                                                   |
 * | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
 * | {@link sleep sleep([time])}                                          | Pauses execution for the specified number of seconds.                                         |
 * | {@link write write(text)}                                            | Writes a line of text to the screen without a newline at the end, wrapping text if necessary. |
 * | {@link print print(...)}                                             | Prints the specified values to the screen separated by spaces, wrapping if necessary.         |
 * | {@link printError printError(...)}                                   | Prints the specified values to the screen in red, separated by spaces, wrapping if necessary. |
 * | {@link read read([replaceChar][, history][, completeFn][, default])} | Reads user input from the terminal.                                                           |
 * | {@link _HOST}                                                        | Stores the current ComputerCraft and Minecraft versions.                                      |
 * | {@link _CC_DEFAULT_SETTINGS}                                         | The default computer settings as defined in the ComputerCraft configuration.                  |
 */
declare const _G: typeof globalThis;

/**
 * Pauses execution for the specified number of seconds.
 *
 * As it waits for a fixed amount of world ticks, `time` will automatically be rounded up to the
 * nearest multiple of 0.05 seconds. If you are using coroutines or the {@link parallel parallel
 * API}, it will only pause execution of the current thread, not the whole program.
 *
 * #### TIP
 *
 * Because sleep internally uses timers, it is a function that yields. This means that you can use
 * it to prevent "Too long without yielding" errors. However, as the minimum sleep time is 0.05
 * seconds, it will slow your program down. |
 *
 * #### CAUTION
 *
 * Internally, this function queues and waits for a timer event (using {@link os.startTimer}),
 * however it does not listen for any other events. This means that any event that occurs while
 * sleeping will be entirely discarded. If you need to receive events while sleeping, consider using
 * {@link os.startTimer timers}, or the {@link parallel parallel API}.
 *
 * @example
 *     // Sleep for three seconds.
 *     print("Sleeping for three seconds");
 *     sleep(3);
 *     print("Done!");
 * @param [time] The number of seconds to sleep for, rounded up to the nearest multiple of 0.05.
 * @see {@link os.startTimer}
 */
declare function sleep(time?: number): void;

/**
 * Writes a line of text to the screen without a newline at the end, wrapping text if necessary.
 *
 * @example
 *     write("Hello, world");
 * @param text The text to write to the string.
 * @returns The number of lines written.
 * @see {@link _G.print print} A wrapper around write that adds a newline and accepts multiple
 *      arguments.
 */
declare function write(text: string): number;

/**
 * Prints the specified values to the screen separated by spaces, wrapping if necessary. After
 * printing, the cursor is moved to the next line.
 *
 * @example
 *     print("Hello, world!");
 * @param args The values to print on the screen.
 * @returns The number of lines written.
 */
declare function print(...args: unknown[]): number;

/**
 * Prints the specified values to the screen in red, separated by spaces, wrapping if necessary.
 * After printing, the cursor is moved to the next line.
 *
 * @example
 *     printError("Something went wrong!");
 * @param args The values to print on the screen.
 */
declare function printError(...args: unknown[]): void;

/**
 * Reads user input from the terminal. This automatically handles arrow keys, pasting, character
 * replacement, history scrollback, auto-completion, and default values.
 *
 * @example
 *     // Read a string and echo it back to the user
 *     write("> ");
 *     let msg = read();
 *     print(msg);
 * @example
 *     // Prompt a user for a password.
 *     while (true) {
 *         write("Password> ");
 *         let pwd = read("*");
 *         if (pwd == "let me in") break;
 *         print("Incorrect password, try again.");
 *     }
 *     print("Logged in!");
 * @example
 *     // A complete example with completion, history and a default value.
 *     import * as completion from "cc.completion";
 *     let history = ["potato", "orange", "apple"];
 *     let choices = ["apple", "orange", "banana", "strawberry"];
 *     write("> ");
 *     let msg = read(null, history, (text) => completion.choice(text, choices), "app");
 *     print(msg);
 * @param [replaceChar] A character to replace each typed character with. This can be used for
 *        hiding passwords, for example.
 * @param [history] A table holding history items that can be scrolled back to with the up/down
 *        arrow keys. The oldest item is at index 1, while the newest item is at the highest index.
 * @param [completeFn] A function to be used for completion. This function should take the partial
 *        text typed so far, and returns a list of possible completion options.
 * @param [defaultValue] Default text which should already be entered into the prompt.
 * @returns The text typed in.
 * @changed 1.74 Added `completeFn` parameter.
 * @changed 1.80pr1 Added `default` parameter.
 * @see cc.completion For functions to help with completion.
 */
declare function read(
    replaceChar?: string,
    history?: string[],
    completeFn?: (partial: string) => string[] | undefined,
    defaultValue?: string
): string;

/**
 * Stores the current ComputerCraft and Minecraft versions.
 *
 * Outside of Minecraft (for instance, in an emulator) _HOST will contain the emulator's version
 * instead.
 *
 * For example, `ComputerCraft 1.93.0 (Minecraft 1.15.2)`.
 *
 * @since 1.76
 * @example
 *     // Print the current computer's environment.
 *     print(_HOST);
 */
declare const _HOST: string;

/**
 * The default computer settings as defined in the ComputerCraft configuration.
 *
 * This is a comma-separated list of settings pairs defined by the mod configuration or server
 * owner. By default, it is empty.
 *
 * An example value to disable autocompletion:
 * `shell.autocomplete=false,lua.autocomplete=false,edit.autocomplete=false`
 *
 * @since 1.77
 * @example
 *     _CC_DEFAULT_SETTINGS;
 */
declare const _CC_DEFAULT_SETTINGS: string;
