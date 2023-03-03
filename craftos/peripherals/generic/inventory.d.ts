/** @noSelfInFile */

// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * Methods for interacting with inventories.
 *
 * | API                                                                 | Description                                                       |
 * | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
 * | {@link size size()}                                                 | Get the size of this inventory.                                   |
 * | {@link list list()}                                                 | List all items in this inventory.                                 |
 * | {@link getItemDetail getItemDetail(slot)}                           | Get detailed information about an item.                           |
 * | {@link getItemLimit getItemLimit(slot)}                             | Get the maximum number of items which can be stored in this slot. |
 * | {@link pushItems pushItems(toName, fromSlot [, limit][, toSlot])}   | Push items from one inventory to another connected one.           |
 * | {@link pullItems pullItems(fromName, fromSlot [, limit][, toSlot])} | Pull items from a connected inventory into this one.              |
 *
 * @since 1.94.0
 * @noSelf
 */
declare interface InventoryPeripheral extends AnyPeripheral {
    /**
     * Get the size of this inventory.
     *
     * @returns The number of slots in this inventory.
     */
    size(): number;

    /**
     * List all items in this inventory. This returns a table, with an entry for each slot.
     *
     * Each item in the inventory is represented by a table containing some basic information, much
     * like {@link turtle.getItemDetail} includes. More information can be fetched with
     * {@link getItemDetail}. The table contains the item `name`, the `count` and an a (potentially
     * undefined) hash of the item's `nbt`. This NBT data doesn't contain anything useful, but
     * allows you to distinguish identical items.
     *
     * The returned table is sparse, and so empty slots will be `undefined` - it is recommended to
     * loop over using `pairs` rather than `ipairs`.
     *
     * @example
     *     // Find an adjacent chest and print all items in it.
     *     const chest = peripheral.find<InventoryPeripheral>("minecraft:chest")[0];
     *     if (chest === undefined) {
     *         throw "No chest";
     *     }
     *     for (const [slot, item] of pairs(chest.list())) {
     *         print(`${item.count} x ${item.name} in slot ${slot}`);
     *     }
     * @param inventory The current inventory.
     * @returns All items in this inventory.
     */
    list(): LuaMap<number, BasicItem>;

    /**
     * Get detailed information about an item.
     *
     * The returned information contains the same information as each item in {@link list}, as well
     * as additional details like the display name (`displayName`), item groups (`itemGroups`),
     * which are the creative tabs an item will appear under, and item and item durability
     * (`damage`, `maxDamage`, `durability`).
     *
     * Some items include more information (such as enchantments) - it is recommended to print it
     * out using {@link textutils.serialize} or in the Lua REPL, to explore what is available.
     *
     * @example
     *     // Print some information about the first in a chest.
     *     const chest = peripheral.find<InventoryPeripheral>("minecraft:chest")[0];
     *     if (chest === undefined) {
     *         throw "No chest";
     *     }
     *     const item = chest.getItemDetail(1);
     *     if (item === undefined) {
     *         throw "No item";
     *     }
     *
     *     print(`${item.displayName} (${item.name})`);
     *     print(`Count: ${item.count}/${item.maxCount}`);
     *
     *     for (const group of item.itemGroups) {
     *         print(`Group: ${group.displayName}`);
     *     }
     *
     *     if (item.damage !== undefined) {
     *         print(`Damage: ${item.damage}/${item.maxDamage}`);
     *     }
     * @param slot The slot to get information about.
     * @returns Information about the item in this slot, or `undefined` if not present.
     * @throws If the slot is out of range.
     */
    getItemDetail(slot: number): DetailedItem | undefined;

    /**
     * Get the maximum number of items which can be stored in this slot.
     *
     * Typically this will be limited to 64 items. However, some inventories (such as barrels or
     * caches) can store hundreds or thousands of items in one slot.
     *
     * @since 1.96.0
     * @example
     *     // Count the maximum number of items an adjacent chest can hold.
     *     const chest = peripheral.find<InventoryPeripheral>("minecraft:chest")[0];
     *     if (chest === undefined) {
     *         throw "No chest";
     *     }
     *     let total = 0;
     *     for (let i = 1; i <= chest.size(); i++) {
     *         total += chest.getItemLimit(i);
     *     }
     *     print(total);
     * @param slot The slot.
     * @returns The maximum number of items in this slot.
     * @throws If the slot is out of range.
     */
    getItemLimit(slot: number): number;

    /**
     * Push items from one inventory to another connected one.
     *
     * This allows you to push an item in an inventory to another inventory _on the same wired
     * network_. Both inventories must attached to wired modems which are connected via a cable.
     *
     * @example
     *     // Wrap two chests, and push an item from one to another.
     *     const chestA = peripheral.wrap<InventoryPeripheral>("minecraft:chest_0");
     *     const chestB = peripheral.wrap<InventoryPeripheral>("minecraft:chest_1");
     *     if (chestA === undefined || chestB === undefined) {
     *         throw "Chests not found";
     *     }
     *
     *     chestA.pushItems(peripheral.getName(chestB), 1);
     * @param toName The name of the peripheral/inventory to push to. This is the string given to
     *               {@link peripheral.wrap}, and displayed by the wired modem.
     * @param fromSlot The slot in the current inventory to move items to.
     * @param [limit] The maximum number of items to move. Defaults to the current stack limit.
     * @param [toSlot] The slot in the target inventory to move to. If not given, the item will be
     *        inserted into any slot.
     * @returns The number of transferred items.
     * @throws If the peripheral to transfer to doesn't exist or isn't an inventory.
     * @throws If either source or destination slot is out of range.
     * @see {@link peripheral.getName} Allows you to get the name of a wrapped peripheral.
     */
    pushItems(
        toName: string,
        fromSlot: number,
        limit?: number,
        toSlot?: number
    ): number;

    /**
     * Pull items from a connected inventory into this one.
     *
     * This allows you to transfer items between inventories _on the same wired network_. Both this
     * and the source inventory must attached to wired modems which are connected via a cable.
     *
     * @example
     *     // Wrap two chests, and push an item from one to another.
     *     const chestA = peripheral.wrap<InventoryPeripheral>("minecraft:chest_0");
     *     const chestB = peripheral.wrap<InventoryPeripheral>("minecraft:chest_1");
     *     if (chestA === undefined || chestB === undefined) {
     *         throw "Chests not found";
     *     }
     *
     *     chestA.pullItems(peripheral.getName(chestB), 1);
     * @param fromName The name of the peripheral/inventory to pull from. This is the string given
     *                 to.
     * @param fromSlot The slot in the source inventory to move items from.
     * @param [limit] The maximum number of items to move. Defaults to the current stack limit.
     * @param [toSlot] The slot in current inventory to move to. If not given, the item will be
     *        inserted into any slot.
     * @returns The number of transferred items.
     * @throws If the peripheral to transfer to doesn't exist or isn't an inventory.
     * @throws If either source or destination slot is out of range. {@link Peripheral.wrap}, and
     *         displayed by the wired modem.
     * @see {@link peripheral.getName} Allows you to get the name of a wrapped peripheral.
     */
    pullItems(
        fromName: string,
        fromSlot: number,
        limit?: number,
        toSlot?: number
    ): number;
}

/** @noSelf */
declare interface BasicItem {
    count: number;
    name: string;
}

/** @noSelf */
declare interface DetailedItem extends BasicItem {
    displayName: string;
    maxCount: number;
    itemGroups: Array<{ id?: string; displayName: string }>;
    rawName: string;
    tags: LuaSet<string>;

    enchantments?: Enchantment[];

    damage?: number;
    maxDamage?: number;
    durability?: number;
}

/** @noSelf */
declare interface Enchantment {
    displayName: string;
    level: number;
    name: string;
}
