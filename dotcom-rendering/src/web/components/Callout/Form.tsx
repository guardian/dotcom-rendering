import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgAlertTriangle } from '@guardian/source-react-components';
import { useState } from 'react';
import type { CampaignFieldType } from '../../../types/content';
import { decidePalette } from '../../lib/decidePalette';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';
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

const errorBoxStyles = css`
	padding: 10px;
	margin-bottom: ${space[2]}px;
	width: fit-content;
	border: ${space[1]}px solid ${palette.error[400]};

	svg {
		fill: ${palette.error[400]};
	}
`;

const errorHeaderStyles = css`
	color: ${palette.error[400]};
	${textSans.medium({ fontWeight: 'bold' })};
	display: flex;
`;

const errorBodyStyles = css`
	color: black;
	${textSans.medium()};
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
	${textSans.medium()};
`;

type FormDataType = { [key in string]: any };

type FormProps = {
	onSubmit: (formData: FormDataType) => void;
	formFields: CampaignFieldType[];
	format: ArticleFormat;
	networkError?: string;
};

export const Form = ({
	onSubmit,
	formFields,
	format,
	networkError,
}: FormProps) => {
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
				// console.log(formData);
				const isValid = validateForm();
				if (!isValid) return;
				onSubmit(formData);
			}}
		>
			<CalloutTermsAndConditions format={format} />

			{Object.keys(validationErrors).length > 1 && (
				<div css={errorBoxStyles}>
					<div css={errorHeaderStyles}>
						<SvgAlertTriangle size="medium" />
						Some information is missing
					</div>
					<div css={errorBodyStyles}>
						Please complete all required fields
					</div>
				</div>
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
			{!!networkError && (
				<div
					css={[
						errorHeaderStyles,
						css`
							margin-top: 8px;
						`,
					]}
				>
					{networkError}
				</div>
			)}
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
