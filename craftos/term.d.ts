/** @noSelfInFile */

/**
 * Interact with a computer's terminal or monitors, writing text and drawing ASCII graphics.
 *
 * | API                                                     | Description                                                                               |
 * | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
 * | {@link nativePaletteColour nativePaletteColour(colour)} | Get the default palette value for a colour.                                               |
 * | {@link nativePaletteColor nativePaletteColor(color)}    | Get the default palette value for a color.                                                |
 * | {@link Term.write write(text)}                          | Write text at the current cursor position, moving the cursor to the end of the text.      |
 * | {@link scroll scroll(y)}                                | Move all positions up (or down) by y pixels.                                              |
 * | {@link getCursorPos getCursorPos()}                     | Get the position of the cursor.                                                           |
 * | {@link setCursorPos setCursorPos(x, y)}                 | Set the position of the cursor.                                                           |
 * | {@link getCursorBlink getCursorBlink()}                 | Checks if the cursor is currently blinking.                                               |
 * | {@link setCursorBlink setCursorBlink(blink)}            | Sets whether the cursor should be visible (and blinking) at the current cursor position.  |
 * | {@link getSize getSize()}                               | Get the size of the terminal.                                                             |
 * | {@link clear clear()}                                   | Clears the terminal, filling it with the current background color.                        |
 * | {@link clearLine clearLine()}                           | Clears the line the cursor is currently on, filling it with the current background color. |
 * | {@link getTextColour getTextColour()}                   | Return the colour that new text will be written as.                                       |
 * | {@link getTextColor getTextColor()}                     | Return the color that new text will be written as.                                        |
 * | {@link setTextColour setTextColour(colour)}             | Set the colour that new text will be written as.                                          |
 * | {@link setTextColor setTextColor(color)}                | Set the color that new text will be written as.                                           |
 * | {@link getBackgroundColour getBackgroundColour()}       | Return the current background colour.                                                     |
 * | {@link getBackgroundColor getBackgroundColor()}         | Return the current background color.                                                      |
 * | {@link setBackgroundColour setBackgroundColour(colour)} | Set the current background colour.                                                        |
 * | {@link setBackgroundColor setBackgroundColor(color)}    | Set the current background color.                                                         |
 * | {@link isColour isColour()}                             | Determine if this terminal supports colour.                                               |
 * | {@link isColor isColor()}                               | Determine if this terminal supports color.                                                |
 * | {@link blit blit(text, textColor, backgroundColor)}     | Writes text to the terminal with the specific foreground and background characters.       |
 * | {@link setPaletteColour setPaletteColour(...)}          | Set the palette for a specific colour.                                                    |
 * | {@link setPaletteColor setPaletteColor(...)}            | Set the palette for a specific color.                                                     |
 * | {@link getPaletteColour getPaletteColour(colour)}       | Get the current palette for a specific colour.                                            |
 * | {@link getPaletteColor getPaletteColor(color)}          | Get the current palette for a specific color.                                             |
 * | {@link redirect redirect(target)}                       | Redirects terminal output to a monitor, a window, or any other custom terminal object.    |
 * | {@link current current()}                               | Returns the current terminal object of the computer.                                      |
 * | {@link native native()}                                 | Get the native terminal object of the current computer.                                   |
 *
 * @noSelf
 */
declare interface Term extends Redirect {
    /**
     * Get the default palette value for a colour.
     *
     * @param colour The colour whose palette should be fetched.
     * @returns The red channel, will be between 0 and 1.
     * @returns The green channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @throws When given an invalid colour.
     * @since 1.81.0
     * @see {@link setPaletteColour} To change the palette colour.
     */
    nativePaletteColour(
        colour: number
    ): LuaMultiReturn<[number, number, number]>;

    /**
     * Get the default palette value for a color.
     *
     * @param color The color whose palette should be fetched.
     * @returns The red channel, will be between 0 and 1.
     * @returns The green channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @throws When given an invalid color.
     * @since 1.81.0
     * @see {@link setPaletteColor} To change the palette color.
     */
    nativePaletteColor(color: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Redirects terminal output to a monitor, a {@link window}, or any other custom terminal
     * object. Once the redirect is performed, any calls to a "term" function - or to a function
     * that makes use of a term function, as {@link print} - will instead operate with the new
     * terminal object.
     *
     * A "terminal object" is simply a table that contains functions with the same names - and
     * general features - as those found in the term table. For example, a wrapped monitor is
     * suitable.
     *
     * The redirect can be undone by pointing back to the previous terminal object (which this
     * function returns whenever you switch).
     *
     * @param target The terminal redirect the {@link term} API will draw to.
     * @returns The previous redirect object, as returned by {@link term.current}.
     * @since 1.31
     * @example
     *     // Redirect to a monitor on the right of the computer.
     *     term.redirect(peripheral.wrap("right"));
     */
    redirect(target: Redirect): Redirect;

    /**
     * Returns the current terminal object of the computer.
     *
     * @returns The current terminal redirect.
     * @since 1.6
     * @example
     *     // Create a new `window` which draws to the current redirect target.
     *     window.create(term.current(), 1, 1, 10, 10);
     */
    current(): Redirect;

    /**
     * Get the native terminal object of the current computer.
     *
     * It is recommended you do not use this function unless you absolutely have to. In a
     * multitasked environment, {@link term.native} will _not_ be the current terminal object, and
     * so drawing may interfere with other programs.
     *
     * @returns The native terminal redirect.
     * @since 1.6
     */
    native(): Redirect;
}

/**
 * Interact with a computer's terminal or monitors, writing text and drawing ASCII graphics.
 *
 * | API                                                     | Description                                                                               |
 * | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
 * | {@link nativePaletteColour nativePaletteColour(colour)} | Get the default palette value for a colour.                                               |
 * | {@link nativePaletteColor nativePaletteColor(color)}    | Get the default palette value for a color.                                                |
 * | {@link Term.write write(text)}                          | Write text at the current cursor position, moving the cursor to the end of the text.      |
 * | {@link scroll scroll(y)}                                | Move all positions up (or down) by y pixels.                                              |
 * | {@link getCursorPos getCursorPos()}                     | Get the position of the cursor.                                                           |
 * | {@link setCursorPos setCursorPos(x, y)}                 | Set the position of the cursor.                                                           |
 * | {@link getCursorBlink getCursorBlink()}                 | Checks if the cursor is currently blinking.                                               |
 * | {@link setCursorBlink setCursorBlink(blink)}            | Sets whether the cursor should be visible (and blinking) at the current cursor position.  |
 * | {@link getSize getSize()}                               | Get the size of the terminal.                                                             |
 * | {@link clear clear()}                                   | Clears the terminal, filling it with the current background color.                        |
 * | {@link clearLine clearLine()}                           | Clears the line the cursor is currently on, filling it with the current background color. |
 * | {@link getTextColour getTextColour()}                   | Return the colour that new text will be written as.                                       |
 * | {@link getTextColor getTextColor()}                     | Return the color that new text will be written as.                                        |
 * | {@link setTextColour setTextColour(colour)}             | Set the colour that new text will be written as.                                          |
 * | {@link setTextColor setTextColor(color)}                | Set the color that new text will be written as.                                           |
 * | {@link getBackgroundColour getBackgroundColour()}       | Return the current background colour.                                                     |
 * | {@link getBackgroundColor getBackgroundColor()}         | Return the current background color.                                                      |
 * | {@link setBackgroundColour setBackgroundColour(colour)} | Set the current background colour.                                                        |
 * | {@link setBackgroundColor setBackgroundColor(color)}    | Set the current background color.                                                         |
 * | {@link isColour isColour()}                             | Determine if this terminal supports colour.                                               |
 * | {@link isColor isColor()}                               | Determine if this terminal supports color.                                                |
 * | {@link blit blit(text, textColor, backgroundColor)}     | Writes text to the terminal with the specific foreground and background characters.       |
 * | {@link setPaletteColour setPaletteColour(...)}          | Set the palette for a specific colour.                                                    |
 * | {@link setPaletteColor setPaletteColor(...)}            | Set the palette for a specific color.                                                     |
 * | {@link getPaletteColour getPaletteColour(colour)}       | Get the current palette for a specific colour.                                            |
 * | {@link getPaletteColor getPaletteColor(color)}          | Get the current palette for a specific color.                                             |
 * | {@link redirect redirect(target)}                       | Redirects terminal output to a monitor, a window, or any other custom terminal object.    |
 * | {@link current current()}                               | Returns the current terminal object of the computer.                                      |
 * | {@link native native()}                                 | Get the native terminal object of the current computer.                                   |
 *
 * @noSelf
 */
declare const term: Term;

/**
 * A base class for all objects which interact with a terminal. Namely the {@link term} and
 * monitors.
 *
 * @noSelf
 */
declare interface Redirect {
    /**
     * Write `text` at the current cursor position, moving the cursor to the end of the text.
     *
     * Unlike functions like `write` and `print`, this does not wrap the text - it simply copies the
     * text to the current terminal line.
     *
     * @param text The text to write.
     */
    write(text: string): void;

    /**
     * Move all positions up (or down) by `y` pixels.
     *
     * Every pixel in the terminal will be replaced by the line `y` pixels below it. If `y` is
     * negative, it will copy pixels from above instead.
     *
     * @param y The number of lines to move up by. This may be a negative number.
     */
    scroll(y: number): void;

    /**
     * Get the position of the cursor.
     *
     * @returns The x position of the cursor.
     * @returns The y position of the cursor.
     */
    getCursorPos(): LuaMultiReturn<[number, number]>;

    /**
     * Set the position of the cursor. {@link Redirect.write Terminal writes} will begin from this
     * position.
     *
     * @param x The new x position of the cursor.
     * @param y The new y position of the cursor.
     */
    setCursorPos(x: number, y: number): void;

    /**
     * Checks if the cursor is currently blinking.
     *
     * @returns If the cursor is blinking.
     * @since 1.80pr1.9
     */
    getCursorBlink(): boolean;

    /**
     * Sets whether the cursor should be visible (and blinking) at the current
     * {@link getCursorPos cursor position}.
     *
     * @param blink Whether the cursor should blink.
     */
    setCursorBlink(blink: boolean): void;

    /**
     * Get the size of the terminal.
     *
     * @returns The terminal's width.
     * @returns The terminal's height.
     */
    getSize(): LuaMultiReturn<[number, number]>;

    /**
     * Clears the terminal, filling it with the {@link getBackgroundColor current background color}.
     */
    clear(): void;

    /**
     * Clears the line the cursor is currently on, filling it with the
     * {@link getBackgroundColor current background color}.
     */
    clearLine(): void;

    /**
     * Return the colour that new text will be written as.
     *
     * @returns The current text colour.
     * @see {@link colors} For a list of colour constants, returned by this function.
     * @since 1.74
     */
    getTextColour(): number;

    /**
     * Return the color that new text will be written as.
     *
     * @returns The current text color.
     * @see {@link colors} For a list of color constants, returned by this function.
     * @since 1.74
     */
    getTextColor(): number;

    /**
     * Set the colour that new text will be written as.
     *
     * @param colour The new text colour.
     * @see {@link colors} For a list of colour constants.
     * @since 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colours, being changed to grayscale on
     *          screen.
     */
    setTextColour(colour: number): void;

    /**
     * Set the color that new text will be written as.
     *
     * @param color The new text color.
     * @see {@link colors} For a list of color constants.
     * @since 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being changed to grayscale on
     *          screen.
     */
    setTextColor(color: number): void;

    /**
     * Return the current background colour. This is used when {@link Redirect.write writing text}
     * and {@link clear clearing} the terminal.
     *
     * @returns The current background colour.
     * @see {@link colors} For a list of colour constants, returned by this function.
     * @since 1.74
     */
    getBackgroundColour(): number;

    /**
     * Return the current background color. This is used when {@link Redirect.write writing text}
     * and {@link clear clearing} the terminal.
     *
     * @returns The current background color.
     * @see {@link colors} For a list of color constants, returned by this function.
     * @since 1.74
     */
    getBackgroundColor(): number;

    /**
     * Set the current background colour. This is used when {@link Redirect.write writing text} and
     * {@link clear clearing} the terminal.
     *
     * @param colour The new background colour.
     * @see {@link colors} For a list of colour constants.
     * @since 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colours, being changed to grayscale on
     *          screen.
     */
    setBackgroundColour(colour: number): void;

    /**
     * Set the current background color. This is used when {@link Redirect.write writing text} and
     * {@link clear clearing} the terminal.
     *
     * @param color The new background color.
     * @see {@link colors} For a list of color constants.
     * @since 1.45
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being changed to grayscale on
     *          screen.
     */
    setBackgroundColor(color: number): void;

    /**
     * Determine if this terminal supports colour.
     *
     * Terminals which do not support colour will still allow writing coloured text/backgrounds, but
     * it will be displayed in greyscale.
     *
     * @returns Whether this terminal supports colour.
     * @since 1.45
     */
    isColour(): boolean;

    /**
     * Determine if this terminal supports color.
     *
     * Terminals which do not support color will still allow writing colored text/backgrounds, but
     * it will be displayed in greyscale.
     *
     * @returns Whether this terminal supports color.
     * @since 1.45
     */
    isColor(): boolean;

    /**
     * Writes `text` to the terminal with the specific foreground and background characters.
     *
     * As with {@link Redirect.write write}, the text will be written at the current cursor
     * location, with the cursor moving to the end of the text.
     *
     * `textColor` and `backgroundColor` must both be strings the same length as `text`. All
     * characters represent a single hexadecimal digit, which is converted to one of CC's colors.
     * For instance, `"a"` corresponds to purple.
     *
     * @param text The text to write.
     * @param textColor The corresponding text colors.
     * @param backgroundColor The corresponding background colors.
     * @throws If the three inputs are not the same length.
     * @see {@link colors} For a list of color constants, and their hexadecimal values.
     * @since 1.74
     * @changed 1.80pr1 Standard computers can now use all 16 colors, being changed to grayscale on
     *          screen.
     * @example
     *     // Prints "Hello, world!" in rainbow text.
     *     term.blit("Hello, world!", "01234456789ab", "0000000000000");
     */
    blit(text: string, textColor: string, backgroundColor: string): void;

    /**
     * Set the palette for a specific colour.
     *
     * ComputerCraft's palette system allows you to change how a specific colour should be
     * displayed. For instance, you can make {@link colours.red} _more red_ by setting its palette
     * to #FF0000. This does now allow you to draw more colours - you are still limited to 16 on the
     * screen at one time - but you can change _which_ colours are used.
     *
     * @param index The colour whose palette should be changed.
     * @param colour A 24-bit integer representing the RGB value of the colour. For instance the
     *               integer `0xFF0000` corresponds to the colour #FF0000.
     * @param index The colour whose palette should be changed.
     * @param r The intensity of the red channel, between 0 and 1.
     * @param g The intensity of the green channel, between 0 and 1.
     * @param b The intensity of the blue channel, between 0 and 1.
     * @example
     *     // Change the red colour from the default #CC4C4C to #FF0000.
     *     term.setPaletteColour(colours.red, 0xFF0000);
     *     term.setTextColour(colours.red);
     *     print("Hello, world!");
     * @example
     *     // As above, but specifying each colour channel separately.
     *     term.setPaletteColour(colours.red, 1, 0, 0);
     *     term.setTextColour(colours.red);
     *     print("Hello, world!");
     * @see {@link colours.unpackRGB} To convert from the 24-bit format to three separate channels.
     * @see {@link colours.packRGB} To convert from three separate channels to the 24-bit format.
     * @since 1.80pr1
     */
    setPaletteColour(index: number, colour: number): void;
    setPaletteColour(index: number, r: number, g: number, b: number): void;

    /**
     * Set the palette for a specific color.
     *
     * ComputerCraft's palette system allows you to change how a specific color should be displayed.
     * For instance, you can make {@link colors.red} _more red_ by setting its palette to #FF0000.
     * This does now allow you to draw more colors - you are still limited to 16 on the screen at
     * one time - but you can change _which_ colors are used.
     *
     * @param index The color whose palette should be changed.
     * @param color A 24-bit integer representing the RGB value of the color. For instance the
     *              integer `0xFF0000` corresponds to the color #FF0000.
     * @param index The color whose palette should be changed.
     * @param r The intensity of the red channel, between 0 and 1.
     * @param g The intensity of the green channel, between 0 and 1.
     * @param b The intensity of the blue channel, between 0 and 1.
     * @example
     *     // Change the red color from the default #CC4C4C to #FF0000.
     *     term.setPaletteColor(colors.red, 0xFF0000);
     *     term.setTextColor(colors.red);
     *     print("Hello, world!");
     * @example
     *     // As above, but specifying each color channel separately.
     *     term.setPaletteColor(colors.red, 1, 0, 0);
     *     term.setTextColor(colors.red);
     *     print("Hello, world!");
     * @see {@link colors.unpackRGB} To convert from the 24-bit format to three separate channels.
     * @see {@link colors.packRGB} To convert from three separate channels to the 24-bit format.
     * @since 1.80pr1
     */
    setPaletteColor(index: number, color: number): void;
    setPaletteColor(index: number, r: number, g: number, b: number): void;

    /**
     * Get the current palette for a specific colour.
     *
     * @param colour The colour whose palette should be fetched.
     * @returns The red channel, will be between 0 and 1.
     * @returns The green channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @since 1.80pr1
     */
    getPaletteColour(colour: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Get the current palette for a specific color.
     *
     * @param color The color whose palette should be fetched.
     * @returns The red channel, will be between 0 and 1.
     * @returns The green channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @since 1.80pr1
     */
    getPaletteColor(color: number): LuaMultiReturn<[number, number, number]>;
}
