/** @noSelfInFile */

/**
 * The {@link os} API allows interacting with the current computer.
 *
 * | API                                                | Description                                                                                   |
 * | -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
 * | {@link loadAPI ~~loadAPI(path)~~}                  | Loads the given API into the global environment.                                              |
 * | {@link unloadAPI ~~unloadAPI(name)~~}              | Unloads an API which was loaded by {@link os.loadAPI}.                                        |
 * | {@link pullEvent pullEvent([filter])}              | Pause execution of the current thread and waits for any events matching `filter`.             |
 * | {@link pullEventRaw pullEventRaw([filter])}        | Pause execution of the current thread and waits for events, including the `terminate` event.  |
 * | {@link sleep sleep([time])}                        | Pauses execution for the specified number of seconds, alias of {@link _G.sleep}.       |
 * | {@link version version()}                          | Get the current CraftOS version (for example, `CraftOS 1.8`).                                 |
 * | {@link run run(env, path, ...)}                    | Run the program at the given path with the specified environment and arguments.               |
 * | {@link queueEvent queueEvent(name, ...)}           | Adds an event to the event queue.                                                             |
 * | {@link startTimer startTimer(timer)}               | Starts a timer that will run for the specified number of seconds.                             |
 * | {@link cancelTimer cancelTimer(token)}             | Cancels a timer previously started with startTimer.                                           |
 * | {@link setAlarm setAlarm(time)}                    | Sets an alarm that will fire at the specified in-game time.                                   |
 * | {@link cancelAlarm cancelAlarm(token)}             | Cancels an alarm previously started with setAlarm.                                            |
 * | {@link shutdown shutdown()}                        | Shuts down the computer immediately.                                                          |
 * | {@link reboot reboot()}                            | Reboots the computer immediately.                                                             |
 * | {@link getComputerID getComputerID()}              | Returns the ID of the computer.                                                               |
 * | {@link computerID computerID()}                    | Returns the ID of the computer.                                                               |
 * | {@link getComputerLabel getComputerLabel()}        | Returns the label of the computer, or `undefined` if none is set.                             |
 * | {@link computerLabel computerLabel()}              | Returns the label of the computer, or `undefined` if none is set.                             |
 * | {@link setComputerLabel setComputerLabel([label])} | Set the label of this computer.                                                               |
 * | {@link clock clock()}                              | Returns the number of seconds that the computer has been running.                             |
 * | {@link time time([locale])}                        | Returns the current time depending on the string passed in.                                   |
 * | {@link day day([args])}                            | Returns the day depending on the locale specified.                                            |
 * | {@link epoch epoch([args])}                        | Returns the number of milliseconds since an epoch depending on the locale.                    |
 * | {@link date date([format][, time])}                | Returns a date string (or table) using a specified format string and optional time to format. |
 */
declare namespace os {
    /**
     * Loads the given API into the global environment. This function loads and executes the file at the given path, and
     * all global variables and functions exported by it will by available through the use of `myAPI.<function name>`,
     * where `myAPI` is the base name of the API file.
     *
     * @deprecated When possible it's best to avoid using this function. It pollutes the global table and can mask
     *   errors. `import` should be used to load libraries instead.
     * @since 1.2
     * @param path The path of the API to load.
     * @returns Whether or not the API was successfully loaded.
     */
    function loadAPI(path: string): boolean;

    /**
     * Unloads an API which was loaded by `os.loadAPI`.
     *
     * This effectively removes the specified table from `_G`.
     *
     * @deprecated See `os.loadAPI` for why.
     * @since 1.2
     * @param name The name of the API to unload.
     */
    function unloadAPI(name: string): void;

    /**
     * Pause execution of the current thread and waits for any events matching `filter`. This function `yields` the
     * current process and waits for it to be resumed with a vararg list where the first element matches `filter`. If no
     * `filter` is supplied, this will match all events. Unlike `os.pullEventRaw`, it will stop the application upon a
     * "terminate" event, printing the error "Terminated".
     *
     * @example
     *     // Listen for `mouse_click` events.
     *     while (true) {
     *         let [event, button, x, y] = os.pullEvent("mouse_click");
     *         print("Button", button, "was clicked at", x, ",", y);
     *     }
     *
     * @example
     *     // Listen for multiple events.
     *     while (true) {
     *         let eventData = os.pullEvent();
     *         let event = eventData[1];
     *         if (event == "mouse_click") {
     *             print("Button", eventData[2], "was clicked at", eventData[3], ",", eventData[4]);
     *         } else if (event == "key") {
     *             print("Key code", eventData[2], "was pressed");
     *         }
     *     }
     *
     * @param [filter] Event to filter for.
     * @returns The name of the event that fired.
     * @returns Optional additional parameters of the event.
     * @changed 1.3 Added filter argument.
     * @see os.pullEventRaw To pull the terminate event.
     */
    function pullEvent(filter?: string): LuaMultiReturn<[string, ...any[]]>;

    /**
     * Pause execution of the current thread and waits for events, including the `terminate` event. This behaves almost
     * the same as `os.pullEvent`, except it allows you to handle the `terminate` event yourself - the program will not
     * stop execution when `Ctrl+T` is pressed.
     *
     * @example
     *     // Listen for `terminate` events.
     *     while (true) {
     *         let event = os.pullEventRaw()[0];
     *         if (event == "terminate") {
     *             print("Caught terminate event!");
     *         }
     *     }
     *
     * @param [filter] Event to filter for.
     * @returns The name of the event that fired.
     * @returns Optional additional parameters of the event.
     * @see os.pullEvent To pull events normally.
     */
    function pullEventRaw(filter?: string): LuaMultiReturn<[string, ...any[]]>;

    /**
     * Pauses execution for the specified number of seconds, alias of `_G.sleep`.
     *
     * @param [time] The number of seconds to sleep for, rounded up to the nearest multiple of 0.05.
     */
    function sleep(time?: number): void;

    /**
     * Get the current CraftOS version (for example, `CraftOS 1.8`).
     *
     * This is defined by `bios.lua`. For the current version of CC:Tweaked, this should return `CraftOS 1.8`.
     *
     * @example
     *     print(os.version());
     *
     * @returns The current CraftOS version.
     */
    function version(): string;

    /**
     * Run the program at the given path with the specified environment and arguments.
     *
     * This function does not resolve program names like the shell does. This means that, for example, `os.run("edit")`
     * will not work. As well as this, it does not provide access to the `shell` API in the environment. For this
     * behaviour, use `shell.run` instead.
     *
     * If the program cannot be found, or failed to run, it will print the error and return `false`. If you want to
     * handle this more gracefully, use an alternative such as `loadfile`.
     *
     * @example
     *     // Run the default shell from within your program:
     *     os.run({}, "/rom/programs/shell.lua");
     *
     * @param env The environment to run the program with.
     * @param path The exact path of the program to run.
     * @param ...args The arguments to pass to the program.
     * @returns Whether or not the program ran successfully.
     * @see shell.run
     * @see loadfile
     */
    function run(env: Record<string, any>, path: string, ...args: any[]): boolean;

    /**
     * Adds an event to the event queue. This event can later be pulled with os.pullEvent.
     *
     * @param name The name of the event to queue.
     * @param ...args The parameters of the event.
     * @see os.pullEvent To pull the event queued
     */
    function queueEvent(name: string, ...args: any[]): void;

    /**
     * Starts a timer that will run for the specified number of seconds. Once the timer fires, a `timer` event will be
     * added to the queue with the ID returned from this function as the first parameter.
     *
     * As with `sleep`, `timer` will automatically be rounded up to the nearest multiple of 0.05 seconds, as it waits
     * for a fixed amount of world ticks.
     *
     * @param timer The number of seconds until the timer fires.
     * @returns The ID of the new timer. This can be used to filter the `timer` event, or cancel the timer.
     * @throws If the time is below zero.
     * @see os.cancelTimer To cancel a timer.
     */
    function startTimer(timer: number): number;

    /**
     * Cancels a timer previously started with startTimer. This will stop the timer from firing.
     *
     * @param token The ID of the timer to cancel.
     * @see os.startTimer To start a timer.
     */
    function cancelTimer(token: number): void;

    /**
     * Sets an alarm that will fire at the specified in-game time. When it fires, * an `alarm` event will be added to
     * the event queue with the ID * returned from this function as the first parameter.
     *
     * @since 1.2
     * @param time The time at which to fire the alarm, in the range [0.0, 24.0).
     * @returns The ID of the new alarm. This can be used to filter the `alarm` event, or cancel the alarm.
     * @throws If the time is out of range.
     * @see os.cancelAlarm To cancel an alarm.
     */
    function setAlarm(time: number): number;

    /**
     * Cancels an alarm previously started with setAlarm. This will stop the alarm from firing.
     *
     * @since 1.2
     * @param token The ID of the alarm to cancel.
     * @see os.setAlarm To set an alarm.
     */
    function cancelAlarm(token: number): void;

    /** Shuts down the computer immediately. */
    function shutdown(): void;

    /** Reboots the computer immediately. */
    function reboot(): void;

    /**
     * Returns the ID of the computer.
     *
     * @returns The ID of the computer.
     */
    function getComputerID(): number;

    /**
     * Returns the ID of the computer.
     *
     * @returns The ID of the computer.
     */
    function computerID(): number;

    /**
     * Returns the label of the computer, or `undefined` if none is set.
     *
     * @since 1.3
     * @returns The label of the computer.
     */
    function getComputerLabel(): string | undefined;

    /**
     * Returns the label of the computer, or `undefined` if none is set.
     *
     * @since 1.3
     * @returns The label of the computer.
     */
    function computerLabel(): string | undefined;

    /**
     * Set the label of this computer.
     *
     * @since 1.3
     * @param label The new label. May be `undefined` in order to clear it.
     */
    function setComputerLabel(label?: string): void;

    /**
     * Returns the number of seconds that the computer has been running.
     *
     * @since 1.2
     * @returns The computer's uptime.
     */
    function clock(): number;

    /**
     * Returns the current time depending on the string passed in. This will always be in the range [0.0, 24.0).
     *
     * - If called with `ingame`, the current world time will be returned. This is the default if nothing is passed.
     * - If called with `utc`, returns the hour of the day in UTC time.
     * - If called with `local`, returns the hour of the day in the timezone the server is located in.
     *
     * This function can also be called with a table returned from os.date, which will convert the date fields into a
     * UNIX timestamp (number of seconds since 1 January 1970).
     *
     * @since 1.2
     * @example
     *     // Print the current in-game time.
     *     print(textutils.formatTime(os.time()));
     *
     * @param [args] The locale of the time, or a table filled by `os.date("*t")` to decode. Defaults to `ingame` locale
     *   if not specified.
     * @returns The hour of the selected locale, or a UNIX timestamp from the table, depending on the argument passed
     *   in.
     * @throws LuaException If an invalid locale is passed.
     * @changed 1.80pr1 Add support for getting the local local and UTC time.
     * @changed 1.82.0 Arguments are now case insensitive.
     * @changed 1.83.0 os.time now accepts table arguments and converts them to UNIX timestamps.
     * @see textutils.formatTime To convert times into a user-readable string.
     * @see os.date To get a date table that can be converted with this function.
     */
    function time(args?: "ingame" | "local" | "utc" | Record<string, any>): number;

    /**
     * Returns the day depending on the locale specified.
     *
     * - If called with `ingame`, returns the number of days since the world was created. This is the default.
     * - If called with `utc`, returns the number of days since 1 January 1970 in the UTC timezone.
     * - If called with `local`, returns the number of days since 1 January 1970 in the server's local timezone.
     *
     * @since 1.48
     * @param [args] The locale to get the day for. Defaults to `ingame` if not set.
     * @returns The day depending on the selected locale.
     * @throws If an invalid locale is passed.
     * @changed 1.82.0 Arguments are now case insensitive.
     */
    function day(args?: "ingame" | "local" | "utc"): number;

    /**
     * Returns the number of milliseconds since an epoch depending on the locale.
     *
     * - If called with `ingame`, returns the number of milliseconds since the world was created. This is the default.
     * - If called with `utc`, returns the number of milliseconds since 1 January 1970 in the UTC timezone.
     * - If called with `local`, returns the number of milliseconds since 1 January 1970 in the server's local timezone.
     *
     * @since 1.80pr1
     * @example
     *     // Get the current time and use os.date to convert it to a table.
     *     // Dividing by 1000 converts it from milliseconds to seconds.
     *     let time = os.epoch("local") / 1000;
     *     let time_table = os.date("*t", time);
     *     print(textutils.serialize(time_table));
     *
     * @param [args] The locale to get the milliseconds for. Defaults to `ingame` if not set.
     * @returns The milliseconds since the epoch depending on the selected locale.
     * @throws If an invalid locale is passed.
     */
    function epoch(args?: "ingame" | "local" | "utc"): number;

    /**
     * Returns a date string (or table) using a specified format string and optional time to format.
     *
     * The format string takes the same formats as C's `strftime` function
     * (http://www.cplusplus.com/reference/ctime/strftime/). In extension, it can be prefixed with an exclamation mark
     * (`!`) to use UTC time instead of the server's local timezone.
     *
     * If the format is exactly `*t` (optionally prefixed with `!`), a table will be returned instead. This table has
     * fields for the year, month, day, hour, minute, second, day of the week, day of the year, and whether Daylight
     * Savings Time is in effect. This table can be converted to a UNIX timestamp (days since 1 January 1970) with
     * os.date.
     *
     * @since 1.83.0
     * @example
     *     // Print the current date in a user-friendly string.
     *     os.date("%A %d %B %Y"); // See the reference above!
     *
     * @param [formatA] The format of the string to return. This defaults to `%c`, which expands to a string similar to
     *   "Sat Dec 24 16:58:00 2011".
     * @param [timeA] The time to convert to a string. This defaults to the current time.
     * @returns The resulting format string.
     * @throws If an invalid format is passed.
     */
    function date(formatA?: string, timeA?: number): string;
}
