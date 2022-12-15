import { css } from '@emotion/react';
import type { FormField as formFieldType } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import { FileInput } from '@guardian/source-react-components-development-kitchen';
import CheckboxInput from 'components/CheckboxInput';
import RadioInput from 'components/RadioInput';
import type { FC, ReactElement } from 'react';
import { logger } from '../../logger';
import type { FormDataType, ValidationErrors } from './calloutForm';
import { fieldInput, textarea } from './styles';

const infoStyles = css`
	${textSans.small()};
	margin-bottom: ${remSpace[4]};
`;

export const Disclaimer: FC = () => {
	return (
		<div css={infoStyles}>
			You must be 18 or over to fill in this form. Only the Guardian can
			see your contributions and one of our journalists may contact you to
			discuss further. For more information please see our{' '}
			<a href="https://www.theguardian.com/help/terms-of-service">
				terms of service
			</a>{' '}
			and{' '}
			<a href="https://www.theguardian.com/help/privacy-policy">
				privacy policy
			</a>
			.
		</div>
	);
};

export const ContactText = (): ReactElement => (
	<div css={infoStyles}>
		One of our journalists will be in contact before we publish your
		information, so please do leave contact details.
	</div>
);

type FormFieldProp = {
	formId: number;
	formField: formFieldType;
	formData: FormDataType;
	setFieldInFormData: (
		id: string,
		data: string | string[] | undefined,
	) => void;
	format: ArticleFormat;
	validationErrors: ValidationErrors;
};

export const FormField: FC<FormFieldProp> = ({
	formId,
	formField,
	formData,
	setFieldInFormData,
	format,
	validationErrors,
}) => {
	const { type, label, description, mandatory, options, id } = formField;
	const name = `field_${type}_${id}`;
	const fieldValue =
		formField.id in formData ? (formData[formField.id] as string) : '';
	const fieldError = validationErrors[formField.id];

	const selectOptions = options.map(({ value, label }) => {
		return (
			<Option key={value} value={value}>
				{label}
			</Option>
		);
	});
	if (!fieldValue || !mandatory)
		selectOptions.unshift(
			<Option value="">Please select an option</Option>,
		);

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
