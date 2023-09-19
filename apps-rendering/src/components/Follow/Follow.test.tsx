/**
 * @jest-environment jsdom
 */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '@guardian/types';
import type { Contributor } from 'contributor';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import Follow from './';

// ----- Setup ----- //

const followFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

// ----- Tests ----- //

describe('Follow component renders as expected', () => {
	it('Displays title correctly', () => {
		const contributors: Contributor[] = [
			{
				apiUrl: 'https://mapi.co.uk/test',
				name: 'George Monbiot',
				id: 'test',
				image: none,
			},
		];

		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} format={followFormat} />,
				container,
			);
		});

		expect(container.textContent).toContain(
			'Follow George MonbiotNotifications off',
		);

		unmountComponentAtNode(container);
		container.remove();
	});

	it('Renders null if no apiUrl', () => {
		const contributors: Contributor[] = [
			{ name: 'George Monbiot', id: 'test', apiUrl: '', image: none },
		];

		const follow = renderer.create(
			<Follow contributors={contributors} format={followFormat} />,
		);

		expect(follow.root.children).toHaveLength(0);
	});

	it('Renders null if more than one contributor', () => {
		const contributors: Contributor[] = [
			{
				name: 'Contributor 1',
				apiUrl: 'https://mapi.co.uk/test',
				id: 'test',
				image: none,
			},
			{
				name: 'Contributor 2',
				apiUrl: 'https://mapi.co.uk/test',
				id: 'test',
				image: none,
			},
		];

		const follow = renderer.create(
			<Follow contributors={contributors} format={followFormat} />,
		);

		expect(follow.root.children).toHaveLength(0);
	});
});
