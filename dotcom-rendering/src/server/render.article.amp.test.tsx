import validator from 'amphtml-validator';
import { Standard as ExampleArticle } from '../../fixtures/generated/fe-articles/Standard';
import type { AnalyticsModel } from '../components/Analytics.amp';
import { AmpArticlePage } from '../components/ArticlePage.amp';
import type { PermutiveModel } from '../components/Permutive.amp';
import { extractNAV } from '../model/extract-nav';
import { renderArticle } from './render.article.amp';

test('rejects invalid AMP doc (to test validator)', async () => {
	const v = await validator.getInstance();
	const linkedData = [{}];
	const metadata = { description: '', canonicalURL: '' };
	const result = v.validateString(
		renderArticle({
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
		comscoreID: 'XXXXXXX',
		section: ExampleArticle.sectionName,
		neilsenAPIID: 'XXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX',
		ipsosSectionName: 'section',
	};

	const permutive: PermutiveModel = {
		projectId: 'example',
		apiKey: '42-2020',
		payload: {
			'properties.content.title': 'article title',
		},
	};

	const body = (
		<AmpArticlePage
			experimentsData={{}}
			nav={nav}
			articleData={{ ...ExampleArticle, shouldHideReaderRevenue: false }}
			config={config}
			analytics={analytics}
			permutive={permutive}
		/>
	);

	const result = v.validateString(
		renderArticle({
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
