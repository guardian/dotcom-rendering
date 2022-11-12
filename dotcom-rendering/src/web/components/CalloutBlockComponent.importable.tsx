import { css } from '@emotion/react';
import {
	body,
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';
import { Deadline } from './CalloutNew/CalloutDeadline';
import { CalloutShareComponent } from './CalloutNew/CalloutShareComponent';
import { Form } from './CalloutNew/Form';
import { ExpandingWrapper } from './ExpandingWrapper';
import { useState } from 'react';

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

const activeUntilStyles = css`
	position: absolute;
	bottom: ${space[2]}px;
	right: ${space[2]}px;
	display: block;
`;

const linkTextStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
		}
		display: inline-block;
		${textSans.xsmall()}
	`;

type FormDataType = { [key in string]: any };

export const CalloutBlockComponent = ({
	callout,
	format,
	isNonCollapsible,
}: {
	callout: CalloutBlockElement;
	format: ArticleFormat;
	isNonCollapsible: boolean;
}) => {
	const [error, setError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const { title, description, formFields, activeUntil } = callout;

	const onSubmit = async (formData: FormDataType) => {
		// Reset error for new submission attempt
		setError('');

		if (formData.twitterHandle) {
			setError('Sorry we think you are a robot.');
			return;
		}

		// need to add prefix `field_` to all keys in form
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: formData[cur],
			}),
			{},
		);
		return fetch(callout.calloutsUrl, {
			method: 'POST',
			body: JSON.stringify({
				formId: callout.formId,
				// TODO: check if we need to send this
				'twitter-handle': '',
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					setSubmissionSuccess(true);
				} else {
					setError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch((respError) => {
				window.guardian.modules.sentry.reportError(
					respError,
					'callout-embed-submission',
				);

				setError(
					'Sorry, there was a problem submitting your form. Please try again later.',
				);
			});
	};

	if (submissionSuccess) {
		return (
			<details
				css={[calloutDetailsStyles, wrapperStyles]}
				aria-hidden={true}
				open={true}
			>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={titleStyles(format)}>
							Thank you for your contribution.
						</div>
						<h4 css={subtitleTextHeaderStyles}>
							We may get in touch for further information.
						</h4>
						<div css={[descriptionStyles, linkTextStyles(format)]}>
							You should receive a confirmation email with your
							response. To learn more about our community
							journalism please visit our{' '}
							<a href="www.theguardian.com">callouts page</a>.
						</div>
						<div css={activeUntilStyles}>
							<Deadline until={activeUntil} />
						</div>
					</div>
				</summary>
				<CalloutShareComponent format={format} />
			</details>
		);
	}
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
							<div css={activeUntilStyles}>
								<Deadline until={activeUntil} />
							</div>
						</div>
					</summary>
					<CalloutShareComponent format={format} />
					<Form
						formFields={formFields}
						onSubmit={onSubmit}
						format={format}
					/>
				</details>
			) : (
				<ExpandingWrapper
					format={format}
					renderExtra={() => <Deadline until={activeUntil} />}
				>
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
							</div>
						</summary>
						<CalloutShareComponent format={format} />
						<Form
							formFields={formFields}
							onSubmit={onSubmit}
							error={error}
							format={format}
						/>
					</details>
				</ExpandingWrapper>
			)}
		</aside>
	);
};
