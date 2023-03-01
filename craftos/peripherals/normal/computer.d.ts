/** @noSelfInFile */

/**
 * A computer or turtle wrapped as a peripheral.
 *
 * This allows for basic interaction with adjacent computers. Computers wrapped as peripherals will
 * have the type `computer` while turtles will be `turtle`.
 *
 * | API                         | Description                            |
 * | --------------------------- | -------------------------------------- |
 * | {@link turnOn turnOn()}     | Turn the other computer on.            |
 * | {@link shutdown shutdown()} | Shutdown the other computer.           |
 * | {@link reboot reboot()}     | Reboot or turn on the other computer.  |
 * | {@link getID getID()}       | Get the other computer's ID.           |
 * | {@link isOn isOn()}         | Determine if the other computer is on. |
 * | {@link getLabel getLabel()} | Get the other computer's label.        |
 *
 * @noSelf
 */
declare interface ComputerPeripheral extends AnyPeripheral {
    /** Turn the other computer on. */
    turnOn(): void;

    /** Shutdown the other computer. */
    shutdown(): void;

    /** Reboot or turn on the other computer. */
    reboot(): void;

    /**
     * Get the other computer's ID.
     *
     * @returns The computer's ID.
     * @see {@link os.getComputerID} To get your computer's ID.
     */
    getID(): number;

    /**
     * Determine if the other computer is on.
     *
     * @returns If the computer is on.
     */
    isOn(): boolean;

    /**
     * Get the other computer's label.
     *
     * @returns The computer's label.
     * @see {@link os.getComputerLabel} To get your label.
     */
    getLabel(): string | undefined;
}
