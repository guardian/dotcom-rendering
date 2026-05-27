import { render } from '@testing-library/react';
import { AgeWarning } from '../components/AgeWarning';

describe('Data Attributes', () => {
	it('Article age warning element has an "age-warning" data-gu-name attribute', () => {
		const { container } = render(
			<AgeWarning age="3 years old" isScreenReader={false} />,
		);
		const el = container.querySelector('[data-gu-name="age-warning"]');
		expect(el).toBeInTheDocument();
	});
});
