# `.env` File

Any values in the `.env` file [shouldn't be required to run the application locally](../values/README.md#env-shouldnt-be-required) - to keep it as approachable as possible.

When starting up the application for the first time with `make dev` DCR will automatically generate an env file if you have Frontend [Janus](https://janus.gutools.co.uk/) credentials.
This `.env` will then persist on your local drive for subsequent running of DCR. If there are changes to the `.env` file, it will automatically try and fetch these next time you run `make dev`.

Janus credentials are needed to access AWS Parameter Store, which is the [recommended method](https://github.com/guardian/dotcom-rendering/issues/4823) of storing secrets at The Guardian.

### What if I don't have Janus credentials?

DCR should work without having the `.env` file, but some functionality may differ from prod.

If you don't have Janus credentials, you can ask an existing DCR developer to send you their `.env` through [ZeroBin](https://zerobin.gutools.co.uk/).

## Making Changes

Where possible, you should always investigate other ways to get your data into DCR, such as by passing through [Frontend](https://github.com/guardian/frontend). DCR's `.env` should be used only for secrets that can't be exposed by other APIs.

If your team needs to add or change a value in the `.env` file, we always recommended [raising an issue](https://github.com/guardian/dotcom-rendering/issues/new) to discuss with the Dotcom Team first.

To add a secret to the `.env` file, you should update [secrets.js](../../scripts/secrets.js) to include your new item.

For each secret you must specify -

-   the `key` in parameter store (prefixed by `dotcom/<dev|code|prod>/`)
-   a `missingMessage` which describes the fallback functionality for somebody who does not have the value in their `.env` file.

Example:

```js
const secrets = [
    // ...
    {
        key: 'YOUR_KEY',
        missingMessage: 'What happens when the secret is missing',
    },
    // ...
];
```
