/** @noSelfInFile */

/// <reference path="./peripherals/index.d.ts" />

/**
 * Find and control peripherals attached to this computer.
 *
 * Peripherals are blocks (or turtle and pocket computer upgrades) which can be controlled by a computer. For instance,
 * the {@link SpeakerPeripheral speaker} peripheral allows a computer to play music and the
 * {@link MonitorPeripheral monitor} peripheral allows you to display text in the world.
 *
 * ### Referencing peripherals
 *
 * Computers can interact with adjacent peripherals. Each peripheral is given a name based on which direction it is in.
 * For instance, a disk drive below your computer will be called `"bottom"` in your Lua code, one to the left called
 * `"left"` , and so on for all 6 directions (`"bottom"`, `"top"`, `"left"`, `"right"`, `"front"`, `"back"`).
 *
 * You can list the names of all peripherals with the `peripherals` program, or the {@link peripheral.getNames} function.
 *
 * It's also possible to use peripherals which are further away from your computer through the use of
 * {@link ModemPeripheral Wired Modems}. Place one modem against your computer (you may need to sneak and right click),
 * run Networking Cable to your peripheral, and then place another modem against that block. You can then right click
 * the modem to use (or _attach_) the peripheral. This will print a peripheral name to chat, which can then be used just
 * like a direction name to access the peripheral. You can click on the message to copy the name to your clipboard.
 *
 * ### Using peripherals
 *
 * Once you have the name of a peripheral, you can call functions on it using the {@link peripheral.call} function. This
 * takes the name of our peripheral, the name of the function we want to call, and then its arguments.
 *
 * #### INFO
 *
 * Some bits of the peripheral API call peripheral functions _methods_ instead (for example, the
 * {@link peripheral.getMethods} function). Don't worry, they're the same thing!
 *
 * Let's say we have a monitor above our computer (and so "top") and want to
 * {@link MonitorPeripheral.write write some text to it}. We'd write the following:
 *
 * ```ts
 * peripheral.call("top", "write", "This is displayed on a monitor!");
 * ```
 *
 * Once you start calling making a couple of peripheral calls this can get very repetitive, and so we can
 * {@link peripheral.wrap wrap} a peripheral. This builds a table of all the peripheral's functions so you can use it
 * like an API or module.
 *
 * For instance, we could have written the above example as follows:
 *
 * ```ts
 * let my_monitor = peripheral.wrap("top");
 * my_monitor.write("This is displayed on a monitor!");
 * ```
 *
 * ### Finding peripherals
 *
 * Sometimes when you're writing a program you don't care what a peripheral is called, you just need to know it's there.
 * For instance, if you're writing a music player, you just need a speaker - it doesn't matter if it's above or below
 * the computer.
 *
 * Thankfully there's a quick way to do this: {@link peripheral.find}. This takes a peripheral type* and returns all the
 * attached peripherals which are of this type.
 *
 * What is a peripheral type though? This is a string which describes what a peripheral is, and so what functions are
 * available on it. For instance, speakers are just called `"speaker"`, and monitors `"monitor"`. Some peripherals might
 * have more than one type - a Minecraft chest is both a `"minecraft:chest"` and `"inventory"`.
 *
 * You can get all the types a peripheral has with {@link peripheral.getType}, and check a peripheral is a specific type
 * with {@link peripheral.hasType}.
 *
 * To return to our original example, let's use {@link peripheral.find} to find an attached speaker:
 *
 * ```ts
 * let speaker = peripheral.find<SpeakerPeripheral>("speaker");
 * speaker.playNote("harp");
 * ```
 *
 * | API                                                  | Description                                                                  |
 * | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
 * | {@link getNames getNames()}                          | Provides a list of all peripherals available.                                |
 * | {@link isPresent isPresent(name)}                    | Determines if a peripheral is present with the given name.                   |
 * | {@link getType getType(peripheral)}                  | Get the types of a named or wrapped peripheral.                              |
 * | {@link hasType hasType(peripheral, peripheral_type)} | Check if a peripheral is of a particular type.                               |
 * | {@link getMethods getMethods(name)}                  | Get all available methods for the peripheral with the given name.            |
 * | {@link getName getName(peripheral)}                  | Get the name of a peripheral wrapped with `peripheral.wrap`.                 |
 * | {@link call call(name, method, ...)}                 | Call a method on the peripheral with the given name.                         |
 * | {@link wrap wrap(name)}                              | Get a table containing all functions available on a peripheral.              |
 * | {@link find find(ty [, filter])}                     | Find all peripherals of a specific type, and return the wrapped peripherals. |
 *
 * @since 1.3
 * @changed 1.51 Add support for wired modems.
 * @changed 1.99 Peripherals can have multiple types.
 * @see {@link https://tweaked.cc/event/peripheral.html peripheral} This event is fired whenever a new peripheral is attached.
 * @see {@link https://tweaked.cc/event/peripheral_detach.html peripheral_detach} This event is fired whenever a peripheral is detached.
 */
declare namespace peripheral {
    /**
     * Provides a list of all peripherals available.
     *
     * If a device is located directly next to the system, then its name will be listed as the side it is attached to.
     * If a device is attached via a Wired Modem, then it'll be reported according to its name on the wired network.
     *
     * @since 1.51
     * @returns A list of the names of all attached peripherals.
     */
    function getNames(): string[];

    /**
     * Determines if a peripheral is present with the given name.
     *
     * @example
     *     peripheral.isPresent("top");
     *
     * @example
     *     peripheral.isPresent("monitor_0");
     *
     * @param name The side or network name that you want to check.
     * @returns If a peripheral is present with the given name.
     */
    function isPresent(name: string): boolean;

    /**
     * Get the types of a named or wrapped peripheral.
     *
     * @example
     *     // Get the type of a peripheral above this computer.
     *     peripheral.getType("top");
     *
     * @param peripheral The name of the peripheral to find, or a wrapped peripheral instance.
     * @returns The peripheral's types, or `undefined` if it is not present.
     * @changed 1.88.0 Accepts a wrapped peripheral as an argument.
     * @changed 1.99 Now returns multiple types.
     */
    function getType(peripheral: string | Peripheral): string[] | undefined;

    /**
     * Check if a peripheral is of a particular type.
     *
     * @since 1.99
     * @param peripheral The name of the peripheral or a wrapped peripheral instance.
     * @param peripheral_type The type to check.
     * @returns If a peripheral has a particular type, or `undefined` if it is not present.
     */
    function hasType(peripheral: string | Peripheral, peripheral_type: string): boolean | undefined;

    /**
     * Get all available methods for the peripheral with the given name.
     *
     * @param name The name of the peripheral to find.
     * @returns A list of methods provided by this peripheral, or `undefined` if it is not present.
     */
    function getMethods(name: string): string[] | undefined;

    /**
     * Get the name of a peripheral wrapped with {@link peripheral.wrap}.
     *
     * @since 1.88.0
     * @param peripheral The peripheral to get the name of.
     * @returns The name of the given peripheral.
     */
    function getName(peripheral: Peripheral): string;

    /**
     * Call a method on the peripheral with the given name.
     *
     * @example
     *     // Open the modem on the top of this computer.
     *     peripheral.call("top", "open", 1);
     *
     * @param name The name of the peripheral to invoke the method on.
     * @param method The name of the method
     * @param ...args Additional arguments to pass to the method
     * @returns The return values of the peripheral method.
     */
    function call(name: string, method: string, ...args: any[]): any[];

    /**
     * Get a table containing all functions available on a peripheral. These can then be called instead of using
     * {@link peripheral.call} every time.
     *
     * @example
     *     // Open the modem on the top of this computer.
     *     let modem = peripheral.wrap<ModemPeripheral>("top");
     *     modem.open(1);
     *
     * @param name The name of the peripheral to wrap.
     * @returns The table containing the peripheral's methods, or `undefined` if there is no peripheral present with the
     *   given name.
     */
    function wrap<T extends Peripheral>(name: string): T | undefined;

    /**
     * Find all peripherals of a specific type, and return the {@link peripheral.wrap wrapped} peripherals.
     *
     * @since 1.6
     * @example
     *     // Find all wireless modems connected to this computer.
     *     let modems = peripheral.find<ModemPeripheral>("modem", (name, modem) => modem.isWireless()); // Check this modem is wireless.
     *
     * @example
     *     // This abuses the `filter` argument to call `rednet.open` on every modem.
     *     peripheral.find("modem", rednet.open);
     *
     * @example
     *     // Find all monitors and store them in a table, writing "Hello" on each one.
     *     let monitors = peripheral.find<MonitorPeripheral>("monitor");
     *     for (const monitor of monitors) {
     *         monitor.write("Hello");
     *     }
     *
     * @param ty The type of peripheral to look for.
     * @param [filter] A filter function, which takes the peripheral's name and wrapped table and returns if it should
     *   be included in the result.
     * @returns 0 or more wrapped peripherals matching the given filters.
     */
    function find<T extends Peripheral>(
        ty: string,
        filter?: (name: string, peripheral: T) => boolean,
    ): LuaMultiReturn<T[]>;
}

/** @noSelf */
declare interface Peripheral {}
