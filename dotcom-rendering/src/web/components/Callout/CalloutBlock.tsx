import type { ArticleFormat } from '@guardian/libs';
import { css } from '@emotion/react';
import { useState } from 'react';
import type { FC, ReactElement } from 'react';
import { CampaignFieldType } from '../../../types/content';
import { Tabs } from '../Tabs';
import {
	CalloutShare,
	CalloutDescription,
	CalloutTermsAndConditions,
} from './CalloutComponents';
import { Form } from './Form';
import {
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { decidePalette } from '../../lib/decidePalette';
import { CalloutMessageUs } from './CalloutMessageUs';

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

const summaryStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	display: block;
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

const activeUntilStyles = css`
	position: absolute;
	bottom: ${space[1]}px;
	right: ${space[1]}px;
	display: block;
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

			// put contact here
			content: <CalloutMessageUs format={format} />,
		},
	];

	return (
		<div css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}>
			<summary css={summaryStyles}>
				<div css={summaryContentWrapper}>
					<div css={titleStyles(format)}>Tell us</div>
					<h4 css={subtitleTextHeaderStyles}>{heading}</h4>
					<CalloutDescription
						format={format}
						description={description}
					/>
				</div>
			</summary>
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
