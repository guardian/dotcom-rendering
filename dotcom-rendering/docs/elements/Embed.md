# Generic Embed Element

An element which contains an embed which doesn't have its own element type.

## CAPI representation

This has an `ElementType` of [EMBED](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L55) with fields described by [EmbedElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L622) containing four fields:

- html
- safeEmbedCode
- alt
- isMandatory

This also has an asset type [EMBED](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L203).

## Frontend Representation

This is represented in frontend by [EmbedBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L16). This has the same representation as in CAPI, but does not expose an asset.

## Current HTML Output

Raw.

## Article Cleaned HTML

Appears raw.

If an embed uses `<figure>` tag, then the `ShowAllArticleEmbedsSwitch` can be used with `InBodyElementCleaner` to render a reduced subset of embeds.

## AMP Cleaned HTML

The html included in a potential embed may not be permitted by the AMP specification. For each embed that is renedered in an article we can:

- Transform the embed into something which is valid amp.
- Remove the embed.
- Fail to render the article in AMP.

The field `isMandatory` should control whether an embed is removed or if the page is. Dotcom does not currently support this API, so currently a workaround is used by central production to force the page to fail amp validation.



## Salient Points

