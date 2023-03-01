/** @noSelfInFile */

/**
 * The printer peripheral allows pages and books to be printed.
 *
 * | API                                        | Description                                                        |
 * | ------------------------------------------ | ------------------------------------------------------------------ |
 * | {@link write write(...)}                   | Writes text to the current page.                                   |
 * | {@link getCursorPos getCursorPos()}        | Returns the current position of the cursor on the page.            |
 * | {@link setCursorPos setCursorPos(x, y)}    | Sets the position of the cursor on the page.                       |
 * | {@link getPageSize getPageSize()}          | Returns the size of the current page.                              |
 * | {@link newPage newPage()}                  | Starts printing a new page.                                        |
 * | {@link endPage endPage()}                  | Finalizes printing of the current page and outputs it to the tray. |
 * | {@link setPageTitle setPageTitle([title])} | Sets the title of the current page.                                |
 * | {@link getInkLevel getInkLevel()}          | Returns the amount of ink left in the printer.                     |
 * | {@link getPaperLevel getPaperLevel()}      | Returns the amount of paper left in the printer.                   |
 *
 * @noSelf
 */
declare interface PrinterPeripheral extends AnyPeripheral {
    /**
     * Writes text to the current page.
     *
     * @param text The values to write to the page.
     * @throws If any values couldn't be converted to a string, or if no page is started.
     */
    write(...text: Array<string | number>): void;

    /**
     * Returns the current position of the cursor on the page.
     *
     * @returns The X position of the cursor.
     * @returns The Y position of the cursor.
     * @throws If a page isn't being printed.
     */
    getCursorPos(): LuaMultiReturn<[number, number]>;

    /**
     * Sets the position of the cursor on the page.
     *
     * @param x The X coordinate to set the cursor at.
     * @param y The Y coordinate to set the cursor at.
     * @throws If a page isn't being printed.
     */
    setCursorPos(x: number, y: number): void;

    /**
     * Returns the size of the current page.
     *
     * @returns The width of the page.
     * @returns The height of the page.
     * @throws If a page isn't being printed.
     */
    getPageSize(): LuaMultiReturn<[number, number]>;

    /**
     * Starts printing a new page.
     *
     * @returns Whether a new page could be started.
     */
    newPage(): boolean;

    /**
     * Finalizes printing of the current page and outputs it to the tray.
     *
     * @returns Whether the page could be successfully finished.
     * @throws If a page isn't being printed.
     */
    endPage(): boolean;

    /**
     * Sets the title of the current page.
     *
     * @param [title] The title to set.
     * @throws If a page isn't being printed.
     */
    setPageTitle(title?: string): void;

    /**
     * Returns the amount of ink left in the printer.
     *
     * @returns The amount of ink available to print with.
     */
    getInkLevel(): number;

    /**
     * Returns the amount of paper left in the printer.
     *
     * @returns The amount of paper available to print with.
     */
    getPaperLevel(): number;
}
