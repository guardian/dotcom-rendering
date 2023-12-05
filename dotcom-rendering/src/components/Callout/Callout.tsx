import { css } from '@emotion/react';
import { headline, space } from '@guardian/source-foundations';
import type { TabProps } from '@guardian/source-react-components-development-kitchen';
import { Tabs } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import { palette } from '../../palette';
import type {
	CalloutContactType,
	CampaignFieldType,
} from '../../types/content';
import { CalloutDescription, CalloutShare } from './CalloutComponents';
import { Form } from './Form';
import { conditionallyRenderContactIcon, MessageUs } from './MessageUs';

const summaryContentWrapper = css`
	visibility: visible;
	padding-top: 2px;
	padding-bottom: ${space[6]}px;
`;

const promptStyles = css`
	${headline.xxsmall({ fontWeight: 'bold' })};
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
}

export const CalloutBlock = ({
	prompt,
	heading,
	description,
	formFields,
	formId,
	submissionURL,
	isNonCollapsible,
	contacts = [],
	pageId,
}: CalloutBlockProps) => {
	const shouldShowContacts = contacts.length > 0;
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
						content: (
							<MessageUs
								contacts={contacts}
								useBrandColour={!isNonCollapsible}
							/>
						),
					},
			  ]
			: [form]
	) satisfies TabProps[];

	const [selectedTab, setSelectedTab] = useState(form.id);

	return (
		<div
			id={formId}
			style={{
				'--article-link-text': isNonCollapsible
					? undefined
					: palette('--callout-prompt'),
			}}
		>
			<div
				css={summaryContentWrapper}
				style={{
					paddingInline: isNonCollapsible ? 0 : `${space[2]}px`,
				}}
			>
				{!!prompt && (
					<div
						css={promptStyles}
						style={{
							color: isNonCollapsible
								? palette('--article-text')
								: palette('--callout-prompt'),
						}}
					>
						{prompt}
					</div>
				)}
				{shouldShowHeading && (
					<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				)}
				{!!description && (
					<CalloutDescription description={description} />
				)}
				<CalloutShare title={heading} urlAnchor={formId} />
			</div>
			<Tabs
				tabsLabel="Tell us via online form or message us using your phone"
				tabElement="button"
				theme={{
					'--background': palette('--tabs--background'),
					'--text': palette('--tabs--text'),
					'--border': palette('--tabs--border'),
					'--inactiveBackground': palette(
						'--tabs--inactiveBackground',
					),
				}}
				tabs={tabs}
				selectedTab={selectedTab}
				onTabChange={setSelectedTab}
			/>
		</div>
	);
};
