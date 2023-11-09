# CSS-in-JS

## Context

There are a number of ways in which we could apply styles to components.

### CSS-in-JS

CSS-in-JS is a catch-all terms for defining CSS directly in JavaScript. It allows us to defining the styles in the same place as the markup (JSX) and component logic.

Styles may be defined as JavaScript objects, with some syntactical overhead (camel case rules instead of kebab case, pseudo-selectors and media queries are wrapped in quotes, ...). Alternatively, they may be defined as tagged template literals, which look much like CSS but require some additional tooling in developer IDEs (i.e. plugins for syntax highlighting).

CSS-in-JS is supported by a number of different libraries such as [Emotion](https://emotion.sh/), [Styled Components](https://www.styled-components.com/docs/basics#getting-started) (both with TTL support), [Glamor](https://github.com/threepointone/glamor) and [Styletron](https://github.com/styletron/styletron) (no TTL support).

### [CSS Blocks](https://css-blocks.com/)

CSS Blocks allows developers to define their CSS in `*.css` files and import them into JavaScript. It makes use of familiar CSS syntax, with clever use of attribute selector notation and the [`obj-str`](https://github.com/lukeed/obj-str) library to change styles based on props. The output is highly-efficient atomic CSS. The use of `obj-str` may make a steep learning curve for non-client-side-developers.

### CSS in `*.css` files imported with custom Webpack CSS loader

It is possible to write a Webpack loader that will load the contents of `*.css` files and manipulate the content to make it usable with CSS-in-JS libraries. This would lock us in to Webpack and may become considerably complex over time.

### [Stylable](https://stylable.io/)

Similar to CSS Blocks, Styleable allows developers to write `*.css` files that look and feel like CSS, with added syntax that adheres "to the spirit of CSS". It provides access to state using custom pseudo-classes and pseudo-elements and uses a pre-processor to convert files down to vanilla CSS.

## Decision

Use CSS-in-JS to represent styles.

## Consequences

Despite being defined in JavaScript, The TTL flavour of CSS-in-JS provides the most idiomatic CSS-like experience of the evaluated options. It will be necessary to use a compatible library such as Emotion.

Users familiar with CSS but not JavaScript will undergo a learning curve, so it will be necessary to provide introductory training, alongside a clear and opinionated code style guide.

It is important to listen to feedback from developers and designers at various levels of JavaScript experience to ensure we provide the best environment for CSS-in-JS development.

## Status

Approved
