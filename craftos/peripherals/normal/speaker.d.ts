/** @noSelfInFile */

// eslint-disable-next-line isaacscript/complete-sentences-jsdoc
/**
 * The speaker peripheral allows your computer to play notes and other sounds.
 *
 * The speaker can play three kinds of sound, in increasing orders of complexity:
 * - {@link playNote} allows you to play noteblock note.
 * - {@link playSound} plays any built-in Minecraft sound, such as block sounds or mob noises.
 * - {@link playAudio} can play arbitrary audio.
 *
 * | API                                                        | Description                                       |
 * | ---------------------------------------------------------- | ------------------------------------------------- |
 * | {@link playNote playNote(instrument [, volume][, pitch])} | Plays a note block note through the speaker.      |
 * | {@link playSound playSound(name [, volume][, pitch])}     | Plays a Minecraft sound through the speaker.      |
 * | {@link playAudio playAudio(audio [, volume])}              | Attempt to stream some audio data to the speaker. |
 * | {@link stop stop()}                                        | Stop all audio being played by this speaker.      |
 *
 * @since 1.80pr1
 * @noSelf
 */
declare interface SpeakerPeripheral extends AnyPeripheral {
    /**
     * Plays a note block note through the speaker.
     *
     * This takes the name of a note to play, as well as optionally the volume and pitch to play the
     * note at.
     *
     * The pitch argument uses semitones as the unit. This directly maps to the number of clicks on
     * a note block. For reference, 0, 12, and 24 map to F#, and 6 and 18 map to C.
     *
     * A maximum of 8 notes can be played in a single tick. If this limit is hit, this function will
     * return `false`.
     *
     * ### Valid instruments
     *
     * The speaker supports
     * {@link https://minecraft.fandom.com/wiki/Note_Block#Instruments all of Minecraft's noteblock instruments}.
     * These are:
     *
     * `"harp"`, `"basedrum"`, `"snare"`, `"hat"`, `"bass"`, `"flute"`, `"bell"`, `"guitar"`,
     * `"chime"`, `"xylophone"`, `"iron_xylophone"`, `"cow_bell"`, `"didgeridoo"`, `"bit"`,
     * `"banjo"` and `"pling"`.
     *
     * @param instrumentA The instrument to use to play this note.
     * @param [volumeA] The volume to play the note at, from 0.0 to 3.0. Defaults to 1.0.
     * @param [pitchA] The pitch to play the note at in semitones, from 0 to 24. Defaults to 12.
     * @returns Whether the note could be played as the limit was reached.
     * @throws If the instrument doesn't exist.
     */
    playNote(
        instrumentA:
            | "harp"
            | "basedrum"
            | "snare"
            | "hat"
            | "bass"
            | "flute"
            | "bell"
            | "guitar"
            | "chime"
            | "xylophone"
            | "iron_xylophone"
            | "cow_bell"
            | "didgeridoo"
            | "bit"
            | "banjo"
            | "pling",
        volumeA?: number,
        pitchA?: number
    ): boolean;

    /**
     * Plays a Minecraft sound through the speaker.
     *
     * This takes the
     * {@link https://minecraft.fandom.com/wiki/Sounds.json name of a Minecraft sound}, such as
     * `"minecraft:block.note_block.harp"`, as well as an optional volume and pitch.
     *
     * Only one sound can be played at once. This function will return `false` if another sound was
     * started this tick, or if some {@link playAudio audio} is still playing.
     *
     * @param name The name of the sound to play.
     * @param [volumeA] The volume to play the sound at, from 0.0 to 3.0. Defaults to 1.0.
     * @param [pitchA] The speed to play the sound at, from 0.5 to 2.0. Defaults to 1.0.
     * @returns Whether the sound could be played.
     * @throws If the sound name was invalid.
     * @example
     *     // Play a creeper hiss with the speaker.
     *     let speaker = peripheral.find<SpeakerPeripheral>("speaker");
     *     speaker.playSound("entity.creeper.primed");
     */
    playSound(name: string, volumeA?: number, pitchA?: number): boolean;

    /**
     * Attempt to stream some audio data to the speaker.
     *
     * This accepts a list of audio samples as amplitudes between -128 and 127. These are stored in
     * an internal buffer and played back at 48kHz. If this buffer is full, this function will
     * return `false`. You should wait for
     * a {@link https://tweaked.cc/event/speaker_audio_empty.html speaker_audio_empty} event before
     * trying again.
     *
     * #### NOTE
     *
     * The speaker only buffers a single call to {@link playAudio} at once. This means if you try to
     * play a small number of samples, you'll have a lot of stutter. You should try to play as many
     * samples in one call as possible (up to 128×1024), as this reduces the chances of audio
     * stuttering or halting, especially when the server or computer is lagging.
     *
     * {@link https://tweaked.cc/guide/speaker_audio.html Playing audio with speakers} provides a
     * more complete guide to using speakers.
     *
     * @param audio A list of amplitudes.
     * @param [volume] The volume to play this audio at. If not given, defaults to the previous
     *        volume given to {@link playAudio}.
     * @returns If there was room to accept this audio data.
     * @throws If the audio data is malformed.
     * @since 1.100
     * @example
     *     // Read an audio file, decode it using `cc.audio.dfpwm`, and play it using the speaker.
     *     import * as dfpwm from "cc.audio.dfpwm";
     *     let speaker = peripheral.find<SpeakerPeripheral>("speaker");
     *
     *     let decoder = dfpwm.make_decoder();
     *     for (const chunk of io.lines("data/example.dfpwm", 16 * 1024)) {
     *         let buffer = decoder(chunk);
     *
     *         while (!speaker.playAudio(buffer)) {
     *             os.pullEvent("speaker_audio_empty");
     *         }
     *     }
     * @see {@link cc.audio.dfpwm} Provides utilities for decoding DFPWM audio files into a format
     *      which can be played by the speaker.
     * @see {@link https://tweaked.cc/guide/speaker_audio.html Playing audio with speakers} For a
     * more complete introduction to the {@link playAudio} function.
     */
    playAudio(audio: number[], volume?: number): boolean;

    /**
     * Stop all audio being played by this speaker.
     *
     * This clears any audio that {@link playAudio} had queued and stops the latest sound played by
     * {@link playSound}.
     *
     * @since 1.100
     */
    stop(): void;
}
