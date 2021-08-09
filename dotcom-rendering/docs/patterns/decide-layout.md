# DecideLayout

The [DecideLayout](/src/web/layouts/DecideLayout.tsx) component is the point of entry when server side rendering an article. It is meant to make one decision: which layout file should be used for this article?

It uses the [switch pattern](switch-on-display-design.md) for Display and Design type to keep the code scalable as we add more layout types and the decision gets more complicated.
