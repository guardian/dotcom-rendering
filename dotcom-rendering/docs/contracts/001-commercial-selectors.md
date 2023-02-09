# Commercial selectors

## What is the contract?

### Spacefinder

We place the following classes on the container element of the article body:

-   `article-body-commercial-selector` on the ArticleRenderer
-   `js-liveblog-body` on the ArticleBody when rendering a Liveblog/Deadblog

Furthermore, within the article body, we add the following attributes to certain elements:

- `data-spacefinder-role` which denotes the role of figures (e.g. rich-links). We add this to elements belonging to `Figure` and `InteractiveBlockComponent` components.
- `data-spacefinder-type` the underlying element `_type`

These are elements spacefinder needs to know about when positioning adverts.

### Comments

We place this class on the container of the right column in the comments section. This is so we can measure the size of the available space to place either one or two ads:

- `commentsRightColumn`

## Where is it relied upon?

It is relied upon in the commercial DCR bundle from frontend.

## Why is it required?

For dynamic placement of adverts in the article body.
