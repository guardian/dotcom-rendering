import { articles } from '../../fixtures/manual/validationArticles';
import { ignoredResponseHeaders, ignoreRules } from './ignore-rules';
import {
	normalizeHeaders,
	normalizeHtml,
	postArticle,
	readRequestConfig,
} from './support';

describe('Article HTML', () => {
	let config: ReturnType<typeof readRequestConfig>;

	beforeAll(() => {
		config = readRequestConfig(process.env);
	});

	it.each(articles)('$name', async ({ data }) => {
		const { html, headers } = await postArticle(data, config);
		expect(normalizeHtml(html, ignoreRules)).toMatchSnapshot();
		expect(
			normalizeHeaders(headers, ignoredResponseHeaders),
		).toMatchSnapshot('response headers');
	});
});
