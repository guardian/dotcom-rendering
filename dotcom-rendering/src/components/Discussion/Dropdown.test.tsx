import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import type { DropdownOptionType } from '../../types/discussion';
import { Dropdown } from './Dropdown';

const threadOptions: [
	DropdownOptionType,
	DropdownOptionType,
	DropdownOptionType,
] = [
	{
		value: 'collapsed',
		title: 'Collapsed',
		isActive: true,
	},
	{
		value: 'expanded',
		title: 'Expanded',
	},
	{
		value: 'unthreaded',
		title: 'Unthreaded',
	},
];

const noActiveOptions: DropdownOptionType[] = threadOptions.map((option) => ({
	...option,
	isActive: false,
}));

describe('Dropdown', () => {
	it('should display the given label', () => {
		const label = 'I should show';
		render(
			<Dropdown
				id="abc"
				label={label}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		expect(screen.getByText(label)).toBeInTheDocument();
	});

	it('should display option titles', () => {
		render(
			<Dropdown
				id="abc"
				label={'The label'}
				options={noActiveOptions}
				onSelect={() => {}}
			/>,
		);

		expect(screen.getByText(threadOptions[0].title)).toBeInTheDocument();
		expect(screen.getByText(threadOptions[1].title)).toBeInTheDocument();
		expect(screen.getByText(threadOptions[2].title)).toBeInTheDocument();
	});

	it('should render the correct number of options', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const listItems = container.querySelectorAll('li');
		expect(listItems.length).toEqual(threadOptions.length);
	});

	it('should expand the menu when the label is clicked', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = container.querySelector('ul');
		expect(ulElement).toHaveStyle('display: none');
		fireEvent.click(screen.getByRole('button'));
		expect(ulElement).toHaveStyle('display: block');
	});

	it('should close the expanded menu when readers click away', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = container.querySelector('ul');
		fireEvent.click(screen.getByRole('button'));
		expect(ulElement).toHaveStyle('display: block');
		fireEvent.click(container);
		expect(ulElement).toHaveStyle('display: none');
	});

	it('should close the expanded menu when blurred', () => {
		const { container } = render(
			<Dropdown
				id="abc"
				label={'The label'}
				options={threadOptions}
				onSelect={() => {}}
			/>,
		);

		const ulElement = container.querySelector('ul');
		fireEvent.click(screen.getByRole('button'));
		expect(ulElement).toHaveStyle('display: block');
		fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });
		expect(ulElement).toHaveStyle('display: none');
	});
});

it('should trigger the correct onSelect callbacks when an option is clicked', () => {
	const mockCallback = jest.fn();
	render(
		<Dropdown
			id="abc"
			label={'The label'}
			options={threadOptions}
			onSelect={mockCallback}
		/>,
	);

	fireEvent.click(screen.getByRole('button'));
	fireEvent.click(screen.getByText(threadOptions[2].title));
	expect(mockCallback).toHaveBeenCalled();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- the element exists
	expect(mockCallback.mock.calls[0][0]).toBe('unthreaded');
	fireEvent.click(screen.getByRole('button'));
	fireEvent.click(screen.getByText(threadOptions[1].title));
	expect(mockCallback).toHaveBeenCalled();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- the element exists
	expect(mockCallback.mock.calls[1][0]).toBe('expanded');
});
