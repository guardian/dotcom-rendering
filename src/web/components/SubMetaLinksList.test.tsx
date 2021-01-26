import React from 'react';
import { render } from '@testing-library/react';

import { Pillar } from '@guardian/types';

import { SubMetaLinksList } from './SubMetaLinksList';

describe('SubMetaLinksList', () => {
	const links: SimpleLinkType[] = [
		{
			url: '/test/1',
			title: 'Test 1',
		},
		{
			url: '/test/2',
			title: 'Test 2',
		},
	];
	const pillar: Pillar = Pillar.News;

	it('It should render correct amount of links', () => {
		const { container, getByText } = render(
			<SubMetaLinksList
				links={links}
				isSectionLinkList={false}
				pillar={pillar}
			/>,
		);

		const listItems = container.querySelectorAll('li');

		expect(container.firstChild).not.toBeNull();
		expect(listItems.length).toBe(2);
		expect(getByText(links[0].title)).toBeInTheDocument();
		expect(getByText(links[1].title)).toBeInTheDocument();
	});
});
