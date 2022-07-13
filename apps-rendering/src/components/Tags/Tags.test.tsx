// ----- Imports ----- //

import { matchers } from '@emotion/jest';
import { article } from 'fixtures/item';
import renderer from 'react-test-renderer';
import Tags from './';

// ----- Setup ----- //

expect.extend(matchers);

// ----- Tests ----- //

describe('Tags component renders as expected', () => {
	it('Renders link to tag', () => {
		const tags = renderer.create(
			<Tags item={article} />,
		);
		const link = tags.root.findByType('a');
		expect(link.props.href).toBe(article.tags[0].webUrl);
	});

	it('Renders tag title', () => {
		const tags = renderer.create(
			<Tags item={article} />,
		);
		expect(tags.root.findByType('a').children.includes(article.tags[0].webTitle)).toBe(
			true,
		);
	});

	it('Renders correct number of tags', () => {
		const tags = renderer.create(
			<Tags item={article} />,
		);
		expect(tags.root.findAllByType('li').length).toBe(7);
	});
});
