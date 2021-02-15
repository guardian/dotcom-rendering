import { css } from '@emotion/react';
import fetchMock from 'fetch-mock';

import { Pillar } from '@guardian/types';
import { calloutCampaign } from '@root/fixtures/calloutCampaign';

import { CalloutBlockComponent } from './CalloutBlockComponent';

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};

export const Default = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		);
	return (
		<div
			css={css`
				width: 630px;
				padding: 15px;
			`}
		>
			<CalloutBlockComponent
				callout={calloutCampaign}
				pillar={Pillar.News}
			/>
		</div>
	);
};
Default.story = { name: 'default' };
