import { css } from '@emotion/react';
import {
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CalloutBlockElementV2 } from '../../types/content';
import { decidePalette } from '../lib/decidePalette';
import { CalloutBlock } from './Callout/Callout';
import { Deadline } from './Callout/Deadline';

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

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElementV2;
	format: ArticleFormat;
}) => {
	const { title, description, formFields, activeUntil, calloutsUrl, formId } =
		callout;
	const isEmbed = !callout.isNonCollapsible;

	const isExpired = (date: number | undefined): boolean => {
		if (date) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	if (isEmbed && isExpired(activeUntil)) {
		return null;
	}

	return (
		<>
			{isEmbed ? (
				<aside>
					<ExpandingWrapper
						name={`${callout.formId} form`}
						renderExtra={() => <Deadline until={activeUntil} />}
					>
						<CalloutBlock
							formId={formId}
							heading={title}
							formFields={formFields}
							format={format}
							description={description}
							submissionURL={calloutsUrl}
						/>
					</ExpandingWrapper>
				</aside>
			) : (
				<CalloutBlock
					formId={formId}
					heading={title}
					formFields={formFields}
					format={format}
					description={description}
					submissionURL={calloutsUrl}
				/>
			)}
		</>
	);
};
