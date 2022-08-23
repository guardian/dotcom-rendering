import { render } from '@testing-library/react';
import { Doughnut } from './Doughnut';

const [one, two] = [
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

describe('Doughnut', () => {
	it('should display the given labels', () => {
		const { getByText } = render(<Doughnut sections={[one, two]} />);

		expect(getByText(one.label)).toBeInTheDocument();
		expect(getByText(two.label)).toBeInTheDocument();
	});

	it('should display the given labels when sizing is customised', () => {
		const { getByText } = render(
			<Doughnut sections={[one, two]} percentCutout={20} size={200} />,
		);

		expect(getByText(one.label)).toBeInTheDocument();
		expect(getByText(two.label)).toBeInTheDocument();
	});

	it('should return a circle if only one section is passed', () => {
		const { container } = render(<Doughnut sections={[one]} />);

		expect(container.firstChild).not.toBeNull();
	});

	it('should handle if a section has a zero value', () => {
		const three = {
			value: 0,
			label: 'IamZero',
			color: '#ce070c ',
		};
		const { container, queryByText } = render(
			<Doughnut sections={[one, two, three]} />,
		);

		expect(container.firstChild).not.toBeNull();
		expect(queryByText(one.label)).toBeInTheDocument();
		expect(queryByText(three.label)).not.toBeInTheDocument();
	});
});
