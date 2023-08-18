import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { render } from '@testing-library/react';
import { getContributorTagsForToken } from '../lib/byline';
import type { TagType } from '../types/tag';
import {
	bylineAsTokens,
	BylineLink,
	SPECIAL_REGEX_CHARACTERS,
} from './BylineLink';

jest.mock('../lib/bridgetApi', jest.fn());

describe('SPECIAL_REGEX_CHARACTERS', () => {
	it('Correctly match all special regex characters', () => {
		expect(
			'.*+?^${}()|[]'.replaceAll(SPECIAL_REGEX_CHARACTERS, ''),
		).toEqual('');
	});
});

describe('bylineAsTokens', () => {
	it('Correctly performs the standard one contributor case', () => {
		const byline = 'Gwyn Topham Transport correspondent';
		const tags = [
			{
				id: 'profile/gwyntopham',
				type: 'Contributor',
				title: 'Gwyn Topham',
				twitterHandle: 'GwynTopham',
				bylineImageUrl: 'https://i.guim.co.uk/something',
			},
		];
		const tokensExpected = ['', 'Gwyn Topham', ' Transport correspondent'];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);
	});

	it('Correctly extract the correct contributor tag when more than one tag with the same title', () => {
		const byline = 'Paul Kagame';
		const tags = [
			{ id: 'world/paul-kagame', type: 'Keyword', title: 'Paul Kagame' },
			{
				id: 'profile/paul-kagame',
				type: 'Contributor',
				title: 'Paul Kagame',
			},
		];
		const tokensExpected = ['', 'Paul Kagame', ''];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);

		const token = 'Paul Kagame';
		const contributorTagsExpected = [
			{
				id: 'profile/paul-kagame',
				type: 'Contributor',
				title: 'Paul Kagame',
			},
		];
		expect(getContributorTagsForToken(tags, token)).toEqual(
			contributorTagsExpected,
		);
		expect(getContributorTagsForToken(tags.reverse(), token)).toEqual(
			contributorTagsExpected,
		);
	});

	it('Correctly process the sam-levin/sam-levine in either tags order', () => {
		const byline = 'Sam Levin in Los Angeles and Sam Levine in New York';
		const tags = [
			{
				id: 'profile/sam-levin',
				type: 'Contributor',
				title: 'Sam Levin',
				twitterHandle: 'SamTLevin',
				bylineImageUrl: 'https://i.guim.co.uk/something',
			},
			{
				id: 'profile/sam-levine',
				type: 'Contributor',
				title: 'Sam Levine',
			},
		];
		const tokensExpected = [
			'',
			'Sam Levin',
			' in Los Angeles and ',
			'Sam Levine',
			' in New York',
		];
		expect(bylineAsTokens(byline, tags)).toEqual(tokensExpected);
		expect(bylineAsTokens(byline, tags.reverse())).toEqual(tokensExpected);
	});
});

describe('BylineLink', () => {
	it('should link a single tag by linking name tokens with Contributor tag titles', () => {
		const byline = 'Eva Smith and friends';
		const tags: [TagType] = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
		];

		const { container } = render(
			<BylineLink
				byline={byline}
				tags={tags}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				renderingTarget="Web"
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(1);
		expect(links.item(0).href).toContain(tags[0].id);
	});

	it('should link multiple tags by linking name tokens with Contributor tag titles', () => {
		const byline = 'Eva Smith and Duncan Campbell';
		const tags: [TagType, TagType] = [
			{
				id: 'eva-smith',
				type: 'Contributor',
				title: 'Eva Smith',
			},
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		];
		const { container } = render(
			<BylineLink
				byline={byline}
				tags={tags}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				renderingTarget="Web"
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(2);
		expect(links.item(0).href).toContain(tags[0].id);
		expect(links.item(1).href).toContain(tags[1].id);
	});

	it('should not reuse a contributor tag, to successfully disambiguate identical names', () => {
		const byline = 'Duncan Campbell and Duncan Campbell';
		const tags: [TagType, TagType] = [
			{
				id: 'duncan-campbell',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
			{
				id: 'duncan-campbell-1',
				type: 'Contributor',
				title: 'Duncan Campbell',
			},
		];

		const { container } = render(
			<BylineLink
				byline={byline}
				tags={tags}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				renderingTarget="Web"
			/>,
		);

		const links = container.querySelectorAll('a');

		expect(container).toHaveTextContent(byline);
		expect(links.length).toBe(2);
		expect(links.item(0).href).toContain(tags[0].id);
		expect(links.item(1).href).toContain(tags[1].id);
	});
});
