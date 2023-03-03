/** @noSelfInFile */

/**
 * Monitors are a block which act as a terminal, displaying information on one side. This allows
 * them to be read and interacted with in-world without opening a GUI.
 *
 * Monitors act as {@link term.Redirect terminal redirects} and so expose the same methods, as well
 * as several additional ones, which are documented below.
 *
 * Like computers, monitors come in both normal (no color) and advanced (color) varieties.
 *
 * | API                                                     | Description                                                                               |
 * | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
 * | {@link setTextScale setTextScale(scale)}                | Set the scale of this monitor.                                                            |
 * | {@link getTextScale getTextScale()}                     | Get the monitor's current text scale.                                                     |
 * | {@link MonitorPeripheral.write write(text)}             | Write text at the current cursor position, moving the cursor to the end of the text.      |
 * | {@link scroll scroll(y)}                                | Move all positions up (or down) by y pixels.                                              |
 * | {@link getCursorPos getCursorPos()}                     | Get the position of the cursor.                                                           |
 * | {@link setCursorPos setCursorPos(x, y)}                 | Set the position of the cursor.                                                           |
 * | {@link getCursorBlink getCursorBlink()}                 | Checks if the cursor is currently blinking.                                               |
 * | {@link setCursorBlink setCursorBlink(blink)}            | Sets whether the cursor should be visible (and blinking) at the current cursor position.  |
 * | {@link getSize getSize()}                               | Get the size of the terminal.                                                             |
 * | {@link clear clear()}                                   | Clears the terminal, filling it with the current background color.                        |
 * | {@link clearLine clearLine()}                           | Clears the line the cursor is currently on, filling it with the current background color. |
 * | {@link getTextColour getTextColour()}                   | Return the colour that new text will be written as.                                       |
 * | {@link getTextColor getTextColor()}                     | Return the colour that new text will be written as.                                       |
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
 *
 * @example
 *     // Write "Hello, world!" to an adjacent monitor:
 *     const monitor = peripheral.find<MonitorPeripheral>("monitor");
 *     monitor.setCursorPos(1, 1);
 *     monitor.write("Hello, world!");
 */
declare interface MonitorPeripheral extends AnyPeripheral, Redirect {
    /**
     * Set the scale of this monitor. A larger scale will result in the monitor having a lower
     * resolution, but display text much larger.
     *
     * @param scale The monitor's scale. This must be a multiple of 0.5 between 0.5 and 5.
     * @throws If the scale is out of range.
     * @see {@link getTextScale}
     */
    setTextScale(scale: number): void;

    /**
     * Get the monitor's current text scale.
     *
     * @returns The monitor's current scale.
     * @throws If the monitor cannot be found.
     * @since 1.81.0
     */
    getTextScale(): number;
}
