/** @noSelfInFile */

/**
 * This peripheral allows you to interact with command blocks.
 *
 * Command blocks are only wrapped as peripherals if the `enable_command_block` option is true
 * within the config.
 *
 * This API is not the same as the {@link commands} API, which is exposed on command computers.
 *
 * | API                                    | Description                                  |
 * | -------------------------------------- | -------------------------------------------- |
 * | {@link getCommand getCommand()}        | Get the command this command block will run. |
 * | {@link setCommand setCommand(command)} | Set the command block's command.             |
 * | {@link runCommand runCommand()}        | Execute the command block once.              |
 *
 * @noSelf
 */
declare interface CommandPeripheral extends AnyPeripheral {
    /**
     * Get the command this command block will run.
     *
     * @returns The current command.
     */
    getCommand(): string;

    /**
     * Set the command block's command.
     *
     * @param command The new command.
     */
    setCommand(command: string): void;

    /**
     * Execute the command block once.
     *
     * @returns If the command completed successfully.
     * @returns A failure message.
     */
    runCommand():
        | LuaMultiReturn<[true, undefined]>
        | LuaMultiReturn<[false, string]>;
}
