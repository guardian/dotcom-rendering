# Emotion

## Context

Using a CSS-in-JS library will allow us to scope styles to a component. Popular CSS-in-JS libraries include Styled Components, Emotion and Styletron.

Styletron generates atomic CSS, guaranteeing the smallest possible CSS output. However, it does not support language features that cannot be atomised, such as nesting and sibling selectors.

Styled Components and Emotion support more complex features and have a similar API (composing styled components using the `styled()` method). Emotion additionally supports adding styles to the `css` prop on React components. It is also smaller (5.66KB Gzipped vs 16.27KB for styled-components).

## Decision

We will use Emotion as our CSS-in-JS library.

## Status

Approved
