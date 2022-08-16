/**
 * @jest-environment jsdom
 */

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
		const tags = renderer.create(<Tags item={article} />);
		const links = tags.root.findAllByType('a');
		expect(links[0].props.href).toBe(article.tags[0].webUrl);
	});

	it('Renders tag title', () => {
		const tags = renderer.create(<Tags item={article} />);
		const links = tags.root.findAllByType('a');
		expect(links[0].children.includes(article.tags[0].webTitle)).toBe(true);
	});

	it('Renders correct number of tags', () => {
		const tags = renderer.create(<Tags item={article} />);
		expect(tags.root.findAllByType('li').length).toBe(6);
	});
});
