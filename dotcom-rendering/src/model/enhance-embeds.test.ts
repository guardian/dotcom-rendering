import { Standard as ExampleArticle } from '../../fixtures/generated/articles/Standard';
import type { FEElement } from '../types/content';
import { enhanceEmbeds } from './enhance-embeds';

const example = ExampleArticle;

describe('Enhance Embeds', () => {
	it('creates an identical but new object when no changes are needed', () => {
		const elements = example.blocks[0]?.elements ?? [];
		expect(enhanceEmbeds(elements)).not.toBe(elements); // We created a new object
		expect(enhanceEmbeds(elements)).toEqual(elements); // The new object is what we expect
	});

	it('sets the divider flag correctly', () => {
		const input: FEElement[] = [
			{
				html: '<iframe id="the-fiver" name="the-fiver" src="https://www.theguardian.com/email/form/plaintone/the-fiver" scrolling="no" seamless="" class="iframed--overflow-hidden email-sub__iframe" height="52px" frameborder="0" data-component="email-embed--the-fiver"></iframe>',
				safe: true,
				alt: 'Sign up to The Fiver',
				isMandatory: true,
				isThirdPartyTracking: false,
				source: 'The Guardian',
				sourceDomain: 'theguardian.com',
				_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				elementId: '17bb4750-37c3-4cef-a535-82a5c40509fd',
				caption: 'Sign up to the Fiver',
			},
		];

		const expectedOutput = [
			{
				html: '<iframe id="the-fiver" name="the-fiver" src="https://www.theguardian.com/email/form/plaintone/the-fiver" scrolling="no" seamless="" class="iframed--overflow-hidden email-sub__iframe" height="52px" frameborder="0" data-component="email-embed--the-fiver" title="Sign up to The Fiver"></iframe>',
				safe: true,
				alt: 'Sign up to The Fiver',
				isMandatory: true,
				isThirdPartyTracking: false,
				source: 'The Guardian',
				sourceDomain: 'theguardian.com',
				_type: 'model.dotcomrendering.pageElements.EmbedBlockElement',
				elementId: '17bb4750-37c3-4cef-a535-82a5c40509fd',
				caption: 'Sign up to the Fiver',
			},
		];

		expect(enhanceEmbeds(input)).toEqual(expectedOutput);
	});
});
