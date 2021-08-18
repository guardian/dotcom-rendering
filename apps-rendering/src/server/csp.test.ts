import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { getThirdPartyEmbeds } from 'capi';
import { articleContentWith } from 'helperTest';

const contentTwitter = articleContentWith({
	type: ElementType.TWEET,
	assets: [],
	tweetTypeData: {
		id: 'id',
		html: '<blockquote>tweet<blockquote>',
	},
});

const contentInstagram = articleContentWith({
	type: ElementType.INSTAGRAM,
	assets: [],
	tweetTypeData: {
		id: 'id',
		html: '<blockquote>insta<blockquote>',
	},
});

const contentYoutube = articleContentWith({
	type: ElementType.VIDEO,
	assets: [],
	tweetTypeData: {
		id: 'id',
		html: '<blockquote>youtube<blockquote>',
	},
});

const contentSpotify = articleContentWith({
	type: ElementType.AUDIO,
	assets: [],
	tweetTypeData: {
		id: 'id',
		html: '<blockquote>spotify<blockquote>',
	},
});

describe('Third party embeds function returns true when element type is found in body block', () => {
	test('returns true when twitter embed found', () => {
		const newContentTwitter = getThirdPartyEmbeds(contentTwitter);
		expect(newContentTwitter.twitter).toBe(true);
	});
	test('returns true when instagram embed found', () => {
		const newContentInstagram = getThirdPartyEmbeds(contentInstagram);
		expect(newContentInstagram.instagram).toBe(true);
	});
	test('returns true when youtube embed found', () => {
		const newContentYoutube = getThirdPartyEmbeds(contentYoutube);
		expect(newContentYoutube.youtube).toBe(true);
	});
	test('returns true when spotify embed found', () => {
		const newContentSpotify = getThirdPartyEmbeds(contentSpotify);
		expect(newContentSpotify.spotify).toBe(true);
	});
});
