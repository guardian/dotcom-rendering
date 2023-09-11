# Interactive Pressing

## Context

We want to serve 100% of articles via DCR.

Interactives are included in this target but are difficult to serve via DCR whilst also maintaining an acceptable design.

## Decision

We will press interactives (see the [Interactive Librarian](https://github.com/guardian/frontend/blob/main/docs/06-features-and-components/04-The-Interactive-Librarian/01-README.md)) and agree which pressed interactives will be served to readers.

We will migrate all other interactives - these interactives will render via DCR.

After 3 months we will review whether the migration is completed, at which point we'll remove the rendering code from frontend.

Full details of the migration process are [here](https://github.com/guardian/frontend/blob/main/docs/06-features-and-components/04-The-Interactive-Librarian/02-interactive-migration.md).

## Status

Approved
