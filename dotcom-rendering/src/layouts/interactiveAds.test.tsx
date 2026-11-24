import { renderToString } from 'react-dom/server';
import { Standard as StandardFixture } from '../../fixtures/generated/fe-articles/Standard';
import { adPlaceholderClass } from '../components/AdPlaceholder.apps';
import { ConfigProvider } from '../components/ConfigContext';
import { ArticleDesign, ArticleDisplay } from '../lib/articleFormat';
import { enhanceAdPlaceholders } from '../model/enhance-ad-placeholders';
import { enhanceArticleType } from '../types/article';
import type { FEElement } from '../types/content';
import { FullPageInteractiveLayout } from './FullPageInteractiveLayout';
import { StandardLayout } from './StandardLayout';

jest.mock('../components/AdPortals.island', () => ({
	AdPortals: function AdPortals() {
		return null;
	},
}));

const baseArticle = enhanceArticleType(StandardFixture, 'Apps').frontendData;
const format = {
	design: ArticleDesign.Interactive,
	display: ArticleDisplay.Standard,
	theme: enhanceArticleType(StandardFixture, 'Apps').theme,
};
const paragraphs: FEElement[] = Array.from({ length: 6 }, (_, index) => ({
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: `paragraph-${index}`,
	html: '<p>Article text</p>',
}));
const firstBlock = baseArticle.blocks[0];
if (!firstBlock) throw new Error('Expected the fixture to contain a block');

const originalConsoleError = console.error;
beforeAll(() => {
	jest.spyOn(console, 'error').mockImplementation((message, ...args) => {
		if (
			typeof message === 'string' &&
			message.includes('useLayoutEffect does nothing on the server')
		) {
			return;
		}
		originalConsoleError(message, ...args);
	});
});
afterAll(() => {
	jest.restoreAllMocks();
});

const renderInteractive = (
	layout: 'standard' | 'immersive',
	options: {
		firstPublicationDate?: string;
		shouldHideAds?: boolean;
		isAdFreeUser?: boolean;
		design?: ArticleDesign.Interactive | ArticleDesign.FullPageInteractive;
	} = {},
) => {
	const layoutFormat = {
		...format,
		design: options.design ?? format.design,
		display:
			layout === 'immersive'
				? ArticleDisplay.Immersive
				: ArticleDisplay.Standard,
	};
	const article = {
		...baseArticle,
		firstPublicationDate: options.firstPublicationDate ?? '2026-10-22',
		shouldHideAds: options.shouldHideAds ?? false,
		isAdFreeUser: options.isAdFreeUser ?? false,
		blocks: [
			{
				...firstBlock,
				elements: enhanceAdPlaceholders(
					layoutFormat,
					'Apps',
					options.shouldHideAds ?? false,
				)(paragraphs),
			},
		],
	};

	const html = renderToString(
		<ConfigProvider
			value={{
				renderingTarget: 'Apps',
				darkModeAvailable: false,
				assetOrigin: '/',
				editionId: 'UK',
			}}
		>
			{layout === 'immersive' ? (
				<FullPageInteractiveLayout
					article={article}
					format={layoutFormat}
					renderingTarget="Apps"
				/>
			) : (
				<StandardLayout
					article={article}
					format={layoutFormat}
					renderingTarget="Apps"
				/>
			)}
		</ConfigProvider>,
	);
	const container = document.createElement('div');
	container.innerHTML = html;
	return container;
};

describe.each([
	['legacy standard', 'standard', '2026-10-20'],
	['new standard', 'standard', '2026-10-22'],
	['immersive', 'immersive', '2026-10-22'],
] as const)('%s app interactives', (_name, layout, firstPublicationDate) => {
	it('renders an ad portal and placeholder when ads are allowed', () => {
		const container = renderInteractive(layout, {
			firstPublicationDate,
		});

		expect(
			container.querySelectorAll('gu-island[name="AdPortals"]'),
		).toHaveLength(1);
		expect(
			container.querySelectorAll(`.${adPlaceholderClass}`),
		).toHaveLength(1);
	});

	it.each([{ shouldHideAds: true }, { isAdFreeUser: true }])(
		'does not render ads when restricted: %o',
		(options) => {
			const container = renderInteractive(layout, {
				firstPublicationDate,
				...options,
			});

			expect(
				container.querySelector('gu-island[name="AdPortals"]'),
			).toBeNull();
			expect(
				container.querySelector(`.${adPlaceholderClass}`),
			).toBeNull();
		},
	);
});

it('does not add an ad portal to full-page interactive designs', () => {
	const container = renderInteractive('immersive', {
		design: ArticleDesign.FullPageInteractive,
	});

	expect(container.querySelector('gu-island[name="AdPortals"]')).toBeNull();
});
