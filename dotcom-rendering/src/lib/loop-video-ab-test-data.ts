import type { DCRCollectionType, DCRFrontCard } from '../types/front';

const exampleCard: DCRFrontCard = {
	format: {
		design: 3,
		display: 0,
		theme: 0,
	},
	dataLinkName: 'media | group-0 | card-@1',
	url: '/science/audio/2024/dec/12/does-googles-mindboggling-new-chip-bring-quantum-computers-any-closer-podcast',
	headline: 'Loop video test. This is what a looping video might look like',
	trailText:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
	webPublicationDate: '2024-12-12T05:00:09.000Z',
	kickerText: 'Podcast',
	supportingContent: [],
	discussionApiUrl:
		'https://discussion.code.dev-theguardian.com/discussion-api',
	byline: 'Presented by Ian Sample, produced by Joshan Chana and Madeleine Finlay, sound design by Tony Onuchukwu, the executive producer is Ellie Bury',
	showByline: false,
	snapData: {},
	isBoosted: false,
	boostLevel: 'default',
	isCrossword: false,
	showQuotedHeadline: false,
	showLivePlayable: false,
	mainMedia: {
		type: 'Audio',
		duration: '18:03',
		podcastImage: {
			src: 'https://uploads.guim.co.uk/2021/11/17/ScienceWeekly_FINAL_3000.jpeg',
			altText: 'Science Weekly',
		},
	},
	isExternalLink: false,
	showMainVideo: false,
	image: {
		src: 'https://media.guim.co.uk/e8d98902b166c562f0f3283c969c4a02c04129d0/0_364_5461_3277/master/5461.jpg',
		altText:
			'Inauguration of the first IBM Quantum Data Center in Europe, in Ehningen, Germany<br>epa11635230 A model of the IBM Quantum System Two quantum computer is seen at the inauguration of the first IBM Quantum Data Center in Europe, in Ehningen, Germany, 01 October 2024. The Europe-based quantum data center will facilitate access to cutting-edge quantum computing for companies, research institutions and government agencies.  EPA/ANNA SZILAGYI',
	},
};

export const testVideoCollection: DCRCollectionType = {
	id: '2e10eba3-7836-4381-bfc0-07d71a3295f6',
	displayName: 'video test',
	collectionType: 'fixed/small/slow-I',
	grouped: {
		snap: [],
		huge: [],
		veryBig: [],
		big: [],
		standard: [],
		splash: [],
	},
	curated: [exampleCard],
	backfill: [],
	treats: [],
	config: {
		showDateHeader: false,
	},
};
