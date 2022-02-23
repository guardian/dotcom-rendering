# Commercial selectors

## What is the contract?

We place the following classes on the container element of the article body:

-   `article-body-commercial-selector` on the ArticleRenderer
-   `js-liveblog-body` on the ArticleBody when rendering a Liveblog/Deadblog

Furthermore, within the article body, we add the following attribute to certain elements:

- `data-spacefinder-component`

It currently supports two values:

- `numbered-list-title`
- `rich-link`

These are elements spacefinder needs to know about when positioning adverts.

## Where is it relied upon?

It is relied upon in the commercial DCR bundle from frontend.

## Why is it required?

For dynamic placement of adverts in the article body.
