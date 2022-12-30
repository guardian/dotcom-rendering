import { ThemeProvider } from '@emotion/react';
import {
	Checkbox,
	CheckboxGroup,
	Option,
	Radio,
	RadioGroup,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import { FileInput } from '@guardian/source-react-components-development-kitchen';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { logger } from '../../../server/lib/logging';
import type { CampaignFieldType } from '../../../types/content';
import { decidePalette } from '../../lib/decidePalette';

type FormDataType = { [key in string]: any };

type FormFieldProp = {
	validationErrors: { [key in string]: string };
	format: ArticleFormat;
	formField: CampaignFieldType;
	formData: FormDataType;
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
};

export const FormField = ({
	format,
	formField,
	formData,
	setFieldInFormData,
	validationErrors,
}: FormFieldProp) => {
	const { type, label, hideLabel, description, required, id } = formField;

	const name = `field_${type}_${id}`;
	const fieldValue =
		formField.id in formData ? (formData[formField.id] as string) : '';
	const fieldError = validationErrors[formField.id];

	const decideError = (): string | undefined => {
		return error != '' ? error : fieldError;
	};

	const regexPatternForValidation = (): string | undefined => {
		switch (formField.id) {
			case 'email':
				return '^[^s@]+@[^s@]+.[^s@]+$';
			case 'number':
			case 'phone':
				return '^[0-9 ()+-]*$';
			default:
				return undefined;
		}
	};

	const [error, setError] = useState('');

	const handleBlur = (
		event: ChangeEvent<
			| HTMLInputElement
			| HTMLTextAreaElement
			| HTMLSelectElement
			| HTMLFieldSetElement
		>,
	) => {
		if (event.target.validity.valueMissing) {
			setError('This field is required');
		}
		if (event.target.validity.patternMismatch) {
			switch (formField.id) {
				case 'email':
					setError('Please enter a valid email address');
					break;
				case 'number':
				case 'phone':
					setError('Please enter a valid phone number');
					break;
				default:
					return;
			}
		}
	};

	const handleChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const newValueIsValid =
			!event.target.validity.patternMismatch &&
			!event.target.validity.valueMissing;
		if (error) {
			if (newValueIsValid) {
				setError('');
			}
		}
		setFieldInFormData(formField.id, event.target.value);
	};

	switch (formField.type) {
		case 'text': {
			return (
				<TextInput
					pattern={regexPatternForValidation() ?? undefined}
					onBlur={(e): void => handleBlur(e)}
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					optional={!required}
					value={fieldValue}
					error={decideError()}
					data-testid={`form-field-${formField.id}`}
					type={formField.type}
					onChange={(e): void => handleChange(e)}
				/>
			);
		}
		case 'textarea':
			return (
				<TextArea
					onBlur={(e): void => handleBlur(e)}
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					optional={!required}
					value={fieldValue}
					error={decideError()}
					data-testid={`form-field-${formField.id}`}
					onChange={(e): void => handleChange(e)}
				/>
			);
		case 'file':
			return (
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
							setFieldInFormData(formField.id, file)
						}
					/>
				</ThemeProvider>
			);
		case 'select':
			return (
				<Select
					onBlur={(e): void => handleBlur(e)}
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					optional={!required}
					value={fieldValue}
					error={fieldError}
					data-testid={`form-field-${formField.id}`}
					onChange={(e): void => handleChange(e)}
					children={[
						{
							value: 'default',
							label: 'Please choose an option',
						},
					]
						.concat(formField.options)
						.map(({ value, label }) => {
							return (
								<Option key={value} value={value}>
									{label}
								</Option>
							);
						})}
				/>
			);
		case 'checkbox':
			return (
				<CheckboxGroup
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					error={fieldError ? fieldError : undefined}
					data-testid={`form-field-${formField.id}`}
				>
					{formField.options.map((option, index) => {
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
								onBlur={(e): void => handleBlur(e)}
								name={name}
								label={option.label}
								value={option.value}
								checked={isCheckboxChecked}
								error={fieldError ? true : false}
								data-testid={`form-field-${option.value}`}
								onChange={(): void => {
									setFieldInFormData(
										id,
										isCheckboxChecked
											? filterOutCheckboxFromArray()
											: addCheckboxToArray(),
									);
								}}
							/>
						);
					})}
				</CheckboxGroup>
			);
		case 'radio':
			return (
				<RadioGroup
					onBlur={(e): void => handleBlur(e)}
					label={formField.label}
					supporting={formField.description}
					error={validationErrors?.[formField.id]}
					name={formField.name}
					orientation={
						formField.options.length > 2 ? 'vertical' : 'horizontal'
					}
				>
					{formField.options.map((option, index) => {
						return (
							<Radio
								required={required}
								onBlur={(e): void => handleBlur(e)}
								data-testid={`form-field-${option.value}`}
								key={index}
								label={option.label}
								value={option.value}
								name={`${formField.id}`}
								checked={
									formField.id in formData &&
									formData[formField.id] === option.value
								}
								onChange={(e): void => handleChange(e)}
							/>
						);
					})}
				</RadioGroup>
			);
		default:
			logger.error(`Invalid field ${type} provided for callout`);
			return null;
	}
};
