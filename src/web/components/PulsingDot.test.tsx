import React from 'react';
import { render } from '@testing-library/react';
import { PulsingDot, DISABLE_FLASHING_ELEMENTS_CLASS } from './PulsingDot';

describe('PulsingDot', () => {
	it('It should render pulsing dot as expected', () => {
		const dotColour = 'blue';
		const { container } = render(<PulsingDot colour={dotColour} />);
		expect(container.firstChild).toHaveStyle(`color: ${dotColour}`);
	});

	it('It should not render pulsing dot if the no flashing class is present in the container', () => {
		document.body.className += `${''} ${DISABLE_FLASHING_ELEMENTS_CLASS}`;
		const { container } = render(<PulsingDot colour="green" />);
		expect(container.firstChild).toBeNull();
	});
});
