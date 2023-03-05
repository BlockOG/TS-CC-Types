/** @noSelfInFile */

/**
 * Emulates Lua's standard {@link https://www.lua.org/manual/5.1/manual.html#5.7 io library}.
 *
 * | API | Description |
 * | --- | ----------- |
 * | {@link stdin stdin}                    | A file handle representing the "standard input".                                                                               |
 * | {@link stdout stdout}                  | A file handle representing the "standard output".                                                                              |
 * | {@link stderr stderr}                  | A file handle representing the "standard error" stream.                                                                        |
 * | {@link close close([file])}            | Closes the provided file handle.                                                                                               |
 * | {@link flush flush()}                  | Flushes the current output file.                                                                                               |
 * | {@link input input([file])}            | Get or set the current input file.                                                                                             |
 * | {@link lines lines([filename][, ...])} | Opens the given file name in read mode and returns an iterator that, each time it is called, returns a new line from the file. |
 * | {@link open open(filename [, mode])}   | Open a file with the given mode, either returning a new file handle or nil, plus an error message.                             |
 * | {@link output output([file])}          | Get or set the current output file.                                                                                            |
 * | {@link io.read read(...)}                 | Read from the currently opened input file.                                                                                     |
 * | {@link type type(obj)}                 | Checks whether `handle` is a given file handle, and determine if it is open or not.                                            |
 * | {@link io.write write(...)}               | Write to the currently opened output file.                                                                                     |
 *
 * @noSelf
 */
declare interface IO {
    /** A file handle representing the "standard input". */
    readonly stdin: Handle;

    /** A file handle representing the "standard output". */
    readonly stdout: Handle;

    /** A file handle representing the "standard error" stream. */
    readonly stderr: Handle;

    /**
     * Closes the provided file handle.
     *
     * @param [file] The file handle to close, defaults to the current output file.
     * @see {@link Handle.close}
     * @see {@link io.output}
     * @since 1.55
     */
    close(file?: Handle): void;

    /**
     * Flushes the current output file.
     *
     * @see {@link Handle.flush}
     * @see {@link io.output}
     * @since 1.55
     */
    flush(): void;

    /**
     * Get or set the current input file.
     *
     * @param [file] The new input file, either as a file path or pre-existing handle.
     * @returns The current input file.
     * @throws If the provided filename cannot be opened for reading.
     * @since 1.55
     */
    input(file?: string | Handle): Handle;

    /**
     * Opens the given file name in read mode and returns an iterator that, each time it is called,
     * returns a new line from the file.
     *
     * This can be used in a for loop to iterate over all lines of a file.
     *
     * Once the end of the file has been reached, `undefined` will be returned. The file is
     * automatically closed.
     *
     * If no file name is given, the {@link io.input current input} will be used instead. In this
     * case, the handle is not used.
     *
     * @param [filename] The name of the file to extract lines from.
     * @param args The arguments to pass to {@link Handle.read} for each line.
     * @returns The line iterator.
     * @throws If the file cannot be opened for reading.
     * @see {@link Handle.lines}
     * @see {@link io.input}
     * @since 1.55
     * @example
     *     // Iterate over every line in a file and print it out.
     *     for (const line of io.lines("/rom/help/intro.txt")) {
     *         print(line);
     *     }
     */
    lines(
        filename?: string,
        args?: "*l" | "l" | "*L" | "L" | "*a" | "a"
    ): LuaIterable<string>;
    lines(
        filename?: string,
        ...args: Array<"*l" | "l" | "*L" | "L" | "*a" | "a">
    ): LuaIterable<LuaMultiReturn<[string, ...Array<string | undefined>]>>;

    /**
     * Open a file with the given mode, either returning a new file handle or `undefined`, plus an
     * error message.
     *
     * The `mode` string can be any of the following:
     *  - **"r"**: Read mode
     *  - **"w"**: Write mode
     *  - **"a"**: Append mode
     *
     * The mode may also have a `b` at the end, which opens the file in "binary mode". This allows
     * you to read binary files, as well as seek within a file.
     *
     * @param filename The name of the file to open.
     * @param [mode] The mode to open the file with. This defaults to `rb`.
     * @returns The opened file.
     * @returns In case of an error.
     * @returns The reason the file could not be opened.
     */
    open(
        filename: string,
        mode?: "r" | "w" | "a" | "rb" | "wb" | "ab"
    ):
        | LuaMultiReturn<[Handle, undefined]>
        | LuaMultiReturn<[undefined, string]>;

    /**
     * Get or set the current output file.
     *
     * @param [file] The new output file, either as a file path or pre-existing handle.
     * @returns The current output file.
     * @throws If the provided filename cannot be opened for writing.
     * @since 1.55
     */
    output(file?: string | Handle): Handle;

    /**
     * Read from the currently opened input file.
     *
     * This is equivalent to `io.input().read(...)`. See {@link Handle.read the documentation} there
     * for full details.
     *
     * @param args The formats to read, defaulting to a whole line.
     * @returns The data read, or `undefined` if nothing can be read.
     */
    read(args?: "*l" | "l" | "*L" | "L" | "*a" | "a"): string | undefined;
    read(
        ...args: Array<"*l" | "l" | "*L" | "L" | "*a" | "a">
    ): LuaMultiReturn<Array<string | undefined>>;

    /**
     * Checks whether `handle` is a given file handle, and determine if it is open or not.
     *
     * @param obj The value to check.
     * @returns `"file"` if this is an open file, `"closed file"` if it is a closed file handle, or
     *          `undefined` if not a file handle.
     */
    type(obj: unknown): "file" | "closed file" | undefined;

    /**
     * Write to the currently opened output file.
     *
     * This is equivalent to `io.output():write(...)`. See {@link Handle.write the documentation}
     * there for full details.
     *
     *  @param args The strings to write.
     *  @changed 1.81.0 Multiple arguments are now allowed.
     */
    write(...args: string[]): void;
}

/**
 * Emulates Lua's standard {@link https://www.lua.org/manual/5.1/manual.html#5.7 io library}.
 *
 * | API | Description |
 * | --- | ----------- |
 * | {@link io.stdin stdin}                    | A file handle representing the "standard input".                                                                               |
 * | {@link io.stdout stdout}                  | A file handle representing the "standard output".                                                                              |
 * | {@link io.stderr stderr}                  | A file handle representing the "standard error" stream.                                                                        |
 * | {@link io.close close([file])}            | Closes the provided file handle.                                                                                               |
 * | {@link io.flush flush()}                  | Flushes the current output file.                                                                                               |
 * | {@link io.input input([file])}            | Get or set the current input file.                                                                                             |
 * | {@link io.lines lines([filename][, ...])} | Opens the given file name in read mode and returns an iterator that, each time it is called, returns a new line from the file. |
 * | {@link io.open open(filename [, mode])}   | Open a file with the given mode, either returning a new file handle or nil, plus an error message.                             |
 * | {@link io.output output([file])}          | Get or set the current output file.                                                                                            |
 * | {@link io.read read(...)}                 | Read from the currently opened input file.                                                                                     |
 * | {@link io.type type(obj)}                 | Checks whether `handle` is a given file handle, and determine if it is open or not.                                            |
 * | {@link io.write write(...)}               | Write to the currently opened output file.                                                                                     |
 *
 * @noSelf
 */
declare const io: IO;

/** A file handle which can be read or written to. */
declare interface Handle {
    /**
     * Close this file handle, freeing any resources it uses.
     *
     * @returns If this handle was successfully closed.
     * @returns If this file handle could not be closed.
     * @returns The reason it could not be closed.
     * @throws If this handle was already closed.
     */
    close():
        | LuaMultiReturn<[true, undefined]>
        | LuaMultiReturn<[undefined, string]>;

    /**
     * Flush any buffered output, forcing it to be written to the file.
     *
     * @throws If the handle has been closed.
     */
    flush(): void;

    /**
     * Returns an iterator that, each time it is called, returns a new line from the file.
     *
     * This can be used in a for loop to iterate over all lines of a file.
     *
     * Once the end of the file has been reached, `undefined` will be returned. The file is *not*
     * automatically closed.
     *
     * @param args The arguments to pass to {@link Handle.read} for each line.
     * @returns The line iterator.
     * @throws If the file cannot be opened for reading.
     * @since 1.3
     * @see {@link io.lines}
     * @example
     *     // Iterate over every line in a file and print it out.
     *     const file = io.open("/rom/help/intro.txt");
     *     for (const line of file.lines()) {
     *         print(line);
     *     }
     *     file.close();
     */
    lines(args?: "*l" | "l" | "*L" | "L" | "*a" | "a"): LuaIterable<string>;
    lines(
        ...args: Array<"*l" | "l" | "*L" | "L" | "*a" | "a">
    ): LuaIterable<LuaMultiReturn<[string, ...Array<string | undefined>]>>;

    /**
     * Reads data from the file, using the specified formats. For each format provided, the function
     * returns either the data read, or `undefined` if no data could be read.
     *
     * The following formats are available:
     * - `l`: Returns the next line (without a newline on the end).
     * - `L`: Returns the next line (with a newline on the end).
     * - `a`: Returns the entire rest of the file.
     * - ~~`n`: Returns a number~~ (not implemented in CC).
     *
     * These formats can be preceded by a `*` to make it compatible with Lua 5.1.
     *
     * If no format is provided, `l` is assumed.
     *
     * @param args The formats to use.
     * @returns The data read from the file.
     */
    read(args?: "*l" | "l" | "*L" | "L" | "*a" | "a"): string | undefined;
    read(
        ...args: Array<"*l" | "l" | "*L" | "L" | "*a" | "a">
    ): LuaMultiReturn<Array<string | undefined>>;

    /**
     * Seeks the file cursor to the specified position, and returns the new position.
     *
     * `whence` controls where the seek operation starts, and is a string that may be one of these
     * three values:
     * - `set`: base position is 0 (beginning of the file)
     * - `cur`: base is current position
     * - `end`: base is end of file
     *
     * The default value of `whence` is `cur`, and the default value of `offset` is 0. This means
     * that `file.seek()` without arguments returns the current position without moving.
     *
     * @param [whence] The place to set the cursor from.
     * @param [offset] The offset from the start to move to.
     * @returns The new location of the file cursor.
     */
    seek(whence?: "set" | "cur" | "end", offset?: number): number;

    /**
     * Sets the buffering mode for an output file.
     *
     * This has no effect under ComputerCraft, and exists with compatility with base Lua.
     *
     * @param mode The buffering mode.
     * @param [size] The size of the buffer.
     * @see {@link https://www.lua.org/manual/5.1/manual.html#pdf-file:setvbuf file.setvbuf} Lua's
     * documentation for `setvbuf`.
     * @deprecated This has no effect in CC.
     */
    setvbuf(mode: "no" | "full" | "line", size?: number): void;

    /**
     * Write one or more values to the file.
     *
     * @param args The values to write.
     * @returns The current file, allowing chained calls.
     * @changed 1.81.0 Multiple arguments are now allowed.
     */
    write(...args: Array<string | number>): this;
}
