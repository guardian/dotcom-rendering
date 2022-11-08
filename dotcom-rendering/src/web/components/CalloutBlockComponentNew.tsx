import { css } from '@emotion/react';
import { body, headline, neutral, space } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { CalloutShareComponent } from './CalloutNew/CalloutShareComponent';
import { Deadline } from './CalloutNew/Deadline';
import { Form } from './CalloutNew/Form';
import { ExpandingWrapper } from './ExpandingWrapper';

const wrapperStyles = css`
	margin-bottom: ${space[6]}px;
	margin-top: ${space[4]}px;
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	background-color: ${neutral[97]};
`;

const calloutDetailsStyles = css`
	border-top: 1px ${neutral[86]} solid;
	border-bottom: 1px ${neutral[86]} solid;
	position: relative;
	padding-bottom: ${space[2]}px;

	/* IE does not support summary HTML elements, so we need to hide children ourself */
	:not([open]) > *:not(summary) {
		display: none;
	}
`;

const summaryStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	/* Removing default styles from summery tag */
	ft ::-webkit-details-marker {
		display: none;
	}
	outline: none;

	/* We don't want the summary to open when we click anything but the button, so we pointer-event: none the summary */
	/* 176da211-05aa-4280-859b-1e3157b3f19e */
	pointer-events: none;

	/*
        why hide visibility?
        because we want to prevent the user for tabbing to the summery HTML element
        without using tabIndex={-1} which would disable focus on all child DOM elements

        NOTE: requires "visibility: visible;" on child elements to display and enable focus
    */
	visibility: hidden;

	a {
		/* but we do want to allow click on links */
		pointer-events: all;
	}
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
	padding-bottom: ${space[2]}px;
`;

const descriptionStyles = css`
	${body.medium()}
`;

const ageWarningStyles = css`
	position: absolute;
	bottom: ${space[2]}px;
	right: ${space[2]}px;
	display: block;
`;

export const CalloutBlockComponent = ({
	callout,
	format,
	isNonCollapsible,
}: {
	callout: CalloutBlockElement;
	format: ArticleFormat;
	isNonCollapsible: boolean;
}) => {
	const { title, description, formFields } = callout;

	return (
		<aside>
			{isNonCollapsible ? (
				<details
					css={[calloutDetailsStyles, wrapperStyles]}
					aria-hidden={true}
					open={true}
				>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div css={titleStyles(format)}>
								Share your experience
							</div>
							<h4 css={subtitleTextHeaderStyles}>{title}</h4>
							<div css={descriptionStyles}>{description}</div>
							<div css={ageWarningStyles}>
								<Deadline age={'2 weeks old'} />
							</div>
						</div>
					</summary>
					<CalloutShareComponent format={format} />
					<Form
						formFields={formFields}
						onSubmit={() => {}}
						format={format}
					/>
				</details>
			) : (
				<ExpandingWrapper format={format}>
					<details
						css={[calloutDetailsStyles, wrapperStyles]}
						aria-hidden={true}
						open={true}
					>
						<summary css={summaryStyles}>
							<div css={summaryContentWrapper}>
								<div css={titleStyles(format)}>
									Share your experience
								</div>
								<h4 css={subtitleTextHeaderStyles}>{title}</h4>
								<div css={descriptionStyles}>{description}</div>
								<div css={ageWarningStyles}>
									<Deadline age={'2 weeks old'} />
								</div>
							</div>
						</summary>
						<CalloutShareComponent format={format} />
						<Form
							formFields={formFields}
							onSubmit={() => {}}
							format={format}
						/>
					</details>
				</ExpandingWrapper>
			)}
		</aside>
	);
};
