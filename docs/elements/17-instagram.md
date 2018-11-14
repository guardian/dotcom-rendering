# Instagram Element

An element which represents an intstagram element.

## CAPI representation

This has an `ElementType` of [INSTAGRAM](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L131) with fields described by [InstagramElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L633).
```
    1: required string originalUrl

    2: required string title

    3: required string source

    4: required string authorUrl

    5: required string authorUsername

    6: optional string html

    7: optional i32 width

    8: optional string alt

    9: optional string caption
```

## Frontend Liveblog Representation

This is represented in frontend by [InstagramBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L23). This has a single field `html` containing `Option[String]`.

## CAPI HTML Output

Absolute tonnes of it wow.

## AMP Cleaned HTML

An amp tag [`<amp-instagram>`](https://www.ampproject.org/docs/reference/components/amp-instagram) exists to represent this content.

It requires the following data:

`data-shortcode` | the URL slug for the embed
`data-captioned` | whether a caption is displayed
`width` | the width of the image (not the whole embed)
`height` | the height of the image (not the whole embed)
