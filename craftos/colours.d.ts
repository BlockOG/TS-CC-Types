/** @noSelfInFile */

/**
 * An alternative version of {@link colors} for lovers of British spelling.
 *
 * | API               | Description |
 * | ----------------- | ----------- |
 * | {@link grey}      | Grey.       |
 * | {@link lightGrey} | Light grey. |
 *
 * @since 1.2
 * @see {@link colors}
 * @noSelf
 */
declare interface Colours {
    white: number;
    orange: number;
    magenta: number;
    lightBlue: number;
    yellow: number;
    lime: number;
    pink: number;
    /**
     * Grey. Written as `7` in paint files and {@link term.blit}, has a default terminal colour of
     * #4C4C4C.
     *
     * @see {@link colors.gray}
     */
    grey: number;
    /**
     * Light grey. Written as `8` in paint files and {@link term.blit}, has a default terminal
     * colour of #999999.
     *
     * @see {@link colors.lightGray}
     */
    lightGrey: number;
    cyan: number;
    purple: number;
    blue: number;
    brown: number;
    green: number;
    red: number;
    black: number;

    combine(...colors: number[]): number;
    subtract(color: number, ...colors: number[]): number;
    test(colors: number, color: number): boolean;
    packRGB(r: number, g: number, b: number): number;
    unpackRGB(rgb: number): LuaMultiReturn<[number, number, number]>;
    /** @deprecated */
    rgb8(rgb: number): LuaMultiReturn<[number, number, number]>;
    rgb8(r: number, g: number, b: number): LuaMultiReturn<[number]>;
    toBlit(color: number): string;
}

/**
 * An alternative version of {@link colors} for lovers of British spelling.
 *
 * | API               | Description |
 * | ----------------- | ----------- |
 * | {@link grey}      | Grey.       |
 * | {@link lightGrey} | Light grey. |
 *
 * @since 1.2
 * @see {@link colors}
 * @noSelf
 */
declare const colours: Colours;
