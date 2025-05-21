# AB Testing

## Technical Overview

This will be a central location for all AB tests running on the theguardian.com. The goal is to have a single source of truth for both client and server side tests.

The build and release CI steps will ensure that the tests are validated and serialized correctly before being uploaded to the Fastly dictionary API.

Example dictionary setup:

```
# our mvt space and which test groups are occupying it
table mvt_ab_test_groups {
  "mvt0": "0=commercial-ad-block-ask:control,1=commercial-some-100-perc-test:control",
  "mvt1": "0=commercial-ad-block-ask:variant,1=commercial-some-100-perc-test:variant",
}

# This table contains the active A/B test groups and their parameters
table active_ab_test_groups {
  "commercial-ad-block-ask:control": "exp=1745971200,type=client",
  "commercial-ad-block-ask:variant": "exp=1745971200,type=client",
  "commercial-some-100-perc-test:control": "exp=1745971200,type=server",
  "commercial-some-100-perc-test:variant": "exp=1745971200,type=server"
}
```

The `mvt_ab_test_groups` table will be used to determine which test a user is in, and the `active_ab_test_groups` table will be used to determine if a test is active and what type it is.

Having both client and server side tests managed here will allow us to use the same logic (within fastly) to determine which test a user is in regardless of if it is client or server side. [See the fiddle for more details](https://fiddle.fastly.dev/fiddle/47149485).

Our fastly vcl code will set a cookie that can be used by client or server code to determine which test a user is in. For server side tests it will additionally add to a header that the cache will be split on.

Opting in to a test will be done similarly to how we do it for server side tests now, by setting a cookie.

Test expirations are stored in the dictionary, and checked by fastly to determine if a test is still active, if a test is expired it won't be served to users.

0% tests are in the `active_ab_test_groups` table so we can still force ourselves into them, but they are not in the `mvt_ab_test_groups` table as they don't take up any mvt id space.

## Limitations

-   The dictionary API has a limit of 1000 items per dictionary, we won't get anywhere near this limit, but it's worth noting.
-   This setups reduces our mvt id space from 0-999999 to 0-999, this should be fine as we have rarely used decimal precision test sizes. This would only came up for example with a multi-variant test that doesn't divide evenly into the total test size, with the current config we sent the variant/group size explicitly so this won't be an issue.

## How build/CI step will work

### PR

-   Import the ab tests
-   Validate the ab tests
    -   Check if there's enough space, all test variant percentages need to add up to <=100%
    -   Check there aren't too many server side tests (to avoid splitting the cache too much, acceptable number TBD)
    -   Validate the test expiration date is in the future and on a weekday
-   Generate a visual representation of the tests and add it to the PR as a comment, with before/after?
-   Also update visual in a markdown file in the repo
-   Build/serialize the tests (to check it works)

### Release

-   Import and validate
-   Build/serialize the tests
    -   Build the keys and values for the dictionary
-   Uploads the key-values to the fastly dictionary
    -   Requries some work to interact with the [fastly dictionary API](https://www.fastly.com/documentation/reference/api/dictionaries/dictionary-item/)

### Build output example

See the [config-build-example.md](./docs/config-build-example.md) for a full example of the build output.

## Testing the new AB testing framework

### CI Validation/Build/Deploy Steps

The steps can all be run locally using the `deno run` command, see the [deno.json](./deno.json) file for the commands.

The steps have unit tests that can be run using the `deno test` command.

The `deploy` step requires some environment variables to be set [see env.ts](./scripts/deploy/env.ts), and will upload the dictionary to fastly, and can be run on a test fastly service.

### VCL

The vcl is just here as a reference example. It will live with the rest of our fastly vcl.

It can be tested using the DEV/CODE environment for our fastly service.

## How running AB tests will work

### Creating a test

Open a PR and add a test to the `abTest.ts` file in the `ab-testing/src` directory.

Github actions will run the build and validate the test on the PR.

Once the test is validated and PR merged, the release process will upload the test to Fastly.

If the test state is `ON` and it is not expired it will be served to users as expected.

Page responses in a client side test will have a cookie set that can be used by the client side code to determine which test the user is in.

Page responses in a server side test will get a cookie set that can be used by client or server side code to determine which test the user is in, and a header that will be used by fastly/frontend to split the cache.

### Opting in/out of a test

Using the relevant URL to opt in or out of a test, this will set or remove a cookie that will be used by fastly to force subsequent responses to the correct test. This is the same for both server and client side tests.

e.g. `/ab-tests/opt-in?group=commercial-ad-block-ask:variant` will set the cookie to force the user into the `commercial-ad-block-ask:variant` test variant.

Locally this can be done by setting the relavent cookie in the browser

For server side tests this might look like:

`Set-Cookie Server_AB_Tests=commercial-ad-block-ask:variant; Path=/; Domain=theguardian.com; Secure; SameSite=None`

For client side tests:

`Set-Cookie Client_AB_Tests=commercial-ad-block-ask:variant; Path=/; Domain=theguardian.com; Secure; SameSite=None`
