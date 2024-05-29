import type { FormField as formFieldType } from '@guardian/apps-rendering-api-models/formField';
import {
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source/react-components';
import { FileInput } from '@guardian/source-development-kitchen/react-components';
import CheckboxInput from 'components/CheckboxInput';
import RadioInput from 'components/RadioInput';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { logger } from '../../logger';
import type { FormDataType, ValidationErrors } from './calloutForm';
import { fieldInput, textarea } from './styles';

type FormFieldProp = {
	formId: number;
	formField: formFieldType;
	formData: FormDataType;
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
	validationErrors: ValidationErrors;
};

export const FormField: FC<FormFieldProp> = ({
	formId,
	formField,
	formData,
	setFieldInFormData,
	validationErrors,
}) => {
	const { type, label, description, mandatory, options, id } = formField;
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
			setFieldInFormData(formField.id, window.location.pathname);
			firstUpdate.current = false;
		}
	}, [formField, setFieldInFormData]);

	const selectOptions = options.map(({ value, label }) => {
		return (
			<Option key={value} value={value}>
				{label}
			</Option>
		);
	});
	if (!fieldValue || !mandatory) {
		selectOptions.unshift(
			<Option value="">Please select an option</Option>,
		);
	}

	if (formField.hidden) return <input type="hidden" />;

	switch (type) {
		case 'text':
		case 'number':
		case 'phone':
		case 'email':
			return (
				<TextInput
					name={name}
					type={type === 'phone' ? 'tel' : type}
					label={label}
					optional={!mandatory}
					cssOverrides={fieldInput}
					supporting={description}
					value={fieldValue}
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
					error={fieldError}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					name={name}
					label={label}
					cssOverrides={textarea(!!fieldError)}
					optional={!mandatory}
					value={fieldValue}
					supporting={description}
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
					error={fieldError}
				/>
			);
		case 'file':
			return (
				<FileInput
					label={label}
					optional={!mandatory}
					supporting={description}
					error={fieldError}
					onUpload={(file: string | undefined): void =>
						setFieldInFormData(formField.id, file)
					}
					cssOverrides={fieldInput}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					formField={formField}
					selected={
						id in formData ? (formData[id] as string) : undefined
					}
					setFieldInFormData={setFieldInFormData}
					error={fieldError}
				/>
			);
		case 'checkbox':
			return (
				<CheckboxInput
					formField={formField}
					selectedCheckboxes={
						id in formData ? (formData[id] as string[]) : []
					}
					setFieldInFormData={setFieldInFormData}
					optional={!mandatory}
					cssOverrides={fieldInput}
					error={fieldError}
				/>
			);
		case 'select':
			return (
				<Select
					label={label}
					supporting={description}
					optional={!mandatory}
					id={name}
					cssOverrides={fieldInput}
					key={name}
					name={name}
					value={fieldValue}
					onChange={(e): void =>
						setFieldInFormData(formField.id, e.target.value)
					}
					error={fieldError}
				>
					{selectOptions}
				</Select>
			);
		default:
			logger.error(
				`Invalid field ${type} provided for callout ${formId}`,
			);
			return null;
	}
};
