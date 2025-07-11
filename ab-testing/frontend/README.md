# A/B Testing - reporting UI

This is a simple UI showing the key details of currently active A/B tests and the distribution of those tests within the available test space. The current implementation is a drop-in replacement for the current reporting page in the [Frontend admin tooling](https://github.com/guardian/frontend/tree/main/admin). The UI is built with Svelte and Sveltekit with no additional dependencies aside from Guardian fonts.

## Developing

Install dependencies with `deno install` (or `pnpm install`), then start a development server:

```bash
deno run dev
```

## Building

The project is set up to build the entire Svelte application into a single HTML file. This can be run locally with `deno run build`, with the resulting file put into `/output`.

After a merge, this file will be built and uploaded to the `frontend-store` S3 bucket. It is then accessed securely and served in an iframe in the Frontend admin tool, in place of the old page which relied on A/B test information being present in the switchboard and client-side config in frontend.
