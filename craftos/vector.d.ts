/**
 * A basic 3D vector type and some common vector operations. This may be useful when working with
 * coordinates in Minecraft's world (such as those from the {@link gps} API).
 *
 * An introduction to vectors can be found on
 * {@link http://en.wikipedia.org/wiki/Euclidean_vector Wikipedia}.
 *
 * | API                             | Description                                                |
 * | ------------------------------- | ---------------------------------------------------------- |
 * | {@link vector.new new(x, y, z)} | Construct a new {@link Vector} with the given coordinates. |
 *
 * @since 1.31
 * @noSelf
 */
declare interface VectorModule {
    /**
     * Construct a new {@link Vector} with the given coordinates.
     *
     * #### TIP
     *
     * Use `new Vector(x, y, z)` instead of `vector.new(x, y, z)` for a more TypeScripty way of
     * making a vector.
     *
     * @param x The X coordinate or direction of the vector.
     * @param y The Y coordinate or direction of the vector.
     * @param z The Z coordinate or direction of the vector.
     * @returns The constructed vector.
     */
    "new"(x: number, y: number, z: number): Vector;
}

/**
 * A basic 3D vector type and some common vector operations. This may be useful when working with
 * coordinates in Minecraft's world (such as those from the {@link gps} API).
 *
 * An introduction to vectors can be found on
 * {@link http://en.wikipedia.org/wiki/Euclidean_vector Wikipedia}.
 *
 * | API                             | Description                                                |
 * | ------------------------------- | ---------------------------------------------------------- |
 * | {@link vector.new new(x, y, z)} | Construct a new {@link Vector} with the given coordinates. |
 *
 * @since 1.31
 * @noSelf
 */
declare const vector: VectorModule;

/**
 * A 3-dimensional vector, with `x`, `y`, and `z` values.
 *
 * This is suitable for representing both position and directional vectors.
 *
 * @customConstructor vector.new
 */
declare class Vector {
    /** X coordinate of vector. */ x: number;
    /** Y coordinate of vector. */ y: number;
    /** Z coordinate of vector. */ z: number;

    /**
     * Construct a new {@link Vector} with the given coordinates.
     *
     * @param x The X coordinate of the vector.
     * @param y The Y coordinate of the vector.
     * @param z The Z coordinate of the vector.
     */
    constructor(x: number, y: number, z: number);

    /**
     * Adds two vectors together.
     *
     * @param o The second vector to add.
     * @returns The resulting vector
     * @example
     *     print(tostring(v1.add(v2)));
     */
    add(o: Vector): LuaAdditionMethod<Vector, Vector>;

    /**
     * Subtracts one vector from another.
     *
     * @param o The vector to subtract.
     * @returns The resulting vector.
     * @example
     *    print(tostring(v1.sub(v2)));
     */
    sub(o: Vector): LuaSubtractionMethod<Vector, Vector>;

    /**
     * Multiplies a vector by a scalar value.
     *
     * @param m The scalar value to multiply with.
     * @returns A vector with value `(x * m, y * m, z * m)`.
     * @example
     *    print(tostring(v.mul(3)));
     */
    mul(m: number): LuaMultiplicationMethod<number, Vector>;

    /**
     * Divides a vector by a scalar value.
     *
     * @param m The scalar value to divide by.
     * @returns A vector with value `(x / m, y / m, z / m)`.
     * @example
     *     print(tostring(v.div(3)));
     */
    div(m: number): LuaDivisionMethod<number, Vector>;

    /**
     * Negate a vector.
     *
     * @returns The negated vector.
     * @example
     *     print(tostring(v.neg()));
     */
    neg(): LuaNegationMethod<Vector>;

    /**
     * Compute the dot product of two vectors.
     *
     * @param o The second vector to compute the dot product of.
     * @returns The dot product of `self` and `o`.
     * @example
     *     print(tostring(v1.dot(v2)));
     */
    dot(o: Vector): Vector;

    /**
     * Compute the cross product of two vectors.
     *
     * @param o The second vector to compute the cross product of.
     * @returns The cross product of `self` and `o`.
     * @example
     *     print(tostring(v1.cross(v2)));
     */
    cross(o: Vector): Vector;

    /**
     * Get the length (also referred to as magnitude) of this vector.
     *
     * @returns The length of this vector.
     */
    length(): number;

    /**
     * Divide this vector by its length, producing with the same direction, but of length 1.
     *
     * @returns The normalised vector
     * @example
     *     print(tostring(v.normalize()));
     */
    normalize(): Vector;

    /**
     * Construct a vector with each dimension rounded to the nearest value.
     *
     * @param [tolerance] The tolerance that we should round to, defaulting to 1. For instance, a
     *        tolerance of 0.5 will round to the nearest 0.5.
     * @returns The rounded vector.
     */
    round(tolerance?: number): Vector;

    /**
     * Convert this vector into a string, for pretty printing.
     *
     * @returns This vector's string representation.
     * @example
     *     print(v.tostring());
     * @example
     *     print(tostring(v));
     */
    tostring(): string;

    /**
     * Check for equality between two vectors.
     *
     * @param other The second vector to compare to.
     * @returns Whether or not the vectors are equal.
     */
    equals(other: Vector): boolean;
}
