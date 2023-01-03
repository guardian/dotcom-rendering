import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline, neutral, space } from '@guardian/source-foundations';
import { useState } from 'react';
import type { CampaignFieldType } from '../../types/content';
import { decidePalette } from '../lib/decidePalette';
import {
	CalloutDescription,
	CalloutShare,
	CalloutTermsAndConditions,
} from './Callout/CalloutComponents';
import { Form } from './Callout/Form';
import { MessageUs } from './Callout/MessageUs';
import { Tabs } from './Tabs';

const ruleStyles = css`
	border-image: repeating-linear-gradient(
			to bottom,
			${neutral[86]},
			${neutral[86]} 1px,
			transparent 1px,
			transparent 4px
		)
		13;
	border-top: 13px solid ${neutral[86]};
`;

const wrapperStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	background-color: ${neutral[97]};
`;

const calloutDetailsStyles = css`
	position: relative;
	padding-bottom: ${space[2]}px;
`;

const summaryContentWrapper = css`
	visibility: visible;
`;

const titleStyles = (format: ArticleFormat) => css`
	${headline.xxsmall({ fontWeight: 'bold' })}
	color: ${decidePalette(format).text.calloutHeading}
`;

const subtitleTextHeaderStyles = css`
	${headline.xxsmall()}
	padding-bottom: ${space[3]}px;
`;

export interface CalloutBlockProps {
	formId: number;
	heading: string;
	formFields: CampaignFieldType[];
	format: ArticleFormat;
	description: string;
	submissionURL: string;
}

export const CalloutBlock = ({
	formId,
	heading,
	formFields,
	format,
	description,
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
					format={format}
					submissionURL={submissionURL}
					formID={formId}
				/>
			),
		},
		{
			id: 'contact',
			text: 'Message us',
			content: <MessageUs format={format} />,
		},
	];

	return (
		<div css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}>
			<div css={summaryContentWrapper}>
				<div css={titleStyles(format)}>Tell us</div>
				<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				<CalloutDescription format={format} description={description} />
			</div>
			<CalloutTermsAndConditions format={format} />
			<CalloutShare format={format} />
			<Tabs
				tabsLabel="Tell us"
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
