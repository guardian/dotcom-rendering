import { css } from '@emotion/react';
import fetchMock from 'fetch-mock';

import { Design, Display, Pillar } from '@guardian/types';

import { calloutCampaign } from '@root/fixtures/manual/calloutCampaign';
import { decidePalette } from '@root/src/web/lib/decidePalette';

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
				palette={decidePalette({
					display: Display.Standard,
					design: Design.Article,
					theme: Pillar.News,
				})}
			/>
		</div>
	);
};
Default.story = { name: 'default' };
