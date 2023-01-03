import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, InlineSuccess } from '@guardian/source-react-components';
import { ErrorSummary } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CampaignFieldType } from '../../../types/content';
import { decidePalette } from '../../lib/decidePalette';
import { FormField } from './FormField';

const submitButtonStyles = (format: ArticleFormat) => css`
	margin: 20px 0px;
	width: 100%;
	display: block;
	background-color: ${decidePalette(format).text.richLink};
	:hover {
		background-color: ${neutral[0]};
	}
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

const formFieldWrapperStyles = css`
	display: flex;
	flex-direction: column;
`;

const footerPaddingStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: ${space[4]}px;
`;

const textStyles = css`
	${textSans.medium()};
`;

type FormDataType = { [key in string]: any };

type FormProps = {
	formFields: CampaignFieldType[];
	format: ArticleFormat;
	submissionURL: string;
	formID: number;
};

export const Form = ({
	formFields,
	format,
	submissionURL,
	formID,
}: FormProps) => {
	const [formData, setFormData] = useState<FormDataType>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

	const [networkError, setNetworkError] = useState('');
	const [submissionSuccess, setSubmissionSuccess] = useState(false);

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
		let isValid = true;
		formFields.forEach((field: CampaignFieldType) => {
			if (field.required && !formData[field.id]) {
				errors[field.id] = 'This field is required';
				isValid = false;
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
					isValid = false;
				}
			}
			if (['number', 'phone'].includes(field.id) && formData[field.id]) {
				const numberRegex = /^[\d ()+-]+$/;
				if (!numberRegex.test(formData[field.id] as string)) {
					errors[field.id] = 'Please enter a valid number';
					isValid = false;
				}
				const noWhiteSpace = formData[field.id] as string;
				if (noWhiteSpace.length < 10) {
					errors[field.id] = 'Please include your dialling/area code';
					isValid = false;
				}
			}
			return isValid;
		});
		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const submitForm = async (form: FormDataType) => {
		setNetworkError('');

		// need to add prefix `field_` to all keys in form, required by formstack
		const formDataWithFieldPrefix = Object.keys(formData).reduce(
			(acc, cur) => ({
				...acc,
				[`field_${cur}`]: form[cur],
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

	if (submissionSuccess) {
		return (
			<InlineSuccess>
				Thank you, your story has been submitted successfully. One of
				our journalists will be in touch if we wish to take your
				submission further.
			</InlineSuccess>
		);
	}

	return (
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
					`}
				/>
			)}
			{formFields.map((formField) => (
				<div css={formFieldWrapperStyles}>
					<FormField
						key={formField.id}
						format={format}
						formField={formField}
						formData={formData}
						setFieldInFormData={setFieldInFormData}
						validationErrors={validationErrors}
					/>
				</div>
			))}
			<div css={textStyles}>
				One of our journalists will be in contact before we publish your
				information, so please do leave contact details.
			</div>
			{!!networkError && <div css={errorTextStyles}>{networkError}</div>}
			<div css={footerPaddingStyles}>
				<Button
					priority="primary"
					type="submit"
					cssOverrides={submitButtonStyles(format)}
				>
					Submit
				</Button>
				<div
					css={css`
						a,
						a:hover {
							border: 0;
						}
						text-align: right;
					`}
				></div>
			</div>
		</form>
	);
};
