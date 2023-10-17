import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { html } from '../../fixtures/manual/chartAtoms';
import { ChartAtom } from './ChartAtom.importable';

describe('ChartAtom', () => {
	it('should render', () => {
		const { getByTestId } = render(<ChartAtom id="123abc" html={html} />);

		expect(getByTestId('chart')).toBeInTheDocument();
	});
});
