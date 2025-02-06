# Email Newsletters Page

## Overview

The [editorial newsletters page](https://www.theguardian.com/email-newsletters) is a dedicated page for displaying the editorial newsletters that readers can subscribe to a presenting a UI to enter their email addresses and sign up.

It is served using a dedicated route handler ([dotcom-rendering/src/server/handler.allEditorialNewslettersPage.web.ts](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/server/handler.allEditorialNewslettersPage.web.ts)) and layout, but follows broadly the same pattern as the article and fronts pages, IE:

-   frontend posts a JSON body to the route for the page (https://www.theguardian.com/email-newsletters.json will output the page model)
-   the JSON is validated against the schema for the page model
-   the page model is "enhanced" ([see dotcom-rendering/src/model/enhance-newsletters-page.ts](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/model/enhance-newsletters-page.ts))
-   the enhanced page model is passed to a render function to produece the HTML to return to frontend

## Arranging the Newsletters

The page model from frontend includes an array of the `Newsletters` and an optional `layout` describing which of the `Newsletters` are rendered and how they are sorted and grouped on the page.

The `layout`s send from frontend are defined in the [newsletters tool](https://newsletters-tool.gutools.co.uk/layouts).

If no `layout` is provided by frontend, the `enhanceNewslettersPage` uses a default grouping to arrange the `Newsletters`.
