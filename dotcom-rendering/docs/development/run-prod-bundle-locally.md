# Run the production bundle locally

While slow to iterate, it can sometimes be useful to build and run the
production build locally.

To do this:

    $ make build
    $ node dist/server.cjs

*Note, you will need AWS `frontend` credentials to run the service.*

You can then use the provided GET endpoints for testing:

    /Article
    /AMPArticle

Similar to the dev server, both endpoints support a `url` parameter to customise
the article used. E.g.

    GET /Article/https://www.theguardian.com/my-test-article.

*Note, PROD Frontend doesn't use these endpoints. Instead, it `POSTs` data to
DCR and receives a JSON response. A tool like Postman can help if you want to
replicate this exactly.*
