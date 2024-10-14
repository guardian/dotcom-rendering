import { css } from '@emotion/react';
import { calloutCampaign } from '../../fixtures/manual/calloutCampaign';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { CalloutEmbedBlockComponent } from './CalloutEmbedBlockComponent.importable';
import { customMockedFetch } from '../lib/mockRESTCalls';

export default {
	component: CalloutEmbedBlockComponent,
	title: 'Components/CalloutEmbedBlockComponent',
};

const goodRequest = customMockedFetch([
	{
		mockedMethod: 'POST',
		mockedUrl:
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		mockedStatus: 201,
	},
]);

export const Default = () => {
	global.fetch = goodRequest;

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
