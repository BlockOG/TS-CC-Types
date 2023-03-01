/** @noSelfInFile */

// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * Methods for interacting with tanks and other fluid storage blocks.
 *
 * | API                                                          | Description                                                     |
 * | ------------------------------------------------------------ | --------------------------------------------------------------- |
 * | {@link tanks tanks()}                                        | Get all "tanks" in this fluid storage.                          |
 * | {@link pushFluid pushFluid(toName [, limit][, fluidName])}   | Move a fluid from one fluid container to another connected one. |
 * | {@link pullFluid pullFluid(fromName [, limit][, fluidName])} | Move a fluid from a connected fluid container into this one.    |
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface FluidPeripheral extends AnyPeripheral {
    /**
     * Get all "tanks" in this fluid storage.
     *
     * Each tank either contains some amount of fluid or is empty. Tanks with fluids inside will
     * return some basic information about the fluid, including its name and amount.
     *
     * The returned table is sparse, and so empty tanks will be `null` - it is recommended to loop
     * over using `pairs` rather than `ipairs`.
     *
     * @returns All tanks in this fluid storage.
     */
    tanks(): LuaMap<number, Tank>;

    /**
     * Move a fluid from one fluid container to another connected one.
     *
     * This allows you to pull fluid in the current fluid container to another container _on the
     * same wired network_. Both containers must attached to wired modems which are connected via a
     * cable.
     *
     * @param toName The name of the peripheral/container to push to. This is the string given to
     *               {@link peripheral.wrap}, and displayed by the wired modem.
     * @param limit The maximum amount of fluid to move.
     * @param fluidName The fluid to move. If not given, an arbitrary fluid will be chosen.
     * @returns The amount of moved fluid.
     * @throws If the peripheral to transfer to doesn't exist or isn't an fluid container.
     * @see {@link peripheral.getName} Allows you to get the name of a
     *      {@link peripheral.wrap wrapped} peripheral.
     */
    pushFluid(toName: string, limit?: number, fluidName?: string): number;

    /**
     * Move a fluid from a connected fluid container into this one.
     *
     * This allows you to pull fluid in the current fluid container from another container _on the
     * same wired network_. Both containers must attached to wired modems which are connected via a
     * cable.
     *
     * @param fromName The name of the peripheral/container to push to. This is the string given to
     *                 {@link peripheral.wrap}, and displayed by the wired modem.
     * @param limit The maximum amount of fluid to move.
     * @param fluidName The fluid to move. If not given, an arbitrary fluid will be chosen.
     * @returns The amount of moved fluid.
     * @throws If the peripheral to transfer to doesn't exist or isn't an fluid container.
     * @see {@link peripheral.getName} Allows you to get the name of a
     *      {@link peripheral.wrap wrapped} peripheral.
     */
    pullFluid(fromName: string, limit?: number, fluidName?: string): number;
}

/** Currently don't know the exact details. */
declare type Tank = Record<string, unknown> | null;
