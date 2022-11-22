import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign } from '../../../fixtures/manual/calloutCampaign';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

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
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
			/>
		</div>
	);
};
Default.story = { name: 'default' };
