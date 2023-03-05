/** @noSelfInFile */

/**
 * Turtles are a robotic device, which can break and place blocks, attack mobs, and move about the
 * world. They have an internal inventory of 16 slots, allowing them to store blocks they have
 * broken or would like to place.
 *
 * ### Movement
 *
 * Turtles are capable of moving through the world. As turtles are blocks themselves, they are
 * confined to Minecraft's grid, moving a single block at a time.
 *
 * {@link Turtle.forward} and {@link turtle.back} move the turtle in the direction it is facing,
 * while {@link turtle.up} and {@link turtle.down} move it up and down (as one might expect!). In
 * order to move left or right, you first need to turn the turtle using
 * {@link turtle.turnLeft}/{@link turtle.turnRight} and then move forward or backwards.
 *
 * #### INFO
 *
 * The name "turtle" comes from
 * {@link https://en.wikipedia.org/wiki/Turtle_graphics Turtle graphics}, which originated from the
 * Logo programming language. Here you'd move a turtle with various commands like "move 10" and
 * "turn left", much like ComputerCraft's turtles!
 *
 * Moving a turtle (though not turning it) consumes _fuel_. If a turtle does not have any
 * {@link turtle.refuel fuel}, it won't move, and the movement functions will return `false`. If
 * your turtle isn't going anywhere, the first thing to check is if you've fuelled your turtle.
 *
 * #### HANDLING ERRORS
 *
 * Many turtle functions can fail in various ways. For instance, a turtle cannot move forward if
 * there's already a block there. Instead of erroring, functions which can fail either return `true`
 * if they succeed, or `false` and some error message if they fail.
 *
 * Unexpected failures can often lead to strange behaviour. It's often a good idea to check the
 * return values of these functions, or wrap them in {@link assert} (for instance, use
 * `assert(turtle.forward())` rather than `turtle.forward()`), so the program doesn't misbehave.
 *
 * ### Turtle upgrades
 *
 * While a normal turtle can move about the world and place blocks, its functionality is limited.
 * Thankfully, turtles can be upgraded with _tools_ and peripherals. Turtles have two upgrade slots,
 * one on the left and right sides. Upgrades can be equipped by crafting a turtle with the upgrade,
 * or calling the {@link turtle.equipLeft}/{@link turtle.equipRight} functions.
 *
 * Turtle tools allow you to break blocks ({@link turtle.dig}) and attack entities
 * ({@link turtle.attack}). Some tools are more suitable to a task than others. For instance, a
 * diamond pickaxe can break every block, while a sword does more damage. Other tools have more
 * niche use-cases, for instance hoes can til dirt.
 *
 * Peripherals (such as the {@link ModemPeripheral wireless modem} or
 * {@link SpeakerPeripheral speaker}) can also be equipped as upgrades. These are then accessible by
 * accessing the `"left"` or `"right"` peripheral.
 *
 * | API                                                     | Description                                                                                                                         |
 * | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
 * | {@link craft craft([limit=64])}                         | Craft a recipe based on the turtle's inventory.                                                                                     |
 * | {@link forward forward()}                               | Move the turtle forward one block.                                                                                                  |
 * | {@link back back()}                                     | Move the turtle backwards one block.                                                                                                |
 * | {@link up up()}                                         | Move the turtle up one block.                                                                                                       |
 * | {@link down down()}                                     | Move the turtle down one block.                                                                                                     |
 * | {@link turnLeft turnLeft()}                             | Rotate the turtle 90 degrees to the left.                                                                                           |
 * | {@link turnRight turnRight()}                           | Rotate the turtle 90 degrees to the right.                                                                                          |
 * | {@link dig dig([side])}                                 | Attempt to break the block in front of the turtle.                                                                                  |
 * | {@link digUp digUp([side])}                             | Attempt to break the block above the turtle.                                                                                        |
 * | {@link digDown digDown([side])}                         | Attempt to break the block below the turtle.                                                                                        |
 * | {@link place place([text])}                             | Place a block or item into the world in front of the turtle.                                                                        |
 * | {@link placeUp placeUp([text])}                         | Place a block or item into the world above the turtle.                                                                              |
 * | {@link placeDown placeDown([text])}                     | Place a block or item into the world below the turtle.                                                                              |
 * | {@link drop drop([count])}                              | Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory. |
 * | {@link dropUp dropUp([count])}                          | Drop the currently selected stack into the inventory above the turtle, or as an item into the world if there is no inventory.       |
 * | {@link dropDown dropDown([count])}                      | Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory. |
 * | {@link select select(slot)}                             | Change the currently selected slot.                                                                                                 |
 * | {@link getItemCount getItemCount([slot])}               | Get the number of items in the given slot.                                                                                          |
 * | {@link getItemSpace getItemSpace([slot])}               | Get the remaining number of items which may be stored in this stack.                                                                |
 * | {@link detect detect()}                                 | Check if there is a solid block in front of the turtle.                                                                             |
 * | {@link detectUp detectUp()}                             | Check if there is a solid block above the turtle.                                                                                   |
 * | {@link detectDown detectDown()}                         | Check if there is a solid block below the turtle.                                                                                   |
 * | {@link compare compare()}                               | Check if the block in front of the turtle is equal to the item in the currently selected slot.                                      |
 * | {@link compareUp compareUp()}                           | Check if the block above the turtle is equal to the item in the currently selected slot.                                            |
 * | {@link compareDown compareDown()}                       | Check if the block below the turtle is equal to the item in the currently selected slot.                                            |
 * | {@link attack attack([side])}                           | Attack the entity in front of the turtle.                                                                                           |
 * | {@link attackUp attackUp([side])}                       | Attack the entity above the turtle.                                                                                                 |
 * | {@link attackDown attackDown([side])}                   | Attack the entity below the turtle.                                                                                                 |
 * | {@link suck suck([count])}                              | Suck an item from the inventory in front of the turtle, or from an item floating in the world.                                      |
 * | {@link suckUp suckUp([count])}                          | Suck an item from the inventory above the turtle, or from an item floating in the world.                                            |
 * | {@link suckDown suckDown([count])}                      | Suck an item from the inventory below the turtle, or from an item floating in the world.                                            |
 * | {@link getFuelLevel getFuelLevel()}                     | Get the maximum amount of fuel this turtle currently holds.                                                                         |
 * | {@link refuel refuel([count])}                          | Refuel this turtle.                                                                                                                 |
 * | {@link compareTo compareTo(slot)}                       | Compare the item in the currently selected slot to the item in another slot.                                                        |
 * | {@link transferTo transferTo(slot [, count])}           | Move an item from the selected slot to another one.                                                                                 |
 * | {@link getSelectedSlot getSelectedSlot()}               | Get the currently selected slot.                                                                                                    |
 * | {@link getFuelLimit getFuelLimit()}                     | Get the maximum amount of fuel this turtle can hold.                                                                                |
 * | {@link equipLeft equipLeft()}                           | Equip (or unequip) an item on the left side of this turtle.                                                                         |
 * | {@link equipRight equipRight()}                         | Equip (or unequip) an item on the right side of this turtle.                                                                        |
 * | {@link inspect inspect()}                               | Get information about the block in front of the turtle.                                                                             |
 * | {@link inspectUp inspectUp()}                           | Get information about the block above the turtle.                                                                                   |
 * | {@link inspectDown inspectDown()}                       | Get information about the block below the turtle.                                                                                   |
 * | {@link getItemDetail getItemDetail([slot][, detailed])} | Get detailed information about the items in the given slot.                                                                         |
 * | {@link native ~~native~~}                               | The builtin turtle API, without any generated helper functions.                                                                     |
 *
 * @since 1.3
 * @noSelf
 */
declare interface Turtle {
    /**
     * Craft a recipe based on the turtle's inventory. The turtle's inventory should set up like a
     * crafting grid. For instance, to craft sticks, slots 1 and 5 should contain planks. _All_
     * other slots should be empty, including those outside the crafting "grid".
     *
     * @since 1.4
     * @param [limit=64] The maximum number of crafting steps to run. Default is `64`.
     * @returns Whether crafting succeded or not.
     * @returns A string describing why crafting failed.
     * @throws When limit is less than 1 or greater than 64.
     */
    craft(limit?: number): SuccessOrError;

    /**
     * Move the turtle forward one block.
     *
     * @returns Whether the turtle could successfully move.
     * @returns The reason the turtle could not move.
     */
    forward(): SuccessOrError;

    /**
     * Move the turtle backwards one block.
     *
     * @returns Whether the turtle could successfully move.
     * @returns The reason the turtle could not move.
     */
    back(): SuccessOrError;

    /**
     * Move the turtle up one block.
     *
     * @returns Whether the turtle could successfully move.
     * @returns The reason the turtle could not move.
     */
    up(): SuccessOrError;

    /**
     * Move the turtle down one block.
     *
     * @returns Whether the turtle could successfully move.
     * @returns The reason the turtle could not move.
     */
    down(): SuccessOrError;

    /**
     * Rotate the turtle 90 degrees to the left.
     *
     * @returns Whether the turtle could successfully turn.
     * @returns The reason the turtle could not turn.
     */
    turnLeft(): SuccessOrError;

    /**
     * Rotate the turtle 90 degrees to the right.
     *
     * @returns Whether the turtle could successfully turn.
     * @returns The reason the turtle could not turn.
     */
    turnRight(): SuccessOrError;

    /**
     * Attempt to break the block in front of the turtle.
     *
     * This requires a turtle tool capable of breaking the block. Diamond pickaxes (mining turtles)
     * can break any vanilla block, but other tools (such as axes) are more limited.
     *
     * @param [side] The specific tool to use. Should be "left" or "right".
     * @returns Whether a block was broken.
     * @returns The reason no block was broken.
     * @changed 1.6 Added optional side argument.
     */
    dig(side?: ToolSide): SuccessOrError;

    /**
     * Attempt to break the block above the turtle. See {@link dig} for full details.
     *
     * @param [side] The specific tool to use.
     * @returns Whether a block was broken.
     * @returns The reason no block was broken.
     * @changed 1.6 Added optional side argument.
     */
    digUp(side?: ToolSide): SuccessOrError;

    /**
     * Attempt to break the block below the turtle. See {@link dig} for full details.
     *
     * @param [side] The specific tool to use.
     * @returns Whether a block was broken.
     * @returns The reason no block was broken.
     * @changed 1.6 Added optional side argument.
     */
    digDown(side?: ToolSide): SuccessOrError;

    /**
     * Place a block or item into the world in front of the turtle.
     *
     * "Placing" an item allows it to interact with blocks and entities in front of the turtle. For
     * instance, buckets can pick up and place down fluids, and wheat can be used to breed cows.
     * However, you cannot use {@link place} to perform arbitrary block interactions, such as
     * clicking buttons or flipping levers.
     *
     * @since 1.4
     * @param [text] When placing a sign, set its contents to this text.
     * @returns Whether the block could be placed.
     * @returns The reason the block was not placed.
     */
    place(text?: string): SuccessOrError;

    /**
     * Place a block or item into the world above the turtle.
     *
     * @since 1.4
     * @param [text] When placing a sign, set its contents to this text.
     * @returns Whether the block could be placed.
     * @returns The reason the block was not placed.
     * @see {@link place} For more information about placing items.
     */
    placeUp(text?: string): SuccessOrError;

    /**
     * Place a block or item into the world below the turtle.
     *
     * @since 1.4
     * @param [text] When placing a sign, set its contents to this text.
     * @returns Whether the block could be placed.
     * @returns The reason the block was not placed.
     * @see {@link place} For more information about placing items.
     */
    placeDown(text?: string): SuccessOrError;

    /**
     * Drop the currently selected stack into the inventory in front of the turtle, or as an item
     * into the world if there is no inventory.
     *
     * @since 1.31
     * @param [count] The number of items to drop. If not given, the entire stack will be dropped.
     * @returns Whether items were dropped.
     * @returns The reason the no items were dropped.
     * @throws If dropping an invalid number of items.
     * @see {@link select}
     */
    drop(count?: number): SuccessOrError;

    /**
     * Drop the currently selected stack into the inventory above the turtle, or as an item into the
     * world if there is no inventory.
     *
     * @since 1.4
     * @param [count] The number of items to drop. If not given, the entire stack will be dropped.
     * @returns Whether items were dropped.
     * @returns The reason the no items were dropped.
     * @throws If dropping an invalid number of items.
     * @see {@link select}
     */
    dropUp(count?: number): SuccessOrError;

    /**
     * Drop the currently selected stack into the inventory in front of the turtle, or as an item
     * into the world if there is no inventory.
     *
     * @since 1.4
     * @param [count] The number of items to drop. If not given, the entire stack will be dropped.
     * @returns Whether items were dropped.
     * @returns The reason the no items were dropped.
     * @throws If dropping an invalid number of items.
     * @see {@link select}
     */
    dropDown(count?: number): SuccessOrError;

    /**
     * Change the currently selected slot.
     *
     * The selected slot is determines what slot actions like {@link drop} or {@link getItemCount}
     * act on.
     *
     * @param slot The slot to select.
     * @returns When the slot has been selected.
     * @throws If the slot is out of range.
     * @see {@link getSelectedSlot}
     */
    select(slot: number): true;

    /**
     * Get the number of items in the given slot.
     *
     * @param [slot] The slot we wish to check. Defaults to the {@link select selected slot}.
     * @returns The number of items in this slot.
     * @throws If the slot is out of range.
     */
    getItemCount(slot?: number): number;

    /**
     * Get the remaining number of items which may be stored in this stack.
     *
     * For instance, if a slot contains 13 blocks of dirt, it has room for another 51.
     *
     * @param [slot] The slot we wish to check. Defaults to the {@link select selected slot}.
     * @returns The space left in in this slot.
     * @throws If the slot is out of range.
     */
    getItemSpace(slot?: number): number;

    /**
     * Check if there is a solid block in front of the turtle. In this case, solid refers to any
     * non-air or liquid block.
     *
     * @returns If there is a solid block in front.
     */
    detect(): boolean;

    /**
     * Check if there is a solid block above the turtle. In this case, solid refers to any non-air
     * or liquid block.
     *
     * @returns If there is a solid block in front.
     */
    detectUp(): boolean;

    /**
     * Check if there is a solid block below the turtle. In this case, solid refers to any non-air
     * or liquid block.
     *
     * @returns If there is a solid block in front.
     */
    detectDown(): boolean;

    /**
     * Check if the block in front of the turtle is equal to the item in the currently selected
     * slot.
     *
     * @since 1.31
     * @returns If the block and item are equal.
     */
    compare(): boolean;

    /**
     * Check if the block above the turtle is equal to the item in the currently selected slot.
     *
     * @since 1.31
     * @returns If the block and item are equal.
     */
    compareUp(): boolean;

    /**
     * Check if the block below the turtle is equal to the item in the currently selected slot.
     *
     * @since 1.31
     * @returns If the block and item are equal.
     */
    compareDown(): boolean;

    /**
     * Attack the entity in front of the turtle.
     *
     * @since 1.4
     * @param [side] The specific tool to use.
     * @returns Whether an entity was attacked.
     * @returns The reason nothing was attacked.
     * @changed 1.6 Added optional side argument.
     */
    attack(side?: ToolSide): SuccessOrError;

    /**
     * Attack the entity above the turtle.
     *
     * @since 1.4
     * @param [side] The specific tool to use.
     * @returns Whether an entity was attacked.
     * @returns The reason nothing was attacked.
     * @changed 1.6 Added optional side argument.
     */
    attackUp(side?: ToolSide): SuccessOrError;

    /**
     * Attack the entity below the turtle.
     *
     * @since 1.4
     * @param [side] The specific tool to use.
     * @returns Whether an entity was attacked.
     * @returns The reason nothing was attacked.
     * @changed 1.6 Added optional side argument.
     */
    attackDown(side?: ToolSide): SuccessOrError;

    /**
     * Suck an item from the inventory in front of the turtle, or from an item floating in the
     * world.
     *
     * This will pull items into the first acceptable slot, starting at the
     * {@link select currently selected} one.
     *
     * @since 1.4
     * @param [count] The number of items to suck. If not given, up to a stack of items will be
     *        picked up.
     * @returns Whether items were picked up.
     * @returns The reason the no items were picked up.
     * @throws If given an invalid number of items.
     * @changed 1.6 Added an optional limit argument.
     */
    suck(count?: number): SuccessOrError;

    /**
     * Suck an item from the inventory above the turtle, or from an item floating in the world.
     *
     * @since 1.4
     * @param [count] The number of items to suck. If not given, up to a stack of items will be
     *        picked up.
     * @returns Whether items were picked up.
     * @returns The reason the no items were picked up.
     * @throws If given an invalid number of items.
     * @changed 1.6 Added an optional limit argument.
     */
    suckUp(count?: number): SuccessOrError;

    /**
     * Suck an item from the inventory below the turtle, or from an item floating in the world.
     *
     * @since 1.4
     * @param [count] The number of items to suck. If not given, up to a stack of items will be
     *        picked up.
     * @returns Whether items were picked up.
     * @returns The reason the no items were picked up.
     * @throws If given an invalid number of items.
     * @changed 1.6 Added an optional limit argument.
     */
    suckDown(count?: number): SuccessOrError;

    /**
     * Get the maximum amount of fuel this turtle currently holds.
     *
     * @since 1.4
     * @returns The current amount of fuel a turtle this turtle has or "unlimited" if turtles do not
     *          consume fuel when moving.
     * @see {@link getFuelLimit}
     * @see {@link refuel}
     */
    getFuelLevel(): number | "unlimited";

    /**
     * Refuel this turtle.
     *
     * While most actions a turtle can perform (such as digging or placing blocks) are free, moving
     * consumes fuel from the turtle's internal buffer. If a turtle has no fuel, it will not move.
     *
     * {@link Turtle.refuel} refuels the turtle, consuming fuel items (such as coal or lava buckets)
     * from the currently selected slot and converting them into energy. This finishes once the
     * turtle is fully refuelled or all items have been consumed.
     *
     * @since 1.4
     * @example
     *     // Refuel a turtle from the currently selected slot.
     *     const level = turtle.getFuelLevel();
     *     if (level === "unlimited") {
     *         throw "Turtle does not need fuel";
     *     }
     *     const [ok, err] = turtle.refuel();
     *     if (ok) {
     *         const newLevel = turtle.getFuelLevel();
     *         if (newLevel === "unlimited") {
     *             throw "Turtle does not need fuel";
     *         }
     *         print(`Refuelled ${newLevel - level}, current level is ${newLevel}`);
     *     } else {
     *         printError(err);
     *     }
     * @example
     *     // Check if the current item is a valid fuel source.
     *     const [isFuel, reason] = turtle.refuel(0);
     *     if (!isFuel) {
     *         printError(reason);
     *     }
     * @param [countA] The maximum number of items to consume. One can pass `0` to check if an item
     *        is combustable or not.
     * @returns Whether the turtle was refuelled or not.
     * @returns The reason the turtle was not refuelled.
     * @throws If the refuel count is out of range.
     * @see {@link getFuelLevel}
     * @see {@link getFuelLimit}
     */
    refuel(count?: number): SuccessOrError;

    /**
     * Compare the item in the currently selected slot to the item in another slot.
     *
     * @since 1.4
     * @param slot The slot to compare to.
     * @returns If the two items are equal.
     * @throws If the slot is out of range.
     */
    compareTo(slot: number): boolean;

    /**
     * Move an item from the selected slot to another one.
     *
     * @since 1.45
     * @param slotArg The slot to move this item to.
     * @param [countArg] The maximum number of items to move.
     * @returns If the item was moved or not.
     * @returns If some items were successfully moved.
     * @throws If the slot is out of range.
     * @throws If the number of items is out of range.
     */
    transferTo(slotArg: number, countArg?: number): boolean;

    /**
     * Get the currently selected slot.
     *
     * @since 1.6
     * @returns The current slot.
     * @see {@link select}
     */
    getSelectedSlot(): number;

    /**
     * Get the maximum amount of fuel this turtle can hold.
     *
     * By default, normal turtles have a limit of 20,000 and advanced turtles of 100,000.
     *
     * @since 1.6
     * @returns The maximum amount of fuel a turtle can hold or "unlimited" if turtles do not
     *          consume fuel when moving.
     * @see {@link getFuelLevel}
     * @see {@link refuel}
     */
    getFuelLimit(): number | "unlimited";

    /**
     * Equip (or unequip) an item on the left side of this turtle.
     *
     * This finds the item in the currently selected slot and attempts to equip it to the left side
     * of the turtle. The previous upgrade is removed and placed into the turtle's inventory. If
     * there is no item in the slot, the previous upgrade is removed, but no new one is equipped.
     *
     * @since 1.6
     * @returns Whether the item was equipped or not.
     * @returns The reason equipping this item failed.
     * @see {@link equipRight}
     */
    equipLeft(): SuccessOrError;

    /**
     * Equip (or unequip) an item on the right side of this turtle.
     *
     * This finds the item in the currently selected slot and attempts to equip it to the right side
     * of the turtle. The previous upgrade is removed and placed into the turtle's inventory. If
     * there is no item in the slot, the previous upgrade is removed, but no new one is equipped.
     *
     * @since 1.6
     * @returns Whether the item was equipped or not.
     * @returns The reason equipping this item failed.
     * @see {@link equipLeft}
     */
    equipRight(): SuccessOrError;

    /**
     * Get information about the block in front of the turtle.
     *
     * @since 1.64
     * @example
     *     const [hasBlock, data] = turtle.inspect();
     *     if (hasBlock) {
     *         print(textutils.serialise(data));
     *     }
     *
     *     // ```lua {
     *     //   name = "minecraft:oak_log",
     *     //   state = { axis = "x" },
     *     //   tags = { ["minecraft:logs"] = true, ... },
     *     // } ```
     *
     *     else {
     *         print("No block in front of the turtle");
     *     }
     * @returns Whether there is a block in front of the turtle.
     * @returns Information about the block in front, or a message explaining that there is no
     *          block.
     * @changed 1.76 Added block state to return value.
     */
    inspect():
        | LuaMultiReturn<[true, BlockData]>
        | LuaMultiReturn<[false, string]>;

    /**
     * Get information about the block above the turtle.
     *
     * @since 1.64
     * @returns Whether there is a block above the turtle.
     * @returns Information about the block above, or a message explaining that there is no block.
     */
    inspectUp():
        | LuaMultiReturn<[true, BlockData]>
        | LuaMultiReturn<[false, string]>;

    /**
     * Get information about the block below the turtle.
     *
     * @since 1.64
     * @returns Whether there is a block below the turtle.
     * @returns Information about the block below, or a message explaining that there is no block.
     */
    inspectDown():
        | LuaMultiReturn<[true, BlockData]>
        | LuaMultiReturn<[false, string]>;

    /**
     * Get detailed information about the items in the given slot.
     *
     * @since 1.64
     * @example
     *     // Print the current slot, assuming it contains 13 dirt.
     *     print(textutils.serialise(turtle.getItemDetail()));
     *
     *     // => ```lua {
     *     //  name = "minecraft:dirt",
     *     //  count = 13,
     *     // } ```
     * @param [slot] The slot to get information about. Defaults to the
     * {@link select selected slot}.
     * @param [detailed] Whether to include "detailed" information. When `true` the method will
     *        contain much more information about the item at the cost of taking longer to run.
     * @returns Information about the given slot, or `undefined` if it is empty.
     * @throws If the slot is out of range.
     * @see {@link InventoryPeripheral.getItemDetail} Describes the information returned by a
     *      detailed query.
     */
    getItemDetail(
        slot?: number,
        detailed?: false
    ): BasicDetailedItem | undefined;
    getItemDetail(
        slot: number | undefined,
        detailed: true
    ): DetailedItem | undefined;

    /**
     * The builtin turtle API, without any generated helper functions.
     *
     * @deprecated Historically this table behaved differently to the main turtle API, but this is
     *             no longer the case. You should not need to use it.
     */
    native: Turtle;
}

/**
 * Turtles are a robotic device, which can break and place blocks, attack mobs, and move about the
 * world. They have an internal inventory of 16 slots, allowing them to store blocks they have
 * broken or would like to place.
 *
 * ### Movement
 *
 * Turtles are capable of moving through the world. As turtles are blocks themselves, they are
 * confined to Minecraft's grid, moving a single block at a time.
 *
 * {@link Turtle.forward} and {@link turtle.back} move the turtle in the direction it is facing,
 * while {@link turtle.up} and {@link turtle.down} move it up and down (as one might expect!). In
 * order to move left or right, you first need to turn the turtle using
 * {@link turtle.turnLeft}/{@link turtle.turnRight} and then move forward or backwards.
 *
 * #### INFO
 *
 * The name "turtle" comes from
 * {@link https://en.wikipedia.org/wiki/Turtle_graphics Turtle graphics}, which originated from the
 * Logo programming language. Here you'd move a turtle with various commands like "move 10" and
 * "turn left", much like ComputerCraft's turtles!
 *
 * Moving a turtle (though not turning it) consumes _fuel_. If a turtle does not have any
 * {@link turtle.refuel fuel}, it won't move, and the movement functions will return `false`. If
 * your turtle isn't going anywhere, the first thing to check is if you've fuelled your turtle.
 *
 * #### HANDLING ERRORS
 *
 * Many turtle functions can fail in various ways. For instance, a turtle cannot move forward if
 * there's already a block there. Instead of erroring, functions which can fail either return `true`
 * if they succeed, or `false` and some error message if they fail.
 *
 * Unexpected failures can often lead to strange behaviour. It's often a good idea to check the
 * return values of these functions, or wrap them in {@link assert} (for instance, use
 * `assert(turtle.forward())` rather than `turtle.forward()`), so the program doesn't misbehave.
 *
 * ### Turtle upgrades
 *
 * While a normal turtle can move about the world and place blocks, its functionality is limited.
 * Thankfully, turtles can be upgraded with _tools_ and peripherals. Turtles have two upgrade slots,
 * one on the left and right sides. Upgrades can be equipped by crafting a turtle with the upgrade,
 * or calling the {@link turtle.equipLeft}/{@link turtle.equipRight} functions.
 *
 * Turtle tools allow you to break blocks ({@link turtle.dig}) and attack entities
 * ({@link turtle.attack}). Some tools are more suitable to a task than others. For instance, a
 * diamond pickaxe can break every block, while a sword does more damage. Other tools have more
 * niche use-cases, for instance hoes can til dirt.
 *
 * Peripherals (such as the {@link ModemPeripheral wireless modem} or
 * {@link SpeakerPeripheral speaker}) can also be equipped as upgrades. These are then accessible by
 * accessing the `"left"` or `"right"` peripheral.
 *
 * | API                                                            | Description                                                                                                                         |
 * | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
 * | {@link Turtle.craft craft([limit=64])}                         | Craft a recipe based on the turtle's inventory.                                                                                     |
 * | {@link Turtle.forward forward()}                               | Move the turtle forward one block.                                                                                                  |
 * | {@link Turtle.back back()}                                     | Move the turtle backwards one block.                                                                                                |
 * | {@link Turtle.up up()}                                         | Move the turtle up one block.                                                                                                       |
 * | {@link Turtle.down down()}                                     | Move the turtle down one block.                                                                                                     |
 * | {@link Turtle.turnLeft turnLeft()}                             | Rotate the turtle 90 degrees to the left.                                                                                           |
 * | {@link Turtle.turnRight turnRight()}                           | Rotate the turtle 90 degrees to the right.                                                                                          |
 * | {@link Turtle.dig dig([side])}                                 | Attempt to break the block in front of the turtle.                                                                                  |
 * | {@link Turtle.digUp digUp([side])}                             | Attempt to break the block above the turtle.                                                                                        |
 * | {@link Turtle.digDown digDown([side])}                         | Attempt to break the block below the turtle.                                                                                        |
 * | {@link Turtle.place place([text])}                             | Place a block or item into the world in front of the turtle.                                                                        |
 * | {@link Turtle.placeUp placeUp([text])}                         | Place a block or item into the world above the turtle.                                                                              |
 * | {@link Turtle.placeDown placeDown([text])}                     | Place a block or item into the world below the turtle.                                                                              |
 * | {@link Turtle.drop drop([count])}                              | Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory. |
 * | {@link Turtle.dropUp dropUp([count])}                          | Drop the currently selected stack into the inventory above the turtle, or as an item into the world if there is no inventory.       |
 * | {@link Turtle.dropDown dropDown([count])}                      | Drop the currently selected stack into the inventory in front of the turtle, or as an item into the world if there is no inventory. |
 * | {@link Turtle.select select(slot)}                             | Change the currently selected slot.                                                                                                 |
 * | {@link Turtle.getItemCount getItemCount([slot])}               | Get the number of items in the given slot.                                                                                          |
 * | {@link Turtle.getItemSpace getItemSpace([slot])}               | Get the remaining number of items which may be stored in this stack.                                                                |
 * | {@link Turtle.detect detect()}                                 | Check if there is a solid block in front of the turtle.                                                                             |
 * | {@link Turtle.detectUp detectUp()}                             | Check if there is a solid block above the turtle.                                                                                   |
 * | {@link Turtle.detectDown detectDown()}                         | Check if there is a solid block below the turtle.                                                                                   |
 * | {@link Turtle.compare compare()}                               | Check if the block in front of the turtle is equal to the item in the currently selected slot.                                      |
 * | {@link Turtle.compareUp compareUp()}                           | Check if the block above the turtle is equal to the item in the currently selected slot.                                            |
 * | {@link Turtle.compareDown compareDown()}                       | Check if the block below the turtle is equal to the item in the currently selected slot.                                            |
 * | {@link Turtle.attack attack([side])}                           | Attack the entity in front of the turtle.                                                                                           |
 * | {@link Turtle.attackUp attackUp([side])}                       | Attack the entity above the turtle.                                                                                                 |
 * | {@link Turtle.attackDown attackDown([side])}                   | Attack the entity below the turtle.                                                                                                 |
 * | {@link Turtle.suck suck([count])}                              | Suck an item from the inventory in front of the turtle, or from an item floating in the world.                                      |
 * | {@link Turtle.suckUp suckUp([count])}                          | Suck an item from the inventory above the turtle, or from an item floating in the world.                                            |
 * | {@link Turtle.suckDown suckDown([count])}                      | Suck an item from the inventory below the turtle, or from an item floating in the world.                                            |
 * | {@link Turtle.getFuelLevel getFuelLevel()}                     | Get the maximum amount of fuel this turtle currently holds.                                                                         |
 * | {@link Turtle.refuel refuel([count])}                          | Refuel this turtle.                                                                                                                 |
 * | {@link Turtle.compareTo compareTo(slot)}                       | Compare the item in the currently selected slot to the item in another slot.                                                        |
 * | {@link Turtle.transferTo transferTo(slot [, count])}           | Move an item from the selected slot to another one.                                                                                 |
 * | {@link Turtle.getSelectedSlot getSelectedSlot()}               | Get the currently selected slot.                                                                                                    |
 * | {@link Turtle.getFuelLimit getFuelLimit()}                     | Get the maximum amount of fuel this turtle can hold.                                                                                |
 * | {@link Turtle.equipLeft equipLeft()}                           | Equip (or unequip) an item on the left side of this turtle.                                                                         |
 * | {@link Turtle.equipRight equipRight()}                         | Equip (or unequip) an item on the right side of this turtle.                                                                        |
 * | {@link Turtle.inspect inspect()}                               | Get information about the block in front of the turtle.                                                                             |
 * | {@link Turtle.inspectUp inspectUp()}                           | Get information about the block above the turtle.                                                                                   |
 * | {@link Turtle.inspectDown inspectDown()}                       | Get information about the block below the turtle.                                                                                   |
 * | {@link Turtle.getItemDetail getItemDetail([slot][, detailed])} | Get detailed information about the items in the given slot.                                                                         |
 * | {@link Turtle.native ~~native~~}                               | The builtin turtle API, without any generated helper functions.                                                                     |
 *
 * @since 1.3
 * @noSelf
 */
declare const turtle: Turtle | undefined;

declare type SuccessOrError =
    | LuaMultiReturn<[true, undefined]>
    | LuaMultiReturn<[false, string]>;
declare type ToolSide = "left" | "right";

/** @noSelf */
declare interface BlockData {
    name: string;
    state: Record<string, string>;
    tags: LuaSet<string>;
}

/** @noSelf */
declare interface BasicDetailedItem extends BasicItem {
    nbt: string;
}
