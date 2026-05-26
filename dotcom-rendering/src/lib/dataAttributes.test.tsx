import { render } from '@testing-library/react';
import { AgeWarning } from '../components/AgeWarning';
import { guDataAttribute } from './dataAttributes';

describe('Data Attributes', () => {
	it('Article age warning element has a data-gu-name attribute', () => {
		const { container } = render(
			<AgeWarning age="3 years old" isScreenReader={false} />,
		);
		const el = container.querySelector(
			`[data-gu-name="${guDataAttribute.ageWarning}"]`,
		);
		expect(el).toBeInTheDocument();
	});
});
