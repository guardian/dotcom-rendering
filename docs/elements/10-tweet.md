# Tweet Element

An element which contains a tweet.

## CAPI representation

This has an `ElementType` of [TWEET](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L95) with fields described by [TweetElementFields](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L389).

This also has an asset type [TWEET](https://github.com/guardian/content-api-models/blob/master/models/src/main/thrift/content/v1.thrift#L204). Tweets stored in CAPI also have some data about their associated imagery stored.

You can search for tweets in CAPI with `CAPI/search?show-elements=tweet`

## Frontend Representation

This is represented in frontend by [TweetBlockElement](https://github.com/guardian/frontend/blob/9a2e342437858c621b39eda3ea459e893770af93/common/app/model/liveblog/BlockElement.scala#L9). This has a single field `html` containing `Option[String]`.

## Current HTML Output

These are dynamically enhanced on the client side by loading the twitter javascript if needed.

## Article Cleaned HTML

## AMP Cleaned HTML

## Salient Points

We store enough in CAPI to handle deleted tweets and displaying their images without the twitter js enhancement.
