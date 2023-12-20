# How-tos

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- Automatically created by running `yarn createtoc` in a pre-commit hook -->

-   [How can I add to this document?](#how-can-i-add-to-this-document)
-   [How can I add client-side JavaScript?](#how-can-i-add-client-side-javascript)
-   [How can I create an 'island' in DCR?](#how-can-i-create-an-island-in-dcr)
-   [How to fetch external data on the client?](#how-to-fetch-external-data-on-the-client)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How can I add to this document?

We welcome additions and corrections! If you want to add a task that you know
how to accomplish already, please feel free to raise a pull request for this
file, suggesting your change. If you have a question which you think we should
answer, but you don't know how to answer it yourself, you can open an issue
describing the question.

Something to bear in mind is that documentation like this can easily go out of
date, so we aim to focus on topics which (hopefully) won't change too quickly.

## How can I add client-side JavaScript?

Most of the DCR Preact project is server-side rendered (SSR), and this is by design.
We aim to minimise the amount of client-side JavaScript that we ship, so SSR
should be the default choice.

If you need JavaScript on the client, there are two main options:

1. Vanilla JavaScript can be added inline to an SSR component in a `<script>` tag.
2. 'Islands' (small, encapsulated bits of React code) can be hydrated on the
   client.

Both of these approaches should be used with caution, though. Feel free to reach
out to the team if you're working on a feature in DCR which needs client-side scripts!

## How can I create an 'island' in DCR?

The 'islands' pattern is DCR's way of adding client-side React code to the site.
You can read more about it in our
[Improved Partial Hydration](architecture/027-better-partial-hydration.md)
decision document.

To add an island:

1. Wrap your component on the server with an `<Island>` component.
2. Add `.importable` to the component filename. Eg: `[MyThing].importable.tsx`
3. Specify what should trigger hydration (e.g. waiting until the component
   scrolls into view). See `Island.tsx` props for options.

## How to fetch external data on the client?

DCR doesn't make calls to external services from the server. The server's job is only to
render the data passed to it by a POST request. But it does make requests on the client side.

We currently use [SWR](https://swr.vercel.app/) to manage AJAX requests on the
client. Your starting point should be the [`useApi` hook](../../src/web/lib/useApi.tsx),
which is DCR's wrapper around SWR's own hook. Because this hook requires
client-side React code, you will need to place your component in an `<Island>` wrapper.

Adding some notes to markdown
