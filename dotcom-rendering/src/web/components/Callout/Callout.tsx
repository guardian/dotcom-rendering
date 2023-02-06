import { css } from '@emotion/react';
import { brand, headline, neutral, space } from '@guardian/source-foundations';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CampaignFieldType } from '../../../types/content';
import { CalloutDescription, CalloutShare } from './CalloutComponents';
import { Form } from './Form';
import { MessageUs } from './MessageUs';

const wrapperStyles = css`
	background-color: ${neutral[97]};
`;

const summaryContentWrapper = css`
	visibility: visible;
	padding: 2px ${space[2]}px ${space[6]}px ${space[2]}px;
`;

const titleStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${brand[500]};
`;

const subtitleTextHeaderStyles = css`
	${headline.xxsmall()}
	padding-bottom: ${space[3]}px;
`;

export interface CalloutBlockProps {
	heading: string;
	description: string;
	formFields: CampaignFieldType[];
	formId: string;
	submissionURL: string;
	isExpired: boolean;
}

export const CalloutBlock = ({
	heading,
	description,
	formFields,
	formId,
	submissionURL,
}: CalloutBlockProps) => {
	const [selectedTab, setSelectedTab] = useState('form');
	const tabsContent = [
		{
			id: 'form',
			text: 'Tell us here',
			content: (
				<Form
					formFields={formFields}
					submissionURL={submissionURL}
					formID={formId}
				/>
			),
		},
		{
			id: 'contact',
			text: 'Message us',
			content: <MessageUs />,
		},
	];

	return (
		<div id={formId} css={wrapperStyles}>
			<div css={summaryContentWrapper}>
				<div css={titleStyles}>Tell us</div>
				<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				<CalloutDescription description={description} />
				<CalloutShare title={heading} urlAnchor={formId} />
			</div>
			<Tabs
				tabsLabel="Tell us via online form or message us using your phone"
				tabElement="button"
				tabs={tabsContent}
				selectedTab={selectedTab}
				onTabChange={(tabName: string): void => {
					setSelectedTab(tabName);
				}}
			/>
		</div>
	);
};
