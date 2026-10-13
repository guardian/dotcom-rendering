import { render } from '@testing-library/react';
import { InteractiveLayoutAtom } from './InteractiveLayoutAtom';

describe('InteractiveLayoutAtom', () => {
	it('should render all elements', () => {
		const { getByText, getByTestId } = render(
			<InteractiveLayoutAtom
				id="123abc"
				elementHtml="<p>InteractiveLayoutAtomText</p>"
				elementJs="var interactiveLayoutAtomVariable = 0"
				elementCss=".interactive-layout-atom-class {}"
				role="inline"
				type="model.dotcomrendering.pageElements.InteractiveAtomBlockElement"
				format={{
					display: 0,
					design: 0,
					theme: 0,
				}}
				articleArrangement="interactive"
			/>,
		);

		expect(getByText('InteractiveLayoutAtomText')).toBeInTheDocument();
		expect(getByTestId('script')).toBeInTheDocument();
		expect(getByTestId('style')).toBeInTheDocument();
	});
});
