import { removeOldSignUpEmbeds } from './removeOldSignupEmbeds';

const INSIDE_SATURDAY = {
	listId: 6016,
	identityName: 'inside-saturday',
	description:
		'The only way to get a look behind the scenes of our brand new magazine, Saturday. Sign up to get the inside story from our top writers as well as all the must-read articles and columns, delivered to your inbox every weekend.',
	name: 'Inside Saturday',
	frequency: 'Weekly',
	successDescription: 'You have signed up, but the newsletter is fake',
	theme: 'features',
	group: 'Features',
};

const PARAGRAPH_ELEMENT: TextBlockElement = {
	_type: 'model.dotcomrendering.pageElements.TextBlockElement',
	elementId: '1',
	html: '<p>Test text</p>',
};

const OLD_EMBED_INSIDE_SATURDAY: EmbedBlockElement = {
	_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
	html: '<iframe id="inside-saturday" name="inside-saturday" src="https://www.theguardian.com/email/form/plaintone/inside-saturday" scrolling="no" seamless="" class="iframed--overflow-hidden email-sub__iframe" height="52px" frameborder="0" data-component="email-embed--inside-saturday" title="Sign up to Inside Saturday"></iframe>',
	safe: true,
	alt: 'Sign up to Inside Saturday',
	isMandatory: false,
	isThirdPartyTracking: false,
	source: 'The Guardian',
	sourceDomain: 'theguardian.com',
	elementId: 'cb0300a8-bf9b-462f-9481-bf471fc51a70',
};

const NEW_SIGN_UP: NewsletterSignupBlockElement = {
	_type: 'model.dotcomrendering.pageElements.NewsletterSignupBlockElement',
	elementId: '2',
	newsletter: INSIDE_SATURDAY,
};

const BLOCK_WITHOUT_NEW_EMBED = {
	elements: [PARAGRAPH_ELEMENT, OLD_EMBED_INSIDE_SATURDAY],
} as Block;

const BLOCK_WITH_NEW_EMBED = {
	elements: [NEW_SIGN_UP, PARAGRAPH_ELEMENT, OLD_EMBED_INSIDE_SATURDAY],
} as Block;

const toElementTypeLists = (blocks: Block[]): string[][] =>
	blocks.map((block) => block.elements.map((element) => element._type));

describe('Remove Old Signups', () => {
	it('makes no change if there is no new sign up block', () => {
		const elementTypesBeforeEnhancement = toElementTypeLists([
			BLOCK_WITHOUT_NEW_EMBED,
		]);

		const elementTypesAfterEnhance = toElementTypeLists(
			removeOldSignUpEmbeds([BLOCK_WITHOUT_NEW_EMBED]),
		);

		expect(elementTypesAfterEnhance).toEqual(elementTypesBeforeEnhancement);
	});

	it('removes the old sign up with there is a new one', () => {
		const elementTypesBeforeEnhancement = toElementTypeLists([
			BLOCK_WITH_NEW_EMBED,
		]);

		const elementTypesAfterEnhance = toElementTypeLists(
			removeOldSignUpEmbeds([BLOCK_WITH_NEW_EMBED]),
		);

		expect(elementTypesAfterEnhance[0].length).toEqual(
			elementTypesBeforeEnhancement[0].length - 1,
		);

		expect(elementTypesAfterEnhance[0].includes('EmbedBlockElement')).toBeFalsy();
	});
});
