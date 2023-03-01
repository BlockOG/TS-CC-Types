/** @noSelfInFile */

/**
 * Methods for interacting with blocks using Forge's energy storage system.
 *
 * This works with energy storage blocks, as well as generators and machines which consume energy.
 *
 * #### NOTE
 *
 * Due to limitations with Forge's energy API, it is not possible to measure throughput (i.e. FE
 * used/generated per tick).
 *
 * | API                                           | Description                                            |
 * | --------------------------------------------- | ------------------------------------------------------ |
 * | {@link getEnergy getEnergy()}                 | Get the energy of this block.                          |
 * | {@link getEnergyCapacity getEnergyCapacity()} | Get the maximum amount of energy this block can store. |
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface EnergyPeripheral extends AnyPeripheral {
    /**
     * Get the energy of this block.
     *
     * @returns The energy stored in this block, in FE.
     */
    getEnergy(): number;

    /**
     * Get the maximum amount of energy this block can store.
     *
     * @returns The energy capacity of this block.
     */
    getEnergyCapacity(): number;
}
