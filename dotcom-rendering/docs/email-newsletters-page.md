# Email Newsletters Page

## Overview

The [editorial newsletters page](https://www.theguardian.com/email-newsletters) is a dedicated page for displaying the editorial newsletters that readers can subscribe to a presenting a UI to enter their email addresses and sign up.

It is served using a dedicated route handler ([dotcom-rendering/src/server/handler.allEditorialNewslettersPage.web.ts](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/server/handler.allEditorialNewslettersPage.web.ts)) and layout, but follows broadly the same pattern as the article and fronts pages, IE:

-   frontend posts a JSON body to the route for the page (https://www.theguardian.com/email-newsletters.json will output the page model)
-   the JSON is validated against the schema for the page model
-   the page model is "enhanced" ([see dotcom-rendering/src/model/enhance-newsletters-page.ts](https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/model/enhance-newsletters-page.ts))
-   the enhanced page model is passed to a render function to produece the HTML to return to frontend

## Arranging the Newsletters

The page model from frontend includes an array of the `Newsletters` that can be rendered on the page, but how those newsletters are sorted and grouped on the layout is determined by the `enhanceNewslettersPage` function.

In effect, to add a new newsletter to the page, or change the ordering, update the data in this file:
dotcom-rendering/src/model/newsletter-grouping.ts

The file allows for alternative arrangements of newsletters based on the `EditionId`. The property used in the arrays of newsletters is the `Newsletter.identityName`.

To find the correct position of the newsletter check this [spreadsheet](https://docs.google.com/spreadsheets/d/1Pfdow0Yj8OzkrnIWqIC-oSzVhwtwwDBdLmFx5hY-Gt4/edit#gid=2084088730)

To find the `identityName` of a newsletter or whether it is launched or draft check the [newsletters tool](https://newsletters-tool.gutools.co.uk/)
