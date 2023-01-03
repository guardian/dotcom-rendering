import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaignV2';
import { CalloutBlock } from './Callout';

export default {
	component: CalloutBlock,
	title: 'Components/CalloutBlock',
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
				padding: 15px;
			`}
		>
			<CalloutBlock
				formId={calloutCampaign.formId}
				heading={calloutCampaign.title}
				description={calloutCampaign.description}
				submissionURL={calloutCampaign.calloutsUrl}
				formFields={calloutCampaign.formFields}
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
