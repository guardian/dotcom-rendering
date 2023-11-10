import { css } from '@emotion/react';
import { log } from '@guardian/libs';
import {
	headline,
	palette,
	space,
	success,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgTickRound } from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CampaignFieldType } from '../../types/content';
import { CalloutTermsAndConditions } from './CalloutComponents';
import { FormField } from './FormField';

const textStyles = css`
	${textSans.xsmall()};
	padding-bottom: 16px;
`;

const successStyles = css`
	${textSans.xsmall()};
	padding-bottom: 44px;
`;

const tickBoxStyles = css`
	fill: ${success[400]};
	width: 48px;
`;
const errorTextStyles = css`
	color: ${palette.error[400]};
	${textSans.medium({ fontWeight: 'bold' })};
	display: flex;
`;

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const formFieldWrapperStyles = (hidden: boolean) => css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${hidden ? 0 : space[4]}px;
`;
const submitButtonStyles = css`
	margin: 20px 0px;
	width: 100%;
	display: block;
`;

const footerPaddingStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: ${space[4]}px;
`;

type FormDataType = { [key in string]: any };

type FormProps = {
	formFields: CampaignFieldType[];
	submissionURL: string;
	formID: string;
	pageId: string;
};

export const Form = ({
	formFields,
	submissionURL,
	formID,
	pageId,
}: FormProps) => {
	const [formData, setFormData] = useState<FormDataType>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

	const [networkError, setNetworkError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);
	const [twitterHandle, setTwitterHandle] = useState('');

	const setFieldInFormData = (
		id: string,
		data: string | string[] | undefined,
	): void => {
		const currentErrors = validationErrors;
		currentErrors[id] = '';
		setValidationErrors(currentErrors);

		setFormData({
			...formData,
			[id]: data,
		});
	};

	const validateForm = (): boolean => {
		const errors: { [key in string]: string } = {};
		for (const field of formFields) {
			if (field.required && !formData[field.id]) {
				errors[field.id] = 'This field is required';
			}
			if (field.type === 'select' && field.required) {
				if (formData[field.id] === 'Please choose an option') {
					errors[field.id] =
						'Please choose an option from the dropdown menu';
				}
			}
			if (field.id === 'email' && formData[field.id]) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid email address';
				}
			}
			if (
				['number', 'phone'].includes(field.type) &&
				formData[field.id]
			) {
				const numberRegex = /^[\d ()+-]+$/;
				if (!numberRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid number';
				}
				const noWhiteSpace = formData[field.id] as string;
				if (noWhiteSpace.length < 10) {
					errors[field.id] = 'Please include your dialling/area code';
				}
			}
		}
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const cleanFormData = (data: undefined | string | string[]) => {
		if (Array.isArray(data)) {
			return data.join('\n');
		}

		return data;
	};

	const submitForm = async (form: FormDataType) => {
		setNetworkError('');

		if (formData.twitterHandle) {
			setNetworkError('Sorry we think you are a robot.');
			return;
		}
		// need to add prefix `field_` to all keys in form, required by formstack
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: cleanFormData(form[cur]),
			}),
			{},
		);
		return fetch(submissionURL, {
			method: 'POST',
			body: JSON.stringify({
				formId: formID,
				...formDataWithFieldPrefix,
			}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then((resp) => {
				if (resp.status === 201) {
					log('dotcom', 'Submission of callout form succeeded');
					setSubmissionSuccess(true);
				} else {
					log(
						'dotcom',
						`Submission of callout form failed: ${JSON.stringify(
							resp.body,
						)}`,
					);
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

	if (submissionSuccess) {
		return (
			<>
				<div css={tickBoxStyles}>
					<SvgTickRound />
				</div>
				<div
					css={css`
						${headline.xxsmall({ fontWeight: 'bold' })}
					`}
				>
					Thank you!
				</div>
				<div css={successStyles}>
					Your story has been submitted successfully. One of our
					journalists will be in touch if we wish to take your
					submission further.
				</div>
			</>
		);
	}

	return (
		<>
			<CalloutTermsAndConditions />
			<form
				action="/formstack-campaign/submit"
				method="post"
				css={formStyles}
				noValidate={true}
				onSubmit={(e) => {
					e.preventDefault();
					const isValid = validateForm();
					if (!isValid) {
						const firstInvalidFormElement: HTMLInputElement =
							document.querySelectorAll(
								':invalid',
							)[1] as HTMLInputElement;
						firstInvalidFormElement.focus();
						return;
					}
					void submitForm(formData);
				}}
			>
				{Object.values(validationErrors).filter((err) => err !== '')
					.length > 0 && (
					<ErrorSummary
						message="Some information is missing."
						context="Please complete all required fields."
						cssOverrides={css`
							width: fit-content;
							width: 100%;
							margin-bottom: ${space[4]}px;
						`}
					/>
				)}
				{formFields.map((formField) => {
					return (
						<div
							css={formFieldWrapperStyles(!!formField.hidden)}
							key={formField.id}
						>
							<FormField
								formField={formField}
								formData={formData}
								setFieldInFormData={setFieldInFormData}
								validationErrors={validationErrors}
								pageId={pageId}
							/>
						</div>
					);
				})}
				<div css={textStyles}>
					By submitting your response, you are agreeing to share your
					details with us for this feature.
				</div>
				{/* this element is a H O N £ Y - P 0 T */}
				<div
					css={css`
						position: absolute;
						left: -62.5rem;
					`}
					aria-hidden="true"
				>
					<input
						name="twitter-handle"
						type="text"
						id="twitter-handle"
						tabIndex={-1}
						placeholder="@mytwitterhandle"
						value={twitterHandle}
						onChange={(e) => setTwitterHandle(e.target.value)}
					/>
				</div>
				{!!networkError && (
					<div css={errorTextStyles}>{networkError}</div>
				)}
				<div css={footerPaddingStyles}>
					<Button
						priority="primary"
						type="submit"
						cssOverrides={submitButtonStyles}
					>
						Submit
					</Button>
				</div>
			</form>
		</>
	);
};
