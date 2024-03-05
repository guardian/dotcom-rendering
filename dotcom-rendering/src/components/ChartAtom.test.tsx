import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { html } from '../../fixtures/manual/chartAtoms';
import { ChartAtom } from './ChartAtom.importable';

describe('ChartAtom', () => {
	it('should render', () => {
		const { getByTestId } = render(
			<ChartAtom id="123abc" html={html} title="chart" />,
		);

		expect(getByTestId('chart')).toBeInTheDocument();
	});
});
