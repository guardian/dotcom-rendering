import { css } from '@emotion/react';
import {
	headline,
	palette as sourcePalette,
	space,
} from '@guardian/source-foundations';
import type { TabProps } from '@guardian/source-react-components-development-kitchen';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type {
	CalloutContactType,
	CampaignFieldType,
} from '../../types/content';
import { CalloutDescription, CalloutShare } from './CalloutComponents';
import { Form } from './Form';
import { conditionallyRenderContactIcon, MessageUs } from './MessageUs';

const summaryContentWrapper = (isNonCollapsible: boolean) => css`
	visibility: visible;
	padding-top: 2px;
	padding-bottom: ${space[6]}px;
	padding-left: ${isNonCollapsible ? 0 : space[2]}px;
	padding-right: ${isNonCollapsible ? 0 : space[2]}px;
`;

const promptStyles = (isNonCollapsible: boolean) => css`
	${headline.xxsmall({ fontWeight: 'bold' })};
	color: ${isNonCollapsible
		? sourcePalette.neutral[7]
		: sourcePalette.brand[500]};
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
`;

const tabIcons = css`
	padding-left: ${space[1]}px;
	display: flex;
	align-items: center;
`;

export interface CalloutBlockProps {
	prompt: string;
	heading: string;
	description: string;
	formFields: CampaignFieldType[];
	formId: string;
	submissionURL: string;
	isNonCollapsible: boolean;
	contacts?: CalloutContactType[];
	pageId: string;
	format: ArticleFormat;
}

export const CalloutBlock = ({
	prompt,
	heading,
	description,
	formFields,
	formId,
	submissionURL,
	isNonCollapsible,
	contacts,
	pageId,
	format,
}: CalloutBlockProps) => {
	const shouldShowContacts = contacts && contacts.length > 0;
	const shouldShowHeading = !!heading && !isNonCollapsible;
	const form = {
		id: 'form',
		text: <div>Tell us here</div>,
		content: (
			<Form
				formFields={formFields}
				submissionURL={submissionURL}
				formID={formId}
				pageId={pageId}
			/>
		),
	} satisfies TabProps;

	const tabs = (
		shouldShowContacts
			? [
					form,
					{
						id: 'contact',
						text: (
							<div css={tabTitle}>
								<div>Message us</div>
								<div css={tabIcons}>
									{contacts.map((c) =>
										conditionallyRenderContactIcon(c.name),
									)}
								</div>
							</div>
						),
						content: <MessageUs contacts={contacts} />,
					},
			  ]
			: [form]
	) satisfies TabProps[];

	const [selectedTab, setSelectedTab] = useState(form.id);

	return (
		<div id={formId}>
			<div css={summaryContentWrapper(isNonCollapsible)}>
				{!!prompt && (
					<div css={promptStyles(isNonCollapsible)}>{prompt}</div>
				)}
				{shouldShowHeading && (
					<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				)}
				{!!description && (
					<CalloutDescription
						description={description}
						useBrandColour={isNonCollapsible}
					/>
				)}
				<CalloutShare
					title={heading}
					urlAnchor={formId}
					useBrandColour={isNonCollapsible}
					format={format}
				/>
			</div>
			<Tabs
				tabsLabel="Tell us via online form or message us using your phone"
				tabElement="button"
				tabs={tabs}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
			/>
		</div>
	);
};
