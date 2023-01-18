# How-tos

## Q. How can I add to this document?

We welcome additions and corrections! If you want to add a task that you know
how to accomplish already, please feel free to raise a pull request for this
file, suggesting your change. If you have a question which you think we should
answer, but you don't know how to answer it yourself, you can open an issue
describing the question.

Something to bear in mind is that documentation like this can easily go out of
date, so we aim to focus on topics which (hopefully) won't change too quickly.

## Q. How can I add client-side JavaScript?

Most of the DCR Preact project is server-side rendered (SSR), and this is by design.
We aim to minimise the amount of client-side JavaScript that we ship, so SSR
should be the default choice.

If you need JavaScript on the client, there are two main options:

1. Vanilla JavaScript can be added inline to an SSR component in a `<script>` tag.
2. 'Islands' (small, encapsulated bits of React code) can be hydrated on the
   client.

Both of these approaches should be used with caution, though. Feel free to reach
out to the team if you're working on a feature in DCR which needs client-side scripts!
