import { fireEvent, render } from '@testing-library/react';
import { ConfigProvider } from './ConfigContext';
import type { DropdownLinkType } from './Dropdown';
import { Dropdown } from './Dropdown';

const links: [
	DropdownLinkType,
	DropdownLinkType,
	DropdownLinkType,
	DropdownLinkType,
] = [
	{
		id: 'uk',
		url: '/preference/edition/uk',
		title: 'UK edition',
		isActive: true,
		dataLinkName: 'linkname-UK',
	},
	{
		id: 'us',
		url: '/preference/edition/us',
		title: 'US edition',
		dataLinkName: 'linkname-US',
	},
	{
		id: 'au',
		url: '/preference/edition/au',
		title: 'Australia edition',
		dataLinkName: 'linkname-AU',
	},
	{
		id: 'int',
		url: '/preference/edition/int',
		title: 'International edition',
		dataLinkName: 'linkname-INT',
	},
];

const LABEL = 'Dropdown label';

describe('Dropdown', () => {
	it('should display the given label', () => {
		const { getByText } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		expect(getByText(LABEL)).toBeInTheDocument();
	});

	it('should display link titles', () => {
		const { getByText } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		expect(getByText(links[0].title)).toBeInTheDocument();
		expect(getByText(links[1].title)).toBeInTheDocument();
		expect(getByText(links[2].title)).toBeInTheDocument();
		expect(getByText(links[3].title)).toBeInTheDocument();
	});

	it('should render the correct number of link items', () => {
		const { container } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		const listItems = container.querySelectorAll('li');

		expect(listItems.length).toEqual(links.length);
	});

	it('should expand the menu when clicked upon', () => {
		const { container, getByRole } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		const ulElement = container.querySelector('ul');

		expect(ulElement).not.toBeVisible();
		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
	});

	it('should close the expanded menu when they click away', () => {
		const { container, getByRole } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		const ulElement = container.querySelector('ul');

		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
		fireEvent.click(getByRole('button'));
		expect(ulElement).not.toBeVisible();
	});

	it('should close the expanded menu when blurred', () => {
		const { container, getByRole } = render(
			<ConfigProvider
				value={{ renderingTarget: 'Web', darkModeAvailable: false }}
			>
				<Dropdown
					id="abc"
					label={LABEL}
					links={links}
					dataLinkName="linkname"
				/>
			</ConfigProvider>,
		);

		const ulElement = container.querySelector('ul');

		fireEvent.click(getByRole('button'));
		expect(ulElement).toBeVisible();
		fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });
		expect(ulElement).not.toBeVisible();
	});
});
