import React from 'react';
import { render, within } from '@testing-library/react';
import { Display } from '@guardian/types';
import { Nav } from './Nav';
import { nav } from './Nav.mock';

// type CAPIPillar = "news" | "opinion" | "sport" | "culture" | "lifestyle" | "labs"

describe('Nav', () => {
	it('should display pillar titles', () => {
		const { getByTestId } = render(
			<Nav
				pillar="news"
				nav={nav}
				display={Display.Standard}
				subscribeUrl=""
				edition="UK"
			/>,
		);
		const list = within(getByTestId('pillar-list'));

		expect(list.getByText('News')).toBeInTheDocument();
		expect(list.getByText('Opinion')).toBeInTheDocument();
		expect(list.getByText('Sport')).toBeInTheDocument();
		expect(list.getByText('Culture')).toBeInTheDocument();
	});

	it('should render the correct number of pillar items', () => {
		const { getByTestId } = render(
			<Nav
				pillar="news"
				nav={nav}
				display={Display.Standard}
				subscribeUrl=""
				edition="UK"
			/>,
		);

		const list = getByTestId('pillar-list');
		const listItems = list.querySelectorAll('li');

		expect(listItems.length).toEqual(nav.pillars.length);
	});
});
