import type { FEFrontCard } from '../frontend/feFront';
import type { CustomSubnav } from '../types/customSubnav';
import { enhanceCards } from './enhanceCards';

const card: FEFrontCard = {
	properties: {
		isBreaking: false,
		showKickerTag: false,
		showByline: false,
		isLiveBlog: false,
		isCrossword: false,
		webTitle: 'Headline',
		editionBrandings: [],
	},
	header: {
		isVideo: false,
		isComment: false,
		isGallery: false,
		isAudio: false,
		headline: 'Headline',
		url: '/example',
		hasMainVideoElement: false,
	},
	card: {
		id: 'example',
		cardStyle: { type: 'DefaultCardstyle' },
		shortUrl: '',
		group: '0',
		isLive: false,
	},
	discussion: {
		isCommentable: false,
		isClosedForComments: false,
	},
	display: {
		isBoosted: false,
		showBoostedHeadline: false,
		showQuotedHeadline: false,
		imageHide: false,
		showLivePlayable: false,
	},
	type: '',
};

const enhance = (frontCard: FEFrontCard) =>
	enhanceCards([frontCard], {
		cardInTagPage: false,
		editionId: 'UK',
		discussionApiUrl: '',
		serverSideABTests: {},
		featureSwitches: {},
	})[0];

describe('enhanceCards mini navigation', () => {
	it('disables mini navigation for existing payloads without configuration', () => {
		expect(enhance(card)).toMatchObject({ showMiniNav: false });
		expect(enhance(card)?.miniNavData).toBeUndefined();
	});

	it.each([true, false])(
		'preserves configuration when showMiniNav is %s',
		(showMiniNav) => {
			const miniNavData: CustomSubnav = {
				id: 'election',
				format: 'compact',
				pages: [{ type: 'front', path: '/uk' }],
				images: [
					{
						imageSrc: 'https://example.com/election.png',
						breakpoint: 'mobile',
						platforms: ['web'],
					},
				],
				header: {
					headerText: 'Election',
					showHeaderText: true,
					dotcomPath: '/election',
					copy: 'Additional election information',
				},
				links: [{ linkText: 'Latest', dotcomPath: '/election/latest' }],
			};
			const enhancedCard = enhance({
				...card,
				properties: { ...card.properties, miniNavData },
				display: { ...card.display, showMiniNav },
			});
			expect(enhancedCard?.showMiniNav).toBe(showMiniNav);
			expect(enhancedCard?.miniNavData).toEqual(miniNavData);
		},
	);

	it('preserves a hidden, non-linked header and editorial link order', () => {
		const miniNavData: CustomSubnav = {
			id: 'election',
			format: 'compact',
			pages: [],
			header: {
				headerText: 'Election',
				showHeaderText: false,
				copy: '',
			},
			links: [
				{ linkText: 'Results', dotcomPath: '/election/results' },
				{ linkText: 'Latest', dotcomPath: '/election/latest' },
			],
		};
		expect(
			enhance({
				...card,
				properties: { ...card.properties, miniNavData },
				display: { ...card.display, showMiniNav: true },
			})?.miniNavData,
		).toEqual(miniNavData);
	});
});
