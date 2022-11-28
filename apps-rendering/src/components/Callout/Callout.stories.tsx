import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import Int64 from 'node-int64';
import type { ReactElement } from 'react';
import { css } from '@emotion/react';
import {
	neutral,
} from '@guardian/source-foundations';
import Callout from '.';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 2)
const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 1)

const callout = (): ReactElement => (
	<Callout
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		isNonCollapsible={false}
		activeUntil={new Int64(futureDate.getTime())}
		description={campaignDescription}
	/>
);

const closedCallout = (): ReactElement => (
	<>
	<p css={css`
		margin-bottom: 10px;
		padding: 15px;
		background: ${neutral[97]};
	`}>Only nonCollapsible callouts will render if they are expired</p>
	<Callout
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		isNonCollapsible={true}
		activeUntil={new Int64(pastDate.getTime())}
		description={campaignDescription}
		/>
	</>
);

const nonCollapsableCallout = (): ReactElement => (
	<Callout
	isNonCollapsible={true}
	name={mockCampaign.name}
	heading={mockCampaign.fields.callout}
	formId={mockCampaign.fields.formId}
	formFields={mockCampaign.fields.formFields}
	format={mockFormat}
	activeUntil={new Int64(futureDate.getTime())}
	description={campaignDescription}
	/>
);

export default {
	component: callout,
	title: 'AR/Callout',
};

export { callout, closedCallout, nonCollapsableCallout };
