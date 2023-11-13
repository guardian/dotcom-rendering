# Email Newsletters Page

## Overview

The [editorial newsletters page](https://www.theguardian.com/email-newsletters) is a dedicated page for displaying the editorial newsletters that readers can subscribe to a presenting a UI to enter their email addresses and sign up.

It is served using a dedicated route handler (dotcom-rendering/src/server/index.allEditorialNewslettersPage.web.ts) and layout, but follows broadly the same pattern as the article and fronts pages, IE:
 - frontend posts a JSON body to the route for the page (https://www.theguardian.com/email-newsletters.json will output the page model)
 - the JSON is validated against the schema for the page model
 - the page model is "enhanced" (se dotcom-rendering/src/model/enhance-newsletters-page.ts)
 - the enhanced page model is passed to a render function to produece the HTML to return to frontend

## Arranging the Newsletters

The page model from frontend includes an array of the `Newsletters` that can be rendered on the page, but how those newsletters are sorted and grouped on the layout is determined by the `enhanceNewslettersPage` function.

In effect, to add a new newsletter to the page, or change the ordering, update the data in this file:
dotcom-rendering/src/model/newsletter-grouping.ts

The file allows for alternative arrangements of newsletters based on the `EditionId`. The property used in the arrays of newsletters is the `Newsletter.identityName`.
