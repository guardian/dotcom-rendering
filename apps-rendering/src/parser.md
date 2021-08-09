# `parser`

A module for parsing `unknown` values into other TypeScript types. It's generic enough to work for any `unknown` value, but is probably most useful for parsing JSON. It attempts to simplify the parsing process by abstracting the repetitive manual checks behind a declarative-style API, based on parser combinators.

It's inspired by the [Elm JSON module](https://package.elm-lang.org/packages/elm/json/latest/), Haskell modules like [ReadP](https://hackage.haskell.org/package/base-4.14.1.0/docs/Text-ParserCombinators-ReadP.html), and various other parser-combinator libraries. It also uses the `Result` and `Option` types available in our [`@guardian/types`](https://github.com/guardian/types) library.

**Note:** There's nothing about this module that requires the use of TypeScript - it will also work perfectly well when used with plain JavaScript.

## Example

Attempting to parse an object of type `Person` from a blob of unknown JSON.

```ts
type Person = { name: string, age: number };

const makePerson = (name: string, age: number): Person => ({
    name,
    age,
});

const personParser: Parser<Person> =
  map2(makePerson)(
    parseField('name', parseString),
    parseField('age', parseNumber),
  );

// The JSON is valid
const jsonA: unknown = JSON.parse('{ "name": "CP Scott", "age": 85 }');
const resultA = run(personParser)(jsonA); // Ok<Person>

// The JSON is invalid
const jsonB: unknown = JSON.parse('{ "name": "CP Scott" }');
const resultB = run(personParser)(jsonB); // Err<string>, 'missing field' err
```

## Background

[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and related methods like [`Body.json`](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) from the Fetch API return their parsed JS data structures as type [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any). The use of `any` is a bit like an escape hatch from the TypeScript type system, and can result in runtime errors elsewhere in the codebase as the value with this type gets passed around and used.

One way around this is to type the returned value from `JSON.parse` as [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) (as discussed in [this issue](https://github.com/typescript-eslint/typescript-eslint/issues/2118#issuecomment-641464651)). TypeScript will then _force_ you to verify the structure of this value, through methods like [type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards) and [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates), before using it. This should significantly reduce the possibility of runtime errors.

A downside to taking this approach, however, is that it can result in quite verbose, repetitive code - particularly when working with complex, nested objects. This is where this module comes in.

## API

The API is documented inline using JSDocs.
