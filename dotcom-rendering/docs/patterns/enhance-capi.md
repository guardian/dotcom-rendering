# Enhance CAPI

The enhance CAPI pattern is one where the CAPI object is transformed into a different, more useable, format. In particular, it relates to the `blocks` array. Each enhancement function, takes the `CAPIArticleType` and returns the `CAPIArticleType`.

## Lexicon

An 'enhancement' could also be termed a 'transformation' and in other places similar functions are referred to as 'cleaners'.

## Why?

Ideally, these transformations would not be required. A better solution would be to construct the array at source, in Composer or CAPI, with the ideal structure. But for - probably very good - reasons the decision was taken to use [cleaners in frontend](https://github.com/guardian/frontend/blob/aa0013a6f9c247be36d29b9716e0ccc80cc8b218/common/app/views/support/HtmlCleaner.scala) to solve design problems. So now, in order to support the same designs, we need to replicate these cleaners in DCR. The enhancements are applied in the [server/server.ts](/dotcom-rendering/src/web/server/server.ts).

## Examples

### DropCaps

Certain article types, such as Features, have the first letter of the first paragraph marked as a DropCap. However, there was a requirement to sometimes also have other paragraphs be given a DropCap. But composer does not offer a way to mark a paragraph as, say, `dropcap: true`, so instead a convention was invented where, if the preceding element was an `h2` tag containing '\* \* \*', then that was the trigger to give the following paragraph drop cap styling.

In DCR we replicate this using [enhance-dividers.ts](/dotcom-rendering/src/model/enhance-dividers.ts)

### Images

There are some conventions that can result in images appearing differently, we need a cleaner to support these while we wait for support for them to be added natively to Composer.

Multi images. Consecutive sequences of two halfWidth images will be merged into a MultiImageBlockElement and shown side by side
Captions. A `ul`/`li` tag directly after an image will replace the preceding image's caption

In particular, Photo essay articles needs a lot of cleaning to achieve the intended designs. They use special caption styles and can sometimes have titles overlaying images.

In DCR we support these conventions using [enhance-images.ts](/dotcom-rendering/src/model/enhance-images.ts)

## How remove these enhancement functions

The construction of these functions has been done with the goal of removing them in mind. Where changes to elements have been needed they have been done in such a way as to be generic. For example, the special image titles used in photo essays are available for all images, on all article types. By doing this we create a design language that is more flexible so that if we later improve Composer to support, say, adding drop caps to any paragraph, or adding a title string to an image, then this will just work.

For more information on how and why we'd like to improve cleaners see: https://docs.google.com/document/d/1ESuP7jEOEdbqbJ3mwuBXJxt6wXuGv9_klP3e2JXfSQY/edit
