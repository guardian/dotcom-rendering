# Click To View

## Overview

We support embedding many types of third party content in our products. There is the potential for the third party
to do a certain amount of tracking of our reader's activity of their use of our product using their embedded content.

In an attempt to give the reader choice about being tracked by the third parties we have implemented a
'click to view' system.

Some third parties support do-not-track features for their product eg youtube provide a youtube-nocookie.com domain
for embedding their videos which prevents tracking. In these cases we will continue to display the embedded content
as normal.

For providers that do not support do-not-track we will display an overlay informing the user of the potential of
being tracked and requiring them to click to 'consent' to being tracked by the third party before seeing the content.

## Changes to CAPI

The classification of which provider should be behind 'click to view' is done centrally in CAPI. Each element that
can contain third party embedded content will have some addition fields that support rendering 'click to view'. Eg:

```json
{
    "type": "document",
    "documentTypeData": {
        ...
        "source": "Scribd",
        "sourceDomain": "scribd.com"
    },
    "tracking": {
        "tracks": "tracks"
    }
}


```

## Click to view component

The [ClickToView](../../src/web/components/ClickToView.tsx) implements the 'click to view' behaviour and is wrapped
around the elements component in [ArticleRender](../../src/web/lib/ArticleRenderer.tsx). As click to view requires
javascript in client to work, any component wrapped in needs to be hydrated, in [App](../../src/web/components/App.tsx).

Ideally changes to the 'tracking' status of an element in CAPI would immediately be reflected in the rendering of
that component.

However due to the overhead associated with hydration we chose not to hydrate elements that are not _currently_
classified as tracking. For example, vimeo might stop supporting their 'do-not-track' feature as some point, but
we do not wrap the VimeoBlockComponent in a ClickToView component to avoid unnecessary hydration of that component.

In addition the lists of elements stored in window.guardian used to drive hydration in the client are filtered on the
'tracking' status provided by CAPI. This handles the case where a element type can contain both tracking and
non-tracking content. In the case where an element is not tracking and the 'click to view' overlay is not
rendered, there is no need to hydrate the component.

Here is a list of elements in the 'frontend' article json model that can contain third party content with details
of the decision to wrap them in ClickToView or not.

| Element                   | Wrapped in Click to View | Details                                                                                                                                    |
| ------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| DocumentBlockElement      | yes                      | Can contain both Scribd (tracking) and DocumentCloud (non-tracking)                                                                        |
| EmbedBlockElement         | yes                      | Can contain almost anything including content which has its own specific element type eg youtube, twitter                                  |
| InstagramBlockElement     | yes                      | Facebook                                                                                                                                   |
| MapBlockElement           | yes                      | maps are provided by google who track                                                                                                      |
| PullquoteBlockElement     | yes                      | It is possible to include an iframe in a pullquote, its arguable if this should be wrapped in click to view as this rarely if ever happens |
| SoundcloudBlockElement    | no                       | Soundcloud claim to not track users                                                                                                        |
| SpotifyBlockElement       | yes                      | Spotify track users                                                                                                                        |
| TweetBlockElement         | no                       | twitter support a [do-not-track](https://developer.twitter.com/en/docs/twitter-for-websites/privacy) feature                               |
| VideoBlockElement         | no                       | These contain videos from random providers which may track. However we do not currently render these videos 😱                             |
| VideoFacebookBlockElement | yes                      | Facebook                                                                                                                                   |
| VideoVimeoBlockElement    | no                       | Vimeo provide a 'do-not-track' feature                                                                                                     |
| VideoYoutubeBlockElement  | no                       | Youtube provide a 'do-not-track' feature                                                                                                   |
| WitnessTypeBlockElement   | no                       | Witness is part of the Guardian, post can contain Youtube videos which supports a 'do-not-track' feature.                                  |
