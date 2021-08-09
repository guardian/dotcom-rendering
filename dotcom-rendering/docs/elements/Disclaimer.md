# Disclaimer Element

An element which contains a contiguous block of marked up body text, intended as
a disclaimer - typically placed at the bottom of a block.

## CAPI representation

This element does not exist in CAPI. It was originally introduced as part of
supporting affiliate links, which requires a disclaimer at the bottom of the
article body text.

## Frontend Liveblog Representation

This is represented in frontend by [DisclaimerBlockElement](https://github.com/guardian/frontend/blob/c796e4094bd66b5818458898602685a312dc68de/common/app/model/dotcomrendering/pageElements/PageElement.scala#L40). This has a single field `html` containing `Option[String]`.

## CAPI HTML Output

This is inserted raw into the document.

## AMP Cleaned HTML

This is run through the BodyCleaner and the AMP cleaners.
