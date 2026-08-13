import { render } from '@testing-library/react';
import { PulsingDot } from './PulsingDot.island';

describe('PulsingDot', () => {
	it('It should render pulsing dot as expected', () => {
		const dotColour = 'blue';
		const { container } = render(<PulsingDot colour={dotColour} />);
		expect(window.getComputedStyle(container.firstChild as Element).color).toBe(
			'rgb(0, 0, 255)',
		);
	});
});
