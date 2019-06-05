# Contributing

Paper is our design system and the code for its own documentation. We use `Gatsby` and `gatsby-mdx` to build the site.

All the content is inside `src/content` As we use `markdown` files you are welcome and encouraged to submit pull requests from Github itself to add content to the site.

<!-- START doctoc -->
<!-- END doctoc -->

## Running the docs

If you want to run the docs locally, clone this repo. Then inside the `packages/design` directory, run `yarn develop` to run gatsby locally.

## Technical decision record

### Component sharing

The goal for Paper is that it can consume components from `guui` and `pasteup` for both the purposes of documenting them but also to render its own UI. This is done for code simplicity, but also as a dogfooding mechanism to ensure that our design system is flexible enough to render this completely different set of pages than gu.com.

### CSS Modules

For its own components, Paper uses CSS Modules rather than emotion. We made this decision to have two different usages of `pasteup` in the same codebase (vanilla css & emotion) so we can ensure we are building it in a manner that makes it easy to consume across technologies.
