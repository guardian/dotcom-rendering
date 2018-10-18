# Elements as Components

## Context

CAPI provides a representation of content which is strongly typed and like components.

### CAPI Elements as Components

The CAPI Blocks API exposes a suite of strongly typed elements. A component should be made for each element to render it.

#### Elements Types

Each element must have a type in dotcom rendering which specifies the data it may contain. It must have a `_type` field with a string literal of the elements name. This is to be used identifying which component to render.

#### Unaltered Elements

Some elements are represented in CAPI in a form which is directly renderable. For instance the `TextBlockElement`. These may be sent unaltered to dotcom rendering.

Their `_type` field must remain unaltered from the CAPI response. They should be of the form `model.liveblog.`.

### Altered Elements

Some elements contain data which is unsuitable for direct rendering, these should be transformed outside of dotcom rendering. Their `_type` field should be set and should read `dotcom.element.`.

An element should not merely contain an `html` field. Except in the cases where any other representation would be equivalently complex in representation. This may be used as a stop gap solution.

### Functionality

A component must take an element, as described above and render it.

Logic within these components should be kept to an absolute minimum.

## Decision


## Consequences

It must also be decided how dotcom should process CAPI elements which cannot be passed unaltered.

## Status

Spike raised as a PR.
