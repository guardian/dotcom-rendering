# Run the production bundle locally

While slow to iterate, it can sometimes be useful to build and run the
production build locally.

To do this:

    $ make build
    $ make prod-local

The PROD server should start on its default port 9000.

You can then use the provided POST endpoints for testing e.g.:

    /Article
    /Front

Unlike the DEV server, the DCAR PROD server does _not_ implement GET endpoints.

As in production, it expects the Frontend JSON data model to be
`POSTed` to DCAR.
