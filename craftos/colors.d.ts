/**
 * Constants and functions for color values, suitable for working with `term` and `redstone`.
 *
 * This is useful in conjunction with Bundled Cables from mods like Project Red, and colors on Advanced Computers and
 * Advanced Monitors.
 *
 * For the non-American English version just replace `colors` with `colours`. This alternative API is exactly the same,
 * except the colours use British English (e.g. `colors.gray` is spelt `colours.grey`).
 *
 * On basic terminals (such as the Computer and Monitor), all the colors are converted to grayscale. This means you can
 * still use all 16 colors on the screen, but they will appear as the nearest tint of gray. You can check if a terminal
 * supports color by using the function `term.isColor`.
 *
 * Grayscale colors are calculated by taking the average of the three components, i.e. `(red + green + blue) / 3`.
 *
 * | Function             | Description                                                                                         |
 * | -------------------- | --------------------------------------------------------------------------------------------------- |
 * | white = 0x1          | White: Written as `0` in paint files and `term.blit`, has a default terminal color of #F0F0F0.      |
 * | orange = 0x2         | Orange: Written as `1` in paint files and `term.blit`, has a default terminal color of #F2B233.     |
 * | magenta = 0x4        | Magenta: Written as `2` in paint files and `term.blit`, has a default terminal color of #E57FD8.    |
 * | lightBlue = 0x8      | Light Blue: Written as `3` in paint files and `term.blit`, has a default terminal color of #99B2F2. |
 * | yellow = 0x10        | Yellow: Written as `4` in paint files and `term.blit`, has a default terminal color of #DEDE6C.     |
 * | lime = 0x20          | Lime: Written as `5` in paint files and `term.blit`, has a default terminal color of #7FCC19.       |
 * | pink = 0x40          | Pink: Written as `6` in paint files and `term.blit`, has a default terminal color of #F2B2CC.       |
 * | gray = 0x80          | Gray: Written as `7` in paint files and `term.blit`, has a default terminal color of #4C4C4C.       |
 * | lightGray = 0x100    | Light Gray: Written as `8` in paint files and `term.blit`, has a default terminal color of #999999. |
 * | cyan = 0x200         | Cyan: Written as `9` in paint files and `term.blit`, has a default terminal color of #4C99B2.       |
 * | purple = 0x400       | Purple: Written as `a` in paint files and `term.blit`, has a default terminal color of #B266E5.     |
 * | blue = 0x800         | Blue: Written as `b` in paint files and `term.blit`, has a default terminal color of #3366CC.       |
 * | brown = 0x1000       | Brown: Written as `c` in paint files and `term.blit`, has a default terminal color of #7F664C.      |
 * | green = 0x2000       | Green: Written as `d` in paint files and `term.blit`, has a default terminal color of #57A64E.      |
 * | red = 0x4000         | Red: Written as `e` in paint files and `term.blit`, has a default terminal color of #CC4C4C.        |
 * | black = 0x8000       | Black: Written as `f` in paint files and `term.blit`, has a default terminal color of #111111.      |
 * | combine(...)         | Combines a set of colors (or sets of colors) into a larger set.                                     |
 * | subtract(color, ...) | Removes one or more colors (or sets of colors) from an initial set.                                 |
 * | test(colors, color)  | Tests whether `color` is contained within `colors`.                                                 |
 * | packRGB(r, g, b)     | Combine a three-color RGB value into one hexadecimal representation.                                |
 * | unpackRGB(rgb)       | Separate a hexadecimal RGB color into its three constituent channels.                               |
 * | rgb8(...)            | Either calls `colors.packRGB` or `colors.unpackRGB`, depending on how many arguments it receives.   |
 *
 * @see colours
 */
declare namespace colors {
    /** White: Written as `0` in paint files and `term.blit`, has a default terminal color of #F0F0F0. */
    const white: number;
    /** Orange: Written as `1` in paint files and `term.blit`, has a default terminal color of #F2B233. */
    const orange: number;
    /** Magenta: Written as `2` in paint files and `term.blit`, has a default terminal color of #E57FD8. */
    const magenta: number;
    /** Light Blue: Written as `3` in paint files and `term.blit`, has a default terminal color of #99B2F2. */
    const lightBlue: number;
    /** Yellow: Written as `4` in paint files and `term.blit`, has a default terminal color of #DEDE6C. */
    const yellow: number;
    /** Lime: Written as `5` in paint files and `term.blit`, has a default terminal color of #7FCC19. */
    const lime: number;
    /** Pink: Written as `6` in paint files and `term.blit`, has a default terminal color of #F2B2CC. */
    const pink: number;
    /** Gray: Written as `7` in paint files and `term.blit`, has a default terminal color of #4C4C4C. */
    const gray: number;
    /** Light Gray: Written as `8` in paint files and `term.blit`, has a default terminal color of #999999. */
    const lightGray: number;
    /** Cyan: Written as `9` in paint files and `term.blit`, has a default terminal color of #4C99B2. */
    const cyan: number;
    /** Purple: Written as `a` in paint files and `term.blit`, has a default terminal color of #B266E5. */
    const purple: number;
    /** Blue: Written as `b` in paint files and `term.blit`, has a default terminal color of #3366CC. */
    const blue: number;
    /** Brown: Written as `c` in paint files and `term.blit`, has a default terminal color of #7F664C. */
    const brown: number;
    /** Green: Written as `d` in paint files and `term.blit`, has a default terminal color of #57A64E. */
    const green: number;
    /** Red: Written as `e` in paint files and `term.blit`, has a default terminal color of #CC4C4C. */
    const red: number;
    /** Black: Written as `f` in paint files and `term.blit`, has a default terminal color of #111111. */
    const black: number;

    /**
     * Combines a set of colors (or sets of colors) into a larger set. Useful for Bundled Cables.
     *
     * @since 1.2
     * @example
     *     colors.combine(colors.white, colors.magenta, colors.lightBlue);
     *     // => 13
     *
     * @param ...colors The colors to combine.
     * @returns The union of the color sets given in `...colors`
     */
    function combine(...colors: number[]): number;

    /**
     * Removes one or more colors (or sets of colors) from an initial set. Useful for Bundled Cables.
     *
     * Each parameter beyond the first may be a single color or may be a set of colors (in the latter case, all colors
     * in the set are removed from the original set).
     *
     * @since 1.2
     * @example
     *     colors.subtract(colors.lime, colors.orange, colors.white);
     *     // => 32
     *
     * @param colors The color from which to subtract.
     * @param ...colors The colors to subtract.
     * @returns The resulting color.
     */
    function subtract(color: number, ...colors: number[]): number;

    /**
     * Tests whether `color` is contained within `colors`. Useful for Bundled Cables.
     *
     * @since 1.2
     * @example
     *     colors.test(colors.combine(colors.white, colors.magenta, colors.lightBlue), colors.lightBlue);
     *     // => true
     *
     * @param colors A color, or color set
     * @param color A color or set of colors that `colors` should contain.
     * @returns If `colors` contains all colors within `color`.
     */
    function test(colors: number, color: number): boolean;

    /**
     * Combine a three-colour RGB value into one hexadecimal representation.
     *
     * @since 1.81.0
     * @example
     *     colors.packRGB(0.7, 0.2, 0.6);
     *     // => 0xb23399
     *
     * @param r The red channel, should be between 0 and 1.
     * @param g The red channel, should be between 0 and 1.
     * @param b The blue channel, should be between 0 and 1.
     * @returns The combined hexadecimal colour.
     */
    function packRGB(r: number, g: number, b: number): number;

    /**
     * Separate a hexadecimal RGB colour into its three constituent channels.
     *
     * @since 1.81.0
     * @example
     *     colors.unpackRGB(0xb23399);
     *     // => 0.7, 0.2, 0.6
     *
     * @param rgb The combined hexadecimal colour.
     * @returns The red channel, will be between 0 and 1.
     * @returns The red channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @see colors.packRGB
     */
    function unpackRGB(rgb: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Either calls `colors.packRGB` or `colors.unpackRGB`, depending on how many arguments it receives.
     *
     * @deprecated Use `packRGB` or `unpackRGB` directly.
     * @since 1.80pr1
     * @example
     *     colors.rgb8(0xb23399);
     *     // => 0.7, 0.2, 0.6
     *
     * @example
     *     colors.rgb8(0.7, 0.2, 0.6);
     *     // => 0xb23399
     *
     * @param r The red channel, as an argument to `colors.packRGB`. OR The combined hexadecimal color, as an argument
     *   to `colors.unpackRGB`.
     * @param g The green channel, as an argument to `colors.packRGB`. OR `undefined`
     * @param b The blue channel, as an argument to `colors.packRGB`. OR `undefined`
     * @returns The combined hexadecimal colour, as returned by `colors.packRGB`. OR The red channel, as returned by
     *   `colors.unpackRGB`.
     * @returns `undefined` OR The green channel, as returned by `colors.unpackRGB`.
     * @returns `undefined` OR The blue channel, as returned by `colors.unpackRGB`.
     * @changed 1.81.0 Deprecated in favor of `colors.packRGB` or `colors.unpackRGB`.
     */
    function rgb8(r: number, g?: number, b?: number): LuaMultiReturn<[number, number?, number?]>;

    /**
     * Converts the given color to a paint/blit hex character (0-9a-f).
     *
     * This is equivalent to converting `floor(log_2(color))` to hexadecimal.
     *
     * @since 1.94.0
     * @param color The color to convert.
     * @returns The blit hex code of the color.
     */
    function toBlit(color: number): string;
}
