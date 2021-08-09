import { render, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const links = [
	{
		url: '/preference/edition/uk',
		title: 'UK edition',
		isActive: true,
		dataLinkName: 'linkname-UK',
	},
	{
		url: '/preference/edition/us',
		title: 'US edition',
		dataLinkName: 'linkname-US',
	},
	{
		url: '/preference/edition/au',
		title: 'Australian edition',
		dataLinkName: 'linkname-AU',
	},
	{
		url: '/preference/edition/int',
		title: 'International edition',
		dataLinkName: 'linkname-INT',
	},
];

const LABEL = 'Dropdown label';

describe('Dropdown', () => {
	it('should display the given label', () => {
		const { getByText } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		expect(getByText(LABEL)).toBeInTheDocument();
	});

	it('should display link titles', () => {
		const { getByText } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		expect(getByText(links[0].title)).toBeInTheDocument();
		expect(getByText(links[1].title)).toBeInTheDocument();
		expect(getByText(links[2].title)).toBeInTheDocument();
		expect(getByText(links[3].title)).toBeInTheDocument();
	});

	it('should render the correct number of link items', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		const listItems = container.querySelectorAll('li');

		expect(listItems.length).toEqual(links.length);
	});

	it('should expand the menu when clicked upon', () => {
		const { container, getByRole } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		const ulElement = container.querySelector('ul');

		expect(ulElement).not.toBeVisible();
		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
	});

	it('should close the expanded menu when they click away', () => {
		const { container, getByRole } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		const ulElement = container.querySelector('ul');

		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
		container.click();
		expect(ulElement).not.toBeVisible();
	});

	it('should close the expanded menu when blurred', () => {
		const { container, getByRole } = render(
			<Dropdown
				id="abc"
				label={LABEL}
				links={links}
				dataLinkName="linkname"
			/>,
		);

		const ulElement = container.querySelector('ul');

		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
		fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });
		expect(ulElement).not.toBeVisible();
	});
});
