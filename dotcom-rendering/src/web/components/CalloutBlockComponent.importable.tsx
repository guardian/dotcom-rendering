import { css } from '@emotion/react';
import {
	headline,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import { InlineSuccess } from '@guardian/source-react-components';
import { ExpandingWrapper } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CalloutBlockElementV2 } from 'src/types/content';
import { decidePalette } from '../lib/decidePalette';
import { CalloutDescription } from './Callout/CalloutDescription';
import { CalloutExpired } from './Callout/CalloutExpired';
import { CalloutShare } from './Callout/CalloutShare';
import { Deadline } from './Callout/Deadline';
import { Form } from './Callout/Form';

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

const submissionSuccessStyles = css`
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
	${textSans.small()}
`;

type FormDataType = { [key in string]: any };

export const CalloutBlockComponent = ({
	callout,
	format,
}: {
	callout: CalloutBlockElementV2;
	format: ArticleFormat;
}) => {
	const [networkError, setNetworkError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const { title, description, formFields, activeUntil } = callout;
	const isEmbed = !callout.isNonCollapsible;

	const isExpired = (date: number | undefined): boolean => {
		if (date) {
			return Math.floor(new Date().getTime() / 1000) > date;
		}
		return false;
	};

	const onSubmit = async (formData: FormDataType) => {
		setNetworkError('');

		// need to add prefix `field_` to all keys in form, required by formstack
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
					setNetworkError(
						'Sorry, there was a problem submitting your form. Please try again later.',
					);
				}
			})
			.catch((respError) => {
				window.guardian.modules.sentry.reportError(
					respError,
					'callout-embed-submission',
				);

				setNetworkError(
					'Sorry, there was a problem submitting your form. Please try again later.',
				);
			});
	};

	if (isEmbed && isExpired(activeUntil)) {
		return null;
	}

	if (submissionSuccess) {
		return (
			<div css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}>
				<summary css={summaryStyles}>
					<div css={summaryContentWrapper}>
						<div css={titleStyles(format)}>Tell us</div>
						<h4 css={subtitleTextHeaderStyles}>{title}</h4>
						<CalloutDescription
							format={format}
							description={description}
						/>
						<div css={activeUntilStyles}>
							<Deadline until={activeUntil} />
						</div>
					</div>
				</summary>
				<CalloutShare format={format} />
				<div css={submissionSuccessStyles}>
					<InlineSuccess>
						Thank you, your story has been submitted successfully.
						One of our journalists will be in touch if we wish to
						take your submission further.
					</InlineSuccess>
				</div>
			</div>
		);
	}
	return (
		<>
			{isEmbed ? (
				<aside>
					<ExpandingWrapper
						name={`${callout.formId} form`}
						renderExtra={() => <Deadline until={activeUntil} />}
					>
						<details
							css={[calloutDetailsStyles, wrapperStyles]}
							aria-hidden={true}
							open={true}
						>
							<summary css={summaryStyles}>
								<div css={summaryContentWrapper}>
									<div css={titleStyles(format)}>Tell us</div>
									<h4 css={subtitleTextHeaderStyles}>
										{title}
									</h4>
									<CalloutDescription
										format={format}
										description={description}
									/>
								</div>
							</summary>
							<CalloutShare format={format} />
							<Form
								formFields={formFields}
								onSubmit={onSubmit}
								format={format}
								networkError={networkError}
							/>
						</details>
					</ExpandingWrapper>
				</aside>
			) : (
				<div css={[calloutDetailsStyles, wrapperStyles, ruleStyles]}>
					<summary css={summaryStyles}>
						<div css={summaryContentWrapper}>
							<div css={titleStyles(format)}>Tell us</div>
							<h4 css={subtitleTextHeaderStyles}>{title}</h4>
							<CalloutDescription
								format={format}
								description={description}
							/>
						</div>
					</summary>
					<div css={activeUntilStyles}>
						<Deadline until={activeUntil} />
					</div>
					<CalloutShare format={format} />
					{isExpired(activeUntil) ? (
						<CalloutExpired />
					) : (
						<Form
							formFields={formFields}
							onSubmit={onSubmit}
							format={format}
							networkError={networkError}
						/>
					)}
				</div>
			)}
		</>
	);
};
