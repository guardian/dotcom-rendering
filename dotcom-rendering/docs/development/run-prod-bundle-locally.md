# Run the production bundle locally

It can be useful to build and run the production build locally.

To do this:

    $ make build
    $ make prod-local

The PROD server should start on its default port 9000.

You can then use the provided POST endpoints for testing e.g.:

    /Article
    /Front

## Notes

The prod server does not have dev server functionality, so if you make changes you will need to rebuild and run.

The prod server does _not_ implement GET endpoints. Hence, as in production, the Frontend JSON data model will need to be
`POSTed` to DCAR.
