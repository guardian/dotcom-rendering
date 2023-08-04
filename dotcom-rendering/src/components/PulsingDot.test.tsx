import { render } from '@testing-library/react';
import { PulsingDot } from './PulsingDot.tsx';

describe('PulsingDot', () => {
	it('It should render pulsing dot as expected', () => {
		const dotColour = 'blue';
		const { container } = render(<PulsingDot colour={dotColour} />);
		expect(container.firstChild).toHaveStyle(`color: ${dotColour}`);
	});
});
