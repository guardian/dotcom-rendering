import React from 'react';
import { render } from '@testing-library/react';

import { ThirdPartyEmbeddedContent } from './ThirdPartyEmbeddedContent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
describe('ThirdPartyEmbeddedContent', () => {
	it('It should render the third party content if it is not tracking', () => {
		const thirdPartyContent = <div data-testid="third-party-content" />;
		const { getByTestId } = render(
			<ThirdPartyEmbeddedContent
				isTracking={false}
				source="A Third Party"
				sourceDomain="athirdparty.com"
			>
				{thirdPartyContent}
			</ThirdPartyEmbeddedContent>,
		);

		expect(getByTestId('third-party-content')).toBeInTheDocument();
	});

	it('It should render a provider specific overlay if a source is present', () => {
		const { getByText } = render(
			<ThirdPartyEmbeddedContent
				isTracking={true}
				source="A Third Party"
				sourceDomain="athirdparty.com"
			>
				<div id="third-party-content" />
			</ThirdPartyEmbeddedContent>,
		);

		expect(getByText('Allow A Third Party content?')).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content provided by A Third Party. We ask for your permission berfore anyting is loaded, as they may be using cookies and other technologies.',
			),
		).toBeInTheDocument();
	});
	it('It should render a generic overlay if a source is not present', () => {
		const { getByText } = render(
			<ThirdPartyEmbeddedContent
				isTracking={true}
				sourceDomain="athirdparty.com"
			>
				<div id="third-party-content" />
			</ThirdPartyEmbeddedContent>,
		);

		expect(
			getByText('Allow content provided by a thrid party?'),
		).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content hosted on athirdparty.com. We ask for your permission berfore anyting is loaded, as the provider may be using cookies and other technologies.',
			),
		).toBeInTheDocument();
	});
});
