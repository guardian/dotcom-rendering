import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { headline, neutral, space } from '@guardian/source-foundations';
import { useState } from 'react';
import type { CampaignFieldType } from '../../../types/content';
import { decidePalette } from '../../lib/decidePalette';
import {
	CalloutDescription,
	CalloutExpired,
	CalloutShare,
	CalloutTermsAndConditions,
} from './CalloutComponents';
import { Form } from './Form';
import { MessageUs } from './MessageUs';
import { Tabs } from '../Tabs';

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
	format: ArticleFormat;
	heading: string;
	description: string;
	formFields: CampaignFieldType[];
	formId: number;
	submissionURL: string;
	activeUntil: number;
}

export const CalloutBlock = ({
	format,
	heading,
	description,
	formFields,
	formId,
	submissionURL,
	activeUntil,
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
	const isExpired = (date: number | undefined): boolean => {
		if (date) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	return (
		<div css={[calloutDetailsStyles, wrapperStyles]}>
			<div css={summaryContentWrapper}>
				<div css={titleStyles(format)}>Tell us</div>
				<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
				<CalloutDescription format={format} description={description} />
			</div>
			<CalloutTermsAndConditions format={format} />
			<CalloutShare format={format} />
			{isExpired(activeUntil) ? (
				<CalloutExpired />
			) : (
				<Tabs
					tabsLabel="Tell us"
					tabElement="button"
					tabs={tabsContent}
					selectedTab={selectedTab}
					onTabChange={(tabName: string): void => {
						setSelectedTab(tabName);
					}}
				/>
			)}
		</div>
	);
};
