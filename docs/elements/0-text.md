# Text Element

An element which contains a contiguous block of marked up body text.

## CAPI representation

This has an `ElementType` of [TEXT](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L45) with fields described by [TextElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L377) containing a single field `optional string html` .

## Frontend Representation

This is represented in frontend by [TextBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L9). This has a single field `html` containing `Option[String]`.

## Current HTML Output

This is inserted raw into the document.

## Article Cleaned HTML

This is run through the [BodyCleaner](https://github.com/guardian/frontend/blob/ffe63354bb03cc2628ad15d65c4294e9c97e52d1/article/app/views/package.scala#L39)

## AMP Cleaned HTML

This is run through the BodyCleaner and the AMP cleaners.
