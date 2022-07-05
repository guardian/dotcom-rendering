/** This is served in browser that do not support ES Modules
 *
 * Known issue: [Safari 10.1-10.3](https://caniuse.com/es6-module) will execute this script twice.
 * We opted against a [polyfill](https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc),
 * as Ophan will dedupe identical page views if they have the same browserId + pageViewId.
 *
 * This endpoint is identical to `import 'ophan-tracker-js'` in ophan/init.ts
 */
export const ophanNomoduleScript = `<script src="https://j.ophan.co.uk/ophan.ng.js" defer nomodule></script>`;
