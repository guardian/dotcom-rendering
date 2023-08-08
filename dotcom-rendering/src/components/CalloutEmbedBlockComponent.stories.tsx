import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign } from '../../fixtures/manual/calloutCampaign';
import { CalloutEmbedBlockComponent } from './CalloutEmbedBlockComponent.importable';

export default {
	component: CalloutEmbedBlockComponent,
	title: 'Components/CalloutEmbedBlockComponent',
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
		)
		.spy('end:.hot-update.json');

	return (
		<div
			css={css`
				width: 630px;
				padding: 15px;
			`}
		>
			<CalloutEmbedBlockComponent
				callout={calloutCampaign}
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
		</div>
	);
};
Default.storyName = 'default';
