import { css, ThemeProvider } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	Select,
	SvgAlertTriangle,
	TextArea,
	TextInput,
	Option,
} from '@guardian/source-react-components';
import { FileInput } from '@guardian/source-react-components-development-kitchen';
import { useState } from 'react';
import type { CampaignFieldType } from 'src/types/content';
import { decidePalette } from '../../lib/decidePalette';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';

const submitButtonStyles = (format: ArticleFormat) => css`
	margin: 20px 0px;
	width: 100%;
	display: block;
	background-color: ${decidePalette(format).text.richLink};
	:hover {
		background-color: ${neutral[0]};
	}
`;

const formFieldStyles = css`
	margin-top: ${space[2]}px;
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

type FormFieldProp = {
	validationErrors: { [key in string]: string };
	format: ArticleFormat;
	formField: CampaignFieldType;
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

const FormField = ({
	format,
	formField,
	formData,
	setFormData,
	validationErrors,
}: FormFieldProp) => {
	const { type, label, hideLabel, description, required, id } = formField;

	const name = `field_${type}_${id}`;
	const fieldValue =
		formField.id in formData ? (formData[formField.id] as string) : '';
	const fieldError = validationErrors[formField.id];

	switch (formField.type) {
		case 'textarea':
			return (
				<div css={formFieldStyles}>
					<TextArea
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
					/>
				</div>
			);
		case 'file':
			return (
				<div css={formFieldStyles}>
					<ThemeProvider
						theme={{
							fileInput: {
								primary: decidePalette(format).text.richLink,
							},
						}}
					>
						<FileInput
							label={label}
							hideLabel={hideLabel}
							supporting={description}
							optional={!required}
							error={fieldError}
							data-testid={`form-field-${formField.id}`}
							onUpload={(file: string | undefined): void =>
								setFormData({
									...formData,
									[formField.id]: file,
								})
							}
						/>
					</ThemeProvider>
				</div>
			);
		case 'select':
			return (
				<div css={formFieldStyles}>
					<Select
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
						children={formField.options.map(({ value, label }) => {
							return (
								<Option key={value} value={value}>
									{label}
								</Option>
							);
						})}
					/>
				</div>
			);
		case 'checkbox':
			return (
				<div css={formFieldStyles}>
					<CheckboxGroup
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
					>
						{formField.options.map((option, index) => {
							// data related to this field is mapped to `formData` using `formField.id`
							// We cannot assume that the data exists, so we need to check if `formField.id` key exists in `formData`
							const selectedCheckboxesArray: string[] =
								formData[formField.id] ?? [];

							const isCheckboxChecked =
								!!selectedCheckboxesArray.find(
									(ele: string) => ele === option.value,
								);

							const filterOutCheckboxFromArray = () =>
								selectedCheckboxesArray.filter(
									(ele: string) => ele !== option.value,
								);

							const addCheckboxToArray = () => [
								...selectedCheckboxesArray,
								option.value,
							];

							return (
								<Checkbox
									name={name}
									label={option.label}
									value={option.value}
									checked={isCheckboxChecked}
									error={fieldError ? true : false}
									data-testid={`form-field-${formField.id}`}
									onChange={() => {
										setFormData({
											...formData,
											[formField.id]: isCheckboxChecked
												? filterOutCheckboxFromArray()
												: addCheckboxToArray(),
										});
									}}
								/>
							);
						})}
					</CheckboxGroup>
				</div>
			);
		case 'radio':
			return (
				<div css={formFieldStyles}>
					<RadioGroup
						label={formField.label}
						supporting={formField.description}
						error={validationErrors?.[formField.id]}
						name={formField.name}
						orientation={
							formField.options.length > 2
								? 'vertical'
								: 'horizontal'
						}
					>
						{formField.options.map((option, index) => {
							const isRadioChecked =
								formField.id in formData &&
								formData[formField.id] === option.value;
							return (
								<Radio
									data-testid={`form-field-${option.value}`}
									key={index}
									label={option.label}
									value={option.value}
									name={`${formField.id}`}
									checked={!!isRadioChecked}
									onChange={() =>
										setFormData({
											...formData,
											[formField.id]: option.value,
										})
									}
								/>
							);
						})}
					</RadioGroup>
				</div>
			);
		default: {
			return (
				<div css={formFieldStyles}>
					<TextInput
						name={name}
						label={label}
						hideLabel={hideLabel}
						supporting={description}
						optional={!required}
						value={fieldValue}
						error={fieldError}
						data-testid={`form-field-${formField.id}`}
						type={formField.type}
						onChange={(e) =>
							setFormData({
								...formData,
								[formField.id]: e.target.value,
							})
						}
					/>
				</div>
			);
		}
	}
};

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
	const [formData, setFormData] = useState<{ [key in string]: any }>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

	const validateForm = (): boolean => {
		const errors: { [key in string]: string } = {};
		let isValid = true;
		formFields.forEach((field: CampaignFieldType) => {
			if (field.required && !formData[field.id]) {
				errors[field.id] = 'This field is required';
				isValid = false;
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
					errors[field.id] =
						'Your phone number is too short. If using a landline, include your area code.';
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
				console.log(formData);
				const isValid = validateForm();
				if (!isValid) return;
				onSubmit(formData);
			}}
		>
			<CalloutTermsAndConditions format={format} />

			{Object.keys(validationErrors).length > 0 && (
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
						setFormData={setFormData}
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
