import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
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
	padding-left: ${space[2]}px;
	padding-right: ${space[2]}px;
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
	margin-top: ${space[2]}px;
	${textSans.medium()};
`;

type FormDataType = { [key in string]: any };

type FormProps = {
	onSubmit: (formData: FormDataType) => void;
	formFields: CampaignFieldType[];
	format: ArticleFormat;
	error?: string;
};

export const Form = ({ onSubmit, formFields, format, error }: FormProps) => {
	const [formData, setFormData] = useState<FormDataType>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

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
				onSubmit(formData);
			}}
		>
			{Object.keys(validationErrors).length > 1 && (
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
			{!!error && <div css={errorTextStyles}>{error}</div>}
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
