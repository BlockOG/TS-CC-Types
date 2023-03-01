/** @noSelfInFile */

// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * Disk drives are a peripheral which allow you to read and write to floppy disks and other
 * "mountable media" (such as computers or turtles). They also allow you to
 * {@link playAudio play records}.
 *
 * When a disk drive attaches some mount (such as a floppy disk or computer), it attaches a folder
 * called `disk`, `disk2`, etc... to the root directory of the computer. This folder can be used to
 * interact with the files on that disk.
 *
 * When a disk is inserted, a `disk` event is fired, with the side peripheral is on. Likewise, when
 * the disk is detached, a `disk_eject` event is fired.
 *
 * | API                                        | Description                                                |
 * | ------------------------------------------ | ---------------------------------------------------------- |
 * | {@link isDiskPresent isDiskPresent()}      | Returns whether a disk is currently inserted in the drive. |
 * | {@link getDiskLabel getDiskLabel()}        | Returns the label of the disk in the drive if available.   |
 * | {@link setDiskLabel setDiskLabel([label])} | Sets or clears the label for a disk.                       |
 * | {@link hasData hasData()}                  | Returns whether a disk with data is inserted.              |
 * | {@link getMountPath getMountPath()}        | Returns the mount path for the inserted disk.              |
 * | {@link hasAudio hasAudio()}                | Returns whether a disk with audio is inserted.             |
 * | {@link getAudioTitle getAudioTitle()}      | Returns the title of the inserted audio disk.              |
 * | {@link playAudio playAudio()}              | Plays the audio in the inserted disk, if available.        |
 * | {@link stopAudio stopAudio()}              | Stops any audio that may be playing.                       |
 * | {@link ejectDisk ejectDisk()}              | Ejects any disk that may be in the drive.                  |
 * | {@link getDiskID getDiskID()}              | Returns the ID of the disk inserted in the drive.          |
 *
 * @noSelf
 */
declare interface DrivePeripheral extends AnyPeripheral {
    /**
     * Returns whether a disk is currently inserted in the drive.
     *
     * @returns Whether a disk is currently inserted in the drive.
     */
    isDiskPresent(): boolean;

    /**
     * Returns the label of the disk in the drive if available.
     *
     * @returns The label of the disk, or `undefined` if either no disk is inserted or the disk
     *          doesn't have a label.
     */
    getDiskLabel(): string | undefined;

    /**
     * Sets or clears the label for a disk.
     *
     * If no label or `undefined` is passed, the label will be cleared.
     *
     * If the inserted disk's label can't be changed (for example, a record), an error will be
     * thrown.
     *
     * @param [label] The new label for the disk.
     * @throws If the disk's label can't be changed.
     */
    setDiskLabel(label?: string): void;

    /**
     * Returns whether a disk with data is inserted.
     *
     * @returns Whether a disk with data is inserted.
     */
    hasData(): boolean;

    /**
     * Returns the mount path for the inserted disk.
     *
     * @returns The mount path for the disk, or `undefined` if no data disk is inserted.
     */
    getMountPath(): string | undefined;

    /**
     * Returns whether a disk with audio is inserted.
     *
     * @returns Whether a disk with audio is inserted.
     */
    hasAudio(): boolean;

    /**
     * Returns the title of the inserted audio disk.
     *
     * @returns The title of the audio, `false` if no disk is inserted, or `undefined` if the disk
     *          has no audio.
     */
    getAudioTitle(): string | false | undefined;

    /** Plays the audio in the inserted disk, if available. */
    playAudio(): void;

    /**
     * Stops any audio that may be playing.
     *
     * @see {@link playAudio}
     */
    stopAudio(): void;

    /** Ejects any disk that may be in the drive. */
    ejectDisk(): void;

    /**
     * Returns the ID of the disk inserted in the drive.
     *
     * @returns The ID of the disk in the drive, or `undefined` if no disk with an ID is inserted.
     * @since 1.4
     */
    getDiskID(): number | undefined;
}
