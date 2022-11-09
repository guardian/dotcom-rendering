> **Warning**
> We no longer sign picture URLs

# DCR now signs image urls

**Refactor Picture.tsx now that DCR can sign image urls itself**

## Context

For more information on how images work in DCR see [this excellent document](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/docs/architecture/027-pictures.md). The changes discussed here build upon that work but, now that DCR is capable of signing urls, it refactors the code to move that step away from Frontend and into DCR.

The image urls used at the Guardian are generated using the [fastly image optimiser [FIO]](https://developer.fastly.com/reference/io/). This service allows us to specify the image widths we want along with other query params affecting the quality of the resulting image.
For a request to this service to be valid it needs to be signed. To date, that signing process has happened in Frontend. This architectural change moves signing into DCR. This was made possible by [PR #4752](https://github.com/guardian/dotcom-rendering/issues/4752).

## Decision

-   DCR now signs requests to the FIO itself
-   Refactor `Picture.tsx` to simplify the construction of the `picture` tag

## Status

Complete

# Write up

Once it became possible to sign the image url in DCR and not have to depend on Frontend to send us an array of sources we were able to remove a confusing coupling in the code. Without this coupling it was possible to simplify the code such that the same file which constructs the `picture` tag is also where the decisions about which widths to use are made and also where the url for each width is signed.

The function `decideImageWidths` is the source of truth for what size images are used at each breakpoint depending on:

-   the role/weighting given to an image
-   the format for the article the image sits in and
-   whether the image is being used as the main media or not

There is now no other code anywhere else which influences this decision. This will make future changes easier.

## No need to pick a source based on a desired width

This paradigm is no longer needed because DCR is now deciding which width to use at each breakpoint so we no longer need to treat the list of sources Frontend gave us as a range of options; we're now building them ourselves and so we're able to be exact in our decisions.
