import React from 'react';
import { render } from '@testing-library/react';

import { ClickToView } from './ClickToView';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
describe('ClickToView', () => {
	const abTests = (
		isUserInVariant: boolean,
	): CAPIType['config']['abTests'] => {
		if (isUserInVariant) {
			return { clickToViewVariant: 'variant' };
		}
		return {};
	};

	it('It should render the third party content if it is not tracking', () => {
		const thirdPartyContent = <div data-testid="third-party-content" />;
		const { getByTestId } = render(
			<ClickToView
				isTracking={false}
				source="A Third Party"
				sourceDomain="athirdparty.com"
				abTests={abTests(false)}
				isPreview={false}
			>
				{thirdPartyContent}
			</ClickToView>,
		);

		expect(getByTestId('third-party-content')).toBeInTheDocument();
	});

	it('It should render third party content if the user is not in the ab test variant', () => {
		const { getByTestId } = render(
			<ClickToView
				isTracking={true}
				source="A Third Party"
				sourceDomain="athirdparty.com"
				abTests={abTests(false)}
				isPreview={false}
			>
				<div data-testid="third-party-content" />
			</ClickToView>,
		);

		expect(getByTestId('third-party-content')).toBeInTheDocument();
	});

	it('It should render a provider specific overlay if a source is present', () => {
		const { getByText } = render(
			<ClickToView
				isTracking={true}
				source="A Third Party"
				sourceDomain="athirdparty.com"
				abTests={abTests(true)}
				isPreview={false}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(getByText('Allow A Third Party content?')).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content provided by A Third Party',
				{ exact: false },
			),
		).toBeInTheDocument();
	});
	it('It should render a generic overlay if a source is not present', () => {
		const { getByText } = render(
			<ClickToView
				isTracking={true}
				sourceDomain="athirdparty.com"
				abTests={abTests(true)}
				isPreview={false}
			>
				<div id="third-party-content" />
			</ClickToView>,
		);

		expect(
			getByText('Allow content provided by a third party?'),
		).toBeInTheDocument();
		expect(
			getByText(
				'This article includes content hosted on athirdparty.com',
				{ exact: false },
			),
		).toBeInTheDocument();
	});
});
