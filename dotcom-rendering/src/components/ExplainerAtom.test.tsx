import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExplainerAtom } from './ExplainerAtom';

describe('ExplainerAtom', () => {
	it('should render', () => {
		const { getByText } = render(
			<ExplainerAtom
				id="123abc"
				title="title"
				html="<p>ExplainerAtom</p>"
			/>,
		);

		expect(getByText('ExplainerAtom')).toBeInTheDocument();
	});
});
