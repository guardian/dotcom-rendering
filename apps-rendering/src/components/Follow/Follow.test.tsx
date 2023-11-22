/**
 * @jest-environment jsdom
 */

/* eslint-disable react/no-deprecated -- currently still working in 17 mode */

// ----- Imports ----- //

import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { none } from '@guardian/types';
import { FollowTagStatus } from 'components/FollowStatus';
import type { Contributor } from 'contributor';
import { createElement as h } from 'react';
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

const contributors: Contributor[] = [
	{
		apiUrl: 'https://mapi.co.uk/test',
		name: 'George Monbiot',
		id: 'test',
		image: none,
	},
];

const contributorsNoUrl: Contributor[] = [
	{ name: 'George Monbiot', id: 'test', apiUrl: '', image: none },
];

const contributorsMultiple: Contributor[] = [
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

// ----- Tests ----- //

describe('Follow MyGuardian Tag component renders as expected', () => {
	it('Tag component not rendered on initial render', () => {
		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} format={followFormat} />,
				container,
			);
		});

		expect(container.textContent).not.toContain('Follow George Monbiot');
		unmountComponentAtNode(container);
		container.remove();
	});

	it('Displays Follow Tag copy correctly when not following', () => {
		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} format={followFormat} />,
				container,
			);
			const followTagStatus = document.querySelector(
				'.js-follow-tag-status',
			);

			render(
				h(FollowTagStatus, {
					isFollowing: false,
					contributorName: contributors[0].name,
				}),
				followTagStatus,
			);
		});

		expect(container.textContent).toContain('Follow George Monbiot');
		expect(container.textContent).toContain('Notifications off');

		unmountComponentAtNode(container);
		container.remove();
	});

	it('Displays Follow Tag copy correctly when following', () => {
		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} format={followFormat} />,
				container,
			);
			const followTagStatus = document.querySelector(
				'.js-follow-tag-status',
			);

			render(
				h(FollowTagStatus, {
					isFollowing: true,
					contributorName: contributors[0].name,
				}),
				followTagStatus,
			);
		});

		expect(container.textContent).toContain('Following George Monbiot');
		expect(container.textContent).toContain('Notifications off');

		unmountComponentAtNode(container);
		container.remove();
	});
});

describe('Follow Notificiatons component renders as expected', () => {
	it('Displays title correctly', () => {
		const container = document.createElement('div');
		document.body.appendChild(container);

		act(() => {
			render(
				<Follow contributors={contributors} format={followFormat} />,
				container,
			);
		});

		expect(container.textContent).toContain('Notifications off');

		unmountComponentAtNode(container);
		container.remove();
	});

	it('Renders null if no apiUrl', () => {
		const follow = renderer.create(
			<Follow contributors={contributorsNoUrl} format={followFormat} />,
		);

		expect(follow.root.children).toHaveLength(0);
	});

	it('Renders null if more than one contributor', () => {
		const follow = renderer.create(
			<Follow
				contributors={contributorsMultiple}
				format={followFormat}
			/>,
		);

		expect(follow.root.children).toHaveLength(0);
	});
});
