# Text Element

An element which contains a contiguous block of marked up body text.

## CAPI representation

This has an `ElementType` of [TEXT](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L45) with fields described by [TextElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L377) containing a single field `optional string html` .

## Frontend Liveblog Representation

This is represented in frontend by [TextBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L9). This has a single field `html` containing `Option[String]`.

## CAPI HTML Output

This is inserted raw into the document.

## Article Cleaned HTML

This is run through the [BodyCleaner](https://github.com/guardian/frontend/blob/ffe63354bb03cc2628ad15d65c4294e9c97e52d1/article/app/views/package.scala#L39)

The [InBodyLinkCleaner](https://github.com/guardian/frontend/blob/bb83dabb21aea326c67168d0e0d3f6d4ccef6af5/common/app/views/support/HtmlCleaner.scala#L225) is used to style links and allow in body and supporte links to be tracked using the `data-link-name` attribute.

The [BlockNumberCleaner](https://github.com/guardian/frontend/blob/bb83dabb21aea326c67168d0e0d3f6d4ccef6af5/common/app/views/support/HtmlCleaner.scala#L30) replaces `<!-- Block (\d*) -->` with block numbers. Seems to be an artifact from [R2](https://github.com/search?p=2&q=org%3Aguardian+%22%3C%21--+Block+%28%5Cd%2A%29+--%3E%22&type=Code). It doesn't seem to have been used recently.

[DropCaps](https://github.com/guardian/frontend/blob/bb83dabb21aea326c67168d0e0d3f6d4ccef6af5/common/app/views/support/HtmlCleaner.scala#L539) decides whether the first word character and preceeding punctuation should be a drop cap.

### Other Cleaners (todo)

- TagLinker
    - Turns specific mentions of tags into links, needs validation that its useful.
- BlockquoteCleaner
    - Does something to blockquotes, which might be part of a TextBlockElement.
- PullquoteCleaner
    - Works on its own element type.
- PhotoEssayBlockQuote
- ImmersiveLinks
- TimestampCleaner
    - Only related to the minute.
- MinuteCleaner
    - Only used for the minute.
- GarnettQuoteCleaner
    - Something else about quotes.
- AffiliateLinksCleaner
    - Rewrites URLs on applicable links and adds a disclaimer.
- AttributeCleaner("style")
    - Removes inline style on amp articles. Inline style could be in a text block, but it's unlikely.



## AMP Cleaned HTML

This is run through the BodyCleaner and the AMP cleaners.
