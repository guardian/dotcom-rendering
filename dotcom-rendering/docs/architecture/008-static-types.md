# Static types

## Context

Adding static types to a JavaScript project can be incredibly useful to reduce the likelihood of introducing runtime type errors.

We have considered two methods of adding static types to dotcom-rendering.

### Flow

Flow makes it easy to retrofit a useful level of implicit type checking to a legacy project.

However, it produces error messages that are difficult to understand.

Flow requires developers to check in types for 3rd party libraries. These can be automatically generated based on the `package.json`, but developers must remember to keep these up to date.

Its configuration is often too coarse-grained, meaning code gets littered with opt-outs and `any` types. It doesn't feel like a natural type system, as it is only annotations on top of a dynamic language.

Flow's types are not exact by default.

The ecosystem is still immature.

### TypeScript

TypeScript produces more understandable error messages.

It allows developers to install versioned types for third party libraries.

TypeScript is a language in its own right, and feels more natural. It can improve JavaScript language features to make them more type-friendly. Its configuration is more fine-grained.

Types are exact by default.

The ecosystem is more mature.

## Decision

Use TypeScript for static typing.

## Consequences

The likelihood of introducing runtime errors will be reduced, but at the cost of complexity. We need to remain vigilant that TypeScript is serving to help us catch bugs and document our code structure, rather than simply slowing down development and making our code harder for developers and designers to understand.

## Status

Approved
