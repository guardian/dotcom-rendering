# Support dynamic imports

## Context

The newest versions of Javascript support `import` as a way to dynamically
import modules. Modules live on a URL and can be loaded cross origin.

They are therefore useful in a variety of contexts as a mechanism to lazy-load
content.

Browser-support is high (~90%) but not enough to forgo a polyfill.

## Decision

Support `import` via polyfills for browsers that need them.

As it is not possible to directly override `import`, dynamic import is exposed
via `window.guardianPolyfilledImport`.

## Status

Approved

...
