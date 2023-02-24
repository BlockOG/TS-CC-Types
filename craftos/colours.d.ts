/**
 * An alternative version of `colors` for lovers of British spelling.
 *
 * | Function  | Description |
 * | --------- | ----------- |
 * | grey      | Grey.       |
 * | lightGrey | Light grey. |
 *
 * @since 1.2
 * @see colors
 */
declare namespace colours {
    const white: number;
    const orange: number;
    const magenta: number;
    const lightBlue: number;
    const yellow: number;
    const lime: number;
    const pink: number;
    /**
     * Grey. Written as `7` in paint files and `term.blit`, has a default terminal colour of #4C4C4C.
     *
     * @see colors.gray
     */
    const grey: number;
    /**
     * Light grey. Written as `8` in paint files and `term.blit`, has a default terminal colour of #999999.
     *
     * @see colors.lightGray
     */
    const lightGrey: number;
    const cyan: number;
    const purple: number;
    const blue: number;
    const brown: number;
    const green: number;
    const red: number;
    const black: number;

    function combine(...colors: number[]): number;
    function subtract(color: number, ...colors: number[]): number;
    function test(colors: number, color: number): boolean;
    function packRGB(r: number, g: number, b: number): number;
    function unpackRGB(rgb: number): LuaMultiReturn<[number, number, number]>;
    function rgb8(r: number, g?: number, b?: number): LuaMultiReturn<[number, number?, number?]>;
    function toBlit(color: number): string;
}
