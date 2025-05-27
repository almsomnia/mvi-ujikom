/**
 * Infer the type of the object that the given Yup schema would validate.
 * Example:
 *
 */
declare type InferSchema<T> = import("yup").InferType<T>

/**
 * A type that represents a string that is known to be one of the specific values in S.
 * This type is used to hint to TypeScript that a string is known to be one of the specific values in S, but can also receives other values outside S.
 * This can be useful for when you want to narrow the type of a string from a generic type (e.g. string) to a more specific type (e.g. one of the values in an enum).
 *
 * @example
 *   type Fruit = 'apple' | 'banana' | 'orange';
 *   const fruit: HintedString<Fruit> = 'apple'; // fruit is now known to be one of the values in Fruit
 */
declare type HintedString<S> = S | (string & {})

/**
 * A utility type that makes all properties of a type nullable,
 * including nested objects and arrays.
 */
declare type Nullable<T> =
   T extends Array<infer U>
      ? Array<Nullable<U>> | null
      : T extends object
        ? {
             [K in keyof T]: Nullable<T[K]> | null
          }
        : T | null
