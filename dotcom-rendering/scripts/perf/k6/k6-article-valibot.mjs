import { runk6 } from './k6.mjs';

const { options, run } = runk6('./article.json', 'ArticleValibot');

export { options };

// eslint-disable-next-line import/no-default-export -- k6 requires a default export
export default function () {
	run();
}
