import { css } from '@emotion/react';
import { calloutCampaign } from '../../fixtures/manual/calloutCampaign';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
import { customMockFetch } from '../lib/mockRESTCalls';
import { CalloutEmbedBlockComponent } from './CalloutEmbedBlockComponent.importable';

export default {
	component: CalloutEmbedBlockComponent,
	title: 'Components/CalloutEmbedBlockComponent',
};

const mockGoodRequestFetch = customMockFetch([
	{
		mockedMethod: 'POST',
		mockedUrl:
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		mockedStatus: 201,
	},
]);

export const Default = () => {
	global.fetch = mockGoodRequestFetch;

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
