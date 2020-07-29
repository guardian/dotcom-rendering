# Local Sign In

Sometimes you might want to access DCR locally as a signed in Guardian reader.
These are the steps required to achieve that.

## Set the GU_U Cookie

Set the `GU_U` cookie for the host and port you're running the local DCR dev
server on (http://localhost:3030 by default) using your browser's dev tools.
You can get the cookie value by signing into production and copying it from
there using the developer tools.

## Set the SC_GU_U Cookie

The `GU_U` cookie is used by client side code as a lightweight check of whether
a user can be considered logged-in. However ultimately we need the request to
the discussion API from the browser to succesfully authenticate for the user to
be properly logged in. This requires the `SC_GU_U` cookie to be set. The domain
you need to have the cookie set for is determined by the instance of the
discussion API you're talking to since this is config found in the CAPI data.

So if the URL you provide to the `/Article` endpoint is a prod URL, then this
will be the prod discussion API which requires the cookie to be set for
`.theguardian.com`. The easiest way to achieve this is to actually sign in on
the relevent environment, in this case production.
