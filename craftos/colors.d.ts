/** @noSelfInFile */

/**
 * Constants and functions for color values, suitable for working with {@link term} and
 * {@link redstone}.
 *
 * This is useful in conjunction with {@link redstone.setBundledOutput Bundled Cables} from mods
 * like Project Red, and
 * {@link term.setTextColor colors on Advanced Computers and Advanced Monitors}.
 *
 * For the non-American English version just replace {@link colors} with {@link colours}. This
 * alternative API is exactly the same, except the colours use British English (e.g.
 * {@link colors.gray} is spelt {@link colours.grey}).
 *
 * On basic terminals (such as the Computer and Monitor), all the colors are converted to grayscale.
 * This means you can still use all 16 colors on the screen, but they will appear as the nearest
 * tint of gray. You can check if a terminal supports color by using the function
 * {@link term.isColor}.
 *
 * Grayscale colors are calculated by taking the average of the three components, i.e. `(red + green
 * + blue) / 3`.
 *
 * | API                                   | Description                                                                                                   |
 * | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
 * | {@link white white = 0x1}             | White: Written as `0` in paint files and {@link term.blit}, has a default terminal color of #F0F0F0.          |
 * | {@link orange orange = 0x2}           | Orange: Written as `1` in paint files and {@link term.blit}, has a default terminal color of #F2B233.         |
 * | {@link magenta magenta = 0x4}         | Magenta: Written as `2` in paint files and {@link term.blit}, has a default terminal color of #E57FD8.        |
 * | {@link lightBlue lightBlue = 0x8}     | Light Blue: Written as `3` in paint files and {@link term.blit}, has a default terminal color of #99B2F2.     |
 * | {@link yellow yellow = 0x10}          | Yellow: Written as `4` in paint files and {@link term.blit}, has a default terminal color of #DEDE6C.         |
 * | {@link lime lime = 0x20}              | Lime: Written as `5` in paint files and {@link term.blit}, has a default terminal color of #7FCC19.           |
 * | {@link pink pink = 0x40}              | Pink: Written as `6` in paint files and {@link term.blit}, has a default terminal color of #F2B2CC.           |
 * | {@link gray gray = 0x80}              | Gray: Written as `7` in paint files and {@link term.blit}, has a default terminal color of #4C4C4C.           |
 * | {@link lightGray lightGray = 0x100}   | Light Gray: Written as `8` in paint files and {@link term.blit}, has a default terminal color of #999999.     |
 * | {@link cyan cyan = 0x200}             | Cyan: Written as `9` in paint files and {@link term.blit}, has a default terminal color of #4C99B2.           |
 * | {@link purple purple = 0x400}         | Purple: Written as `a` in paint files and {@link term.blit}, has a default terminal color of #B266E5.         |
 * | {@link blue blue = 0x800}             | Blue: Written as `b` in paint files and {@link term.blit}, has a default terminal color of #3366CC.           |
 * | {@link brown brown = 0x1000}          | Brown: Written as `c` in paint files and {@link term.blit}, has a default terminal color of #7F664C.          |
 * | {@link green green = 0x2000}          | Green: Written as `d` in paint files and {@link term.blit}, has a default terminal color of #57A64E.          |
 * | {@link red red = 0x4000}              | Red: Written as `e` in paint files and {@link term.blit}, has a default terminal color of #CC4C4C.            |
 * | {@link black black = 0x8000}          | Black: Written as `f` in paint files and {@link term.blit}, has a default terminal color of #111111.          |
 * | {@link combine combine(...)}          | Combines a set of colors (or sets of colors) into a larger set.                                               |
 * | {@link subtract subtract(color, ...)} | Removes one or more colors (or sets of colors) from an initial set.                                           |
 * | {@link test test(colors, color)}      | Tests whether `color` is contained within `colors`.                                                           |
 * | {@link packRGB packRGB(r, g, b)}      | Combine a three-color RGB value into one hexadecimal representation.                                          |
 * | {@link unpackRGB unpackRGB(rgb)}      | Separate a hexadecimal RGB color into its three constituent channels.                                         |
 * | {@link rgb8 ~~rgb8(...)~~}            | Either calls {@link colors.packRGB} or {@link colors.unpackRGB}, depending on how many arguments it receives. |
 *
 * @see {@link colours}
 * @noSelf
 */
declare interface Colors {
    /**
     * White: Written as `0` in paint files and {@link term.blit}, has a default terminal color of
     * #F0F0F0.
     */
    white: number;
    /**
     * Orange: Written as `1` in paint files and {@link term.blit}, has a default terminal color of
     * #F2B233.
     */
    orange: number;
    /**
     * Magenta: Written as `2` in paint files and {@link term.blit}, has a default terminal color of
     * #E57FD8.
     */
    magenta: number;
    /**
     * Light Blue: Written as `3` in paint files and {@link term.blit}, has a default terminal color
     * of #99B2F2.
     */
    lightBlue: number;
    /**
     * Yellow: Written as `4` in paint files and {@link term.blit}, has a default terminal color of
     * #DEDE6C.
     */
    yellow: number;
    /**
     * Lime: Written as `5` in paint files and {@link term.blit}, has a default terminal color of
     * #7FCC19.
     */
    lime: number;
    /**
     * Pink: Written as `6` in paint files and {@link term.blit}, has a default terminal color of
     * #F2B2CC.
     */
    pink: number;
    /**
     * Gray: Written as `7` in paint files and {@link term.blit}, has a default terminal color of
     * #4C4C4C.
     */
    gray: number;
    /**
     * Light Gray: Written as `8` in paint files and {@link term.blit}, has a default terminal color
     * of #999999.
     */
    lightGray: number;
    /**
     * Cyan: Written as `9` in paint files and {@link term.blit}, has a default terminal color of
     * #4C99B2.
     */
    cyan: number;
    /**
     * Purple: Written as `a` in paint files and {@link term.blit}, has a default terminal color of
     * #B266E5.
     */
    purple: number;
    /**
     * Blue: Written as `b` in paint files and {@link term.blit}, has a default terminal color of
     * #3366CC.
     */
    blue: number;
    /**
     * Brown: Written as `c` in paint files and {@link term.blit}, has a default terminal color of
     * #7F664C.
     */
    brown: number;
    /**
     * Green: Written as `d` in paint files and {@link term.blit}, has a default terminal color of
     * #57A64E.
     */
    green: number;
    /**
     * Red: Written as `e` in paint files and {@link term.blit}, has a default terminal color of
     * #CC4C4C.
     */
    red: number;
    /**
     * Black: Written as `f` in paint files and {@link term.blit}, has a default terminal color of
     * #111111.
     */
    black: number;

    /**
     * Combines a set of colors (or sets of colors) into a larger set. Useful for Bundled Cables.
     *
     * @since 1.2
     * @example
     *     colors.combine(colors.white, colors.magenta, colors.lightBlue);
     *     // => 13
     * @param colors The colors to combine.
     * @returns The union of the color sets given in `...colors`.
     */
    combine(...colors: number[]): number;

    /**
     * Removes one or more colors (or sets of colors) from an initial set. Useful for Bundled
     * Cables.
     *
     * Each parameter beyond the first may be a single color or may be a set of colors (in the
     * latter case, all colors in the set are removed from the original set).
     *
     * @since 1.2
     * @example
     *     colors.subtract(colors.lime, colors.orange, colors.white);
     *     // => 32
     * @param colors The color from which to subtract.
     * @param colors The colors to subtract.
     * @returns The resulting color.
     */
    subtract(color: number, ...colors: number[]): number;

    /**
     * Tests whether `color` is contained within `colors`. Useful for Bundled Cables.
     *
     * @since 1.2
     * @example
     *     colors.test(colors.combine(colors.white, colors.magenta, colors.lightBlue), colors.lightBlue);
     *     // => true
     * @param colors A color, or color set.
     * @param color A color or set of colors that `colors` should contain.
     * @returns If `colors` contains all colors within `color`.
     */
    test(colors: number, color: number): boolean;

    /**
     * Combine a three-color RGB value into one hexadecimal representation.
     *
     * @since 1.81.0
     * @example
     *     colors.packRGB(0.7, 0.2, 0.6);
     *     // => 0xb23399
     * @param r The red channel, should be between 0 and 1.
     * @param g The red channel, should be between 0 and 1.
     * @param b The blue channel, should be between 0 and 1.
     * @returns The combined hexadecimal color.
     */
    packRGB(r: number, g: number, b: number): number;

    /**
     * Separate a hexadecimal RGB color into its three constituent channels.
     *
     * @since 1.81.0
     * @example
     *     colors.unpackRGB(0xb23399);
     *     // => 0.7, 0.2, 0.6
     * @param rgb The combined hexadecimal color.
     * @returns The red channel, will be between 0 and 1.
     * @returns The red channel, will be between 0 and 1.
     * @returns The blue channel, will be between 0 and 1.
     * @see colors.packRGB
     */
    unpackRGB(rgb: number): LuaMultiReturn<[number, number, number]>;

    /**
     * Either calls {@link colors.packRGB} or {@link colors.unpackRGB}, depending on how many
     * arguments it receives.
     *
     * @deprecated Use {@link packRGB} or {@link unpackRGB} directly.
     * @since 1.80pr1
     * @example
     *     colors.rgb8(0xb23399);
     *     // => 0.7, 0.2, 0.6
     * @example
     *     colors.rgb8(0.7, 0.2, 0.6);
     *     // => 0xb23399
     * @param r The red channel, as an argument to {@link colors.packRGB} or the combined
     *          hexadecimal color, as an argument to {@link colors.unpackRGB}.
     * @param g The green channel, as an argument to {@link colors.packRGB} or `undefined`
     * @param b The blue channel, as an argument to {@link colors.packRGB} or `undefined`
     * @returns The combined hexadecimal color, as returned by {@link colors.packRGB} or the red
     *          channel, as returned by {@link colors.unpackRGB}.
     * @returns `undefined` or the green channel, as returned by {@link colors.unpackRGB}.
     * @returns `undefined` or the blue channel, as returned by {@link colors.unpackRGB}.
     * @changed 1.81.0 Deprecated in favor of {@link colors.packRGB} or {@link colors.unpackRGB}.
     */
    rgb8(rgb: number): LuaMultiReturn<[number, number, number]>;
    rgb8(r: number, g: number, b: number): LuaMultiReturn<[number]>;

    /**
     * Converts the given color to a paint/blit hex character (0-9a-f).
     *
     * This is equivalent to converting `floor(log_2(color))` to hexadecimal.
     *
     * @since 1.94.0
     * @param color The color to convert.
     * @returns The blit hex code of the color.
     */
    toBlit(color: number): string;
}

/**
 * Constants and functions for color values, suitable for working with {@link term} and
 * {@link redstone}.
 *
 * This is useful in conjunction with {@link redstone.setBundledOutput Bundled Cables} from mods
 * like Project Red, and
 * {@link term.setTextColor colors on Advanced Computers and Advanced Monitors}.
 *
 * For the non-American English version just replace {@link colors} with {@link colours}. This
 * alternative API is exactly the same, except the colours use British English (e.g.
 * {@link colors.gray} is spelt {@link colours.grey}).
 *
 * On basic terminals (such as the Computer and Monitor), all the colors are converted to grayscale.
 * This means you can still use all 16 colors on the screen, but they will appear as the nearest
 * tint of gray. You can check if a terminal supports color by using the function
 * {@link term.isColor}.
 *
 * Grayscale colors are calculated by taking the average of the three components, i.e. `(red + green
 * + blue) / 3`.
 *
 * | API                                          | Description                                                                                                   |
 * | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
 * | {@link Colors.white white = 0x1}             | White: Written as `0` in paint files and {@link term.blit}, has a default terminal color of #F0F0F0.          |
 * | {@link Colors.orange orange = 0x2}           | Orange: Written as `1` in paint files and {@link term.blit}, has a default terminal color of #F2B233.         |
 * | {@link Colors.magenta magenta = 0x4}         | Magenta: Written as `2` in paint files and {@link term.blit}, has a default terminal color of #E57FD8.        |
 * | {@link Colors.lightBlue lightBlue = 0x8}     | Light Blue: Written as `3` in paint files and {@link term.blit}, has a default terminal color of #99B2F2.     |
 * | {@link Colors.yellow yellow = 0x10}          | Yellow: Written as `4` in paint files and {@link term.blit}, has a default terminal color of #DEDE6C.         |
 * | {@link Colors.lime lime = 0x20}              | Lime: Written as `5` in paint files and {@link term.blit}, has a default terminal color of #7FCC19.           |
 * | {@link Colors.pink pink = 0x40}              | Pink: Written as `6` in paint files and {@link term.blit}, has a default terminal color of #F2B2CC.           |
 * | {@link Colors.gray gray = 0x80}              | Gray: Written as `7` in paint files and {@link term.blit}, has a default terminal color of #4C4C4C.           |
 * | {@link Colors.lightGray lightGray = 0x100}   | Light Gray: Written as `8` in paint files and {@link term.blit}, has a default terminal color of #999999.     |
 * | {@link Colors.cyan cyan = 0x200}             | Cyan: Written as `9` in paint files and {@link term.blit}, has a default terminal color of #4C99B2.           |
 * | {@link Colors.purple purple = 0x400}         | Purple: Written as `a` in paint files and {@link term.blit}, has a default terminal color of #B266E5.         |
 * | {@link Colors.blue blue = 0x800}             | Blue: Written as `b` in paint files and {@link term.blit}, has a default terminal color of #3366CC.           |
 * | {@link Colors.brown brown = 0x1000}          | Brown: Written as `c` in paint files and {@link term.blit}, has a default terminal color of #7F664C.          |
 * | {@link Colors.green green = 0x2000}          | Green: Written as `d` in paint files and {@link term.blit}, has a default terminal color of #57A64E.          |
 * | {@link Colors.red red = 0x4000}              | Red: Written as `e` in paint files and {@link term.blit}, has a default terminal color of #CC4C4C.            |
 * | {@link Colors.black black = 0x8000}          | Black: Written as `f` in paint files and {@link term.blit}, has a default terminal color of #111111.          |
 * | {@link Colors.combine combine(...)}          | Combines a set of colors (or sets of colors) into a larger set.                                               |
 * | {@link Colors.subtract subtract(color, ...)} | Removes one or more colors (or sets of colors) from an initial set.                                           |
 * | {@link Colors.test test(colors, color)}      | Tests whether `color` is contained within `colors`.                                                           |
 * | {@link Colors.packRGB packRGB(r, g, b)}      | Combine a three-color RGB value into one hexadecimal representation.                                          |
 * | {@link Colors.unpackRGB unpackRGB(rgb)}      | Separate a hexadecimal RGB color into its three constituent channels.                                         |
 * | {@link Colors.rgb8 ~~rgb8(...)~~}            | Either calls {@link colors.packRGB} or {@link colors.unpackRGB}, depending on how many arguments it receives. |
 *
 * @see {@link colours}
 * @noSelf
 */
declare const colors: Colors;
