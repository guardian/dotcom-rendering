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
import { useEffect, useRef } from 'react';
import type {
	CampaignFieldType,
	MessageUsFieldType,
} from '../../types/content';

type FormDataType = { [key in string]: any };

type FormFieldProp = {
	validationErrors: { [key in string]: string };
	formField: CampaignFieldType | MessageUsFieldType;
	formData: FormDataType;
	pageId: string;
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
};

export const FormField = ({
	formField,
	formData,
	setFieldInFormData,
	pageId,
	validationErrors,
}: FormFieldProp) => {
	const { type, label, hideLabel, description, required, id } = formField;

	const name = `field_${type}_${id}`;
	const fieldValue =
		formField.id in formData ? (formData[formField.id] as string) : '';
	const fieldError = validationErrors[formField.id];

	const firstUpdate = useRef(true);

	useEffect(() => {
		if (
			firstUpdate.current &&
			formField.hidden &&
			formField.type === 'text'
		) {
			setFieldInFormData(formField.id, pageId);
			firstUpdate.current = false;
		}
	}, [formField, pageId, setFieldInFormData]);

	switch (formField.type) {
		case 'phone':
		case 'email':
		case 'text': {
			if (formField.hidden) return null;
			return (
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
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
				/>
			);
		}
		case 'textarea':
			return (
				<TextArea
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					optional={!required}
					value={fieldValue}
					error={fieldError}
					data-testid={`form-field-${formField.id}`}
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
				/>
			);
		case 'file':
			return (
				<FileInput
					label={label}
					hideLabel={hideLabel}
					supporting={'Please note, the maximum file size is 5MB.'}
					optional={!required}
					error={fieldError}
					data-testid={`form-field-${formField.id}`}
					maxFileSize={5_000_000}
					onUpload={(file: string | undefined): void =>
						setFieldInFormData(formField.id, file)
					}
				/>
			);
		case 'select':
			return (
				<Select
					name={name}
					label={label}
					hideLabel={hideLabel}
					supporting={description}
					optional={!required}
					value={fieldValue}
					error={fieldError}
					data-testid={`form-field-${formField.id}`}
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
					children={[
						{
							value: 'default',
							label: 'Please choose an option',
						},
					]
						.concat(formField.options)
						.map(({ value, label: formLabel }) => {
							return (
								<Option key={value} value={value}>
									{formLabel}
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
					optional={!required}
					error={fieldError ? fieldError : undefined}
					data-testid={`form-field-${formField.id}`}
				>
					{formField.options.map((option) => {
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
								key={option.value}
								label={option.label}
								value={option.value}
								checked={isCheckboxChecked}
								error={fieldError ? true : false}
								data-testid={`form-field-${option.value}`}
								onChange={(): void =>
									setFieldInFormData(
										id,
										isCheckboxChecked
											? filterOutCheckboxFromArray()
											: addCheckboxToArray(),
									)
								}
							/>
						);
					})}
				</CheckboxGroup>
			);
		case 'radio':
			return (
				<RadioGroup
					label={formField.label}
					supporting={formField.description}
					error={validationErrors[formField.id]}
					name={formField.name}
					orientation={
						formField.options.length > 2 ? 'vertical' : 'horizontal'
					}
				>
					{formField.options.map((option, index) => {
						return (
							<Radio
								data-testid={`form-field-${option.value}`}
								key={index}
								label={option.label}
								value={option.value}
								name={`${formField.id}`}
								checked={
									formField.id in formData &&
									formData[formField.id] === option.value
								}
								onChange={(e): void =>
									setFieldInFormData(
										formField.id,
										e.target.value,
									)
								}
							/>
						);
					})}
				</RadioGroup>
			);
		default:
			return null;
	}
};
