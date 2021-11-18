// ----- Imports ----- //

import { matchers } from '@emotion/jest';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import Tags from 'components/tags';
import renderer from 'react-test-renderer';

// ----- Setup ----- //

expect.extend(matchers);

const mockTag = {
	webTitle: 'Tag title',
	webUrl: 'https://mapi.co.uk/tag',
};

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Comment,
	display: ArticleDisplay.Standard,
};

// ----- Tests ----- //

describe('Tags component renders as expected', () => {
	it('Renders link to tag', () => {
		const tags = renderer.create(
			<Tags tags={[mockTag]} format={mockFormat} />,
		);
		const link = tags.root.findByType('a');
		expect(link.props.href).toBe('https://mapi.co.uk/tag');
	});

	it('Renders tag title', () => {
		const tags = renderer.create(
			<Tags tags={[mockTag]} format={mockFormat} />,
		);
		expect(tags.root.findByType('a').children.includes('Tag title')).toBe(
			true,
		);
	});

	it('Renders correct number of tags', () => {
		const tags = renderer.create(
			<Tags tags={[mockTag, mockTag]} format={mockFormat} />,
		);
		expect(tags.root.findAllByType('li').length).toBe(2);
	});
});
