# Elements as Components

## Context

CAPI provides a representation of content which is strongly typed and like components.

Frontend uses this representation to render liveblogs.

_Note: This document has been updated with the knowledge that the `model.liveblog` representation is a dotcom abstraction and not directly from CAPI._

## Decision

The CAPI Blocks API exposes a suite of strongly typed elements. A component should be made for each element to render it.

Each element must have a type in dotcom rendering which specifies the data it may contain. It must have a `_type` field with a string literal representing the element's name. This should be used to identify which component to render.

#### Unaltered Elements

Some elements are converted for the liveblog into a form which is directly renderable. For instance the `TextBlockElement`. These may be sent unaltered to dotcom rendering.

### Altered Elements

Some elements contain data which is unsuitable for direct rendering, these should be transformed outside of dotcom rendering. Their `_type` field should be set.

The transformed element should contain all of the `Props` required by the Components which render the element. It should not dictate HTML to be rendered into the page except where unavoidable. An element might need to directly set HTML if it contains text with markup. For instance, bold, italics and inline text in a `textBlockElement`.

### Functionality

A component must take an element, as described above and render it.

Logic within these components should be kept to an absolute minimum.

## Consequences

It must also be decided how dotcom should process CAPI elements which cannot be passed unaltered.

## Status

Adopted.
