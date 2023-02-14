import { css } from '@emotion/react';
import { brand, headline, neutral, space } from '@guardian/source-foundations';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type {
	CalloutContactType,
	CampaignFieldType,
} from '../../../types/content';
import { CalloutDescription, CalloutShare } from './CalloutComponents';
import { Form } from './Form';
import { conditionallyRenderContactIcon, MessageUs } from './MessageUs';

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

const tabTitle = css`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	margin-left: ${space[2]}px;
`;

const tabIcons = css`
	display: flex;
	align-items: center;
`;

export interface CalloutBlockProps {
	heading: string;
	description: string;
	formFields: CampaignFieldType[];
	formId: string;
	submissionURL: string;
	isExpired: boolean;
	isNonCollapsible: boolean;
	contacts?: CalloutContactType[];
}

export const CalloutBlock = ({
	heading,
	description,
	formFields,
	formId,
	submissionURL,
	isNonCollapsible,
	contacts,
}: CalloutBlockProps) => {
	const [selectedTab, setSelectedTab] = useState('form');
	const shouldShowContacts = contacts && contacts.length > 0;

	const tabsContent = [
		{
			id: 'form',
			text: <div>Tell us here</div>,
			content: (
				<Form
					formFields={formFields}
					submissionURL={submissionURL}
					formID={formId}
				/>
			),
		},
	];

	if (shouldShowContacts) {
		const tabsText = (
			<div css={tabTitle}>
				<div>Message us</div>
				<div css={tabIcons}>
					{contacts.map((c) =>
						conditionallyRenderContactIcon(c.name),
					)}
				</div>
			</div>
		);
		tabsContent.push({
			id: 'contact',
			text: tabsText,
			content: <MessageUs contacts={contacts} />,
		});
	}

	return (
		<div id={formId} css={wrapperStyles}>
			<div css={summaryContentWrapper}>
				<div css={titleStyles}>Share your experience</div>
				{!isNonCollapsible && (
					<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				)}
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
