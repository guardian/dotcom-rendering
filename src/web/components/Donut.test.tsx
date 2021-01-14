import React from 'react';
import { render } from '@testing-library/react';
import { Donut } from './Donut';

const mockSections = [
	{
		value: 29,
		label: 'Dat1',
		color: '#eb121a',
	},
	{
		value: 71,
		label: 'Dat2',
		color: '#ce070c ',
	},
];

describe('Donut', () => {
	it('should display the given labels', () => {
		const { getByText } = render(<Donut sections={mockSections} />);

		expect(getByText(mockSections[0].label)).toBeInTheDocument();
		expect(getByText(mockSections[1].label)).toBeInTheDocument();
	});

	it('should display the given labels when sizing is customised', () => {
		const { getByText } = render(
			<Donut
				sections={mockSections}
				percentCutout={20}
				width={200}
				height={200}
			/>,
		);

		expect(getByText(mockSections[0].label)).toBeInTheDocument();
		expect(getByText(mockSections[1].label)).toBeInTheDocument();
	});

	it('should return null if only one section is passed', () => {
		const { container } = render(<Donut sections={[mockSections[0]]} />);

		expect(container.firstChild).toBeNull();
	});

	it('should handle if a section has a zero value', () => {
		const { container, queryByText } = render(
			<Donut
				sections={[
					...mockSections,
					{
						value: 0,
						label: 'IamZero',
						color: '#ce070c ',
					},
				]}
			/>,
		);

		expect(container.firstChild).not.toBeNull();
		expect(queryByText(mockSections[0].label)).toBeInTheDocument();
		expect(queryByText('IamZero')).not.toBeInTheDocument();
	});
});
