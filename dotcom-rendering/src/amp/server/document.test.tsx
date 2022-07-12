import validator from 'amphtml-validator';
import { Standard as ExampleArticle } from '../../../fixtures/generated/articles/Standard';
import { extractNAV } from '../../model/extract-nav';
import type { AnalyticsModel } from '../components/Analytics';
import { Article } from '../pages/Article';
import { document } from './document';

test('rejects invalid AMP doc (to test validator)', async () => {
	const v = await validator.getInstance();
	const linkedData = [{}];
	const metadata = { description: '', canonicalURL: '' };
	const result = v.validateString(
		document({
			linkedData,
			metadata,
			title: 'foo',
			scripts: [''],
			body: <img alt="foo" />,
		}),
	);
	expect(result.errors.length > 0).toBe(true);
}, 10000); // AMP html validator can take longer than Jest's default async timeout of 5000ms

// TODO failing because fixture still models blocks as nested array of elements
// rather than a list of Block(s) - that are objects with 'id' and 'elements'
// fields. This then errors in Elements.tsx.
test('produces valid AMP doc', async () => {
	const v = await validator.getInstance();
	const { config } = ExampleArticle;
	const nav = extractNAV(ExampleArticle.nav);
	const { linkedData } = ExampleArticle;

	const metadata = {
		description: ExampleArticle.trailText,
		canonicalURL: ExampleArticle.webURL,
	};

	const analytics: AnalyticsModel = {
		gaTracker: 'UA-XXXXXXX-X',
		title: 'Foo',
		fbPixelaccount: 'XXXXXXXXXX',
		comscoreID: 'XXXXXXX',
		section: ExampleArticle.sectionName,
		contentType: ExampleArticle.contentType,
		id: ExampleArticle.pageId,
		neilsenAPIID: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX',
		domain: 'amp.theguardian.com',
		permutive: {
			namespace: 'guardian',
			apiKey: '42-2020',
			payload: {
				'properties.content.title': 'article title',
			},
		},
		ipsosSectionName: 'section',
	};

	const body = (
		<Article
			experimentsData={{}}
			nav={nav}
			articleData={{ ...ExampleArticle, shouldHideReaderRevenue: false }}
			config={config}
			analytics={analytics}
		/>
	);

	const result = v.validateString(
		document({
			body,
			linkedData,
			metadata,
			title: 'foo',
			scripts: [],
		}),
	);

	if (result.errors.length > 0) {
		console.log(result.errors);
	}
	expect(result.errors.length).toBe(0);
});
