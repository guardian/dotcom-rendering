import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { useState } from 'react';
import { decidePalette } from '../../lib/decidePalette';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';
import { FileUpload } from './FormFields/FileUpload';
import { MultiSelect } from './FormFields/MultiSelect';
import { Select } from './FormFields/Select';
import { TextArea } from './FormFields/TextArea';
import { TextInput } from './FormFields/TextInput';

const errorMessagesStyles = css`
	padding-bottom: 10px;
	color: ${palette.error};
	${textSans.medium({ fontWeight: 'bold' })};
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
	validationErrors: string[];
	format: ArticleFormat;
	formField: CampaignFieldType;
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

const FormField = ({
	validationErrors,
	format,
	formField,
	formData,
	setFormData,
}: FormFieldProp) => {
	switch (formField.type) {
		case 'textarea':
			return (
				<>
					<TextArea
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						validationErrors={validationErrors}
					/>
					<hr />
				</>
			);
		case 'file':
			return (
				<>
					<FileUpload
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						format={format}
						validationErrors={validationErrors}
					/>
					<hr />
				</>
			);
		case 'select':
			return (
				<>
					<Select
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						validationErrors={validationErrors}
					/>
					<hr />
				</>
			);
		case 'checkbox':
		case 'radio':
			return (
				<>
					<MultiSelect
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						multiple={formField.type === 'checkbox'}
						validationErrors={validationErrors}
					/>
					<hr />
				</>
			);
		default: {
			return (
				<>
					<TextInput
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						validationErrors={validationErrors}
					/>
					<hr />
				</>
			);
		}
	}
};

type FormProps = {
	onSubmit: (formData: FormDataType) => void;
	formFields: CampaignFieldType[];
	format: ArticleFormat;
	fieldError?: string;
	error?: string;
};

export const Form = ({ onSubmit, formFields, format, error }: FormProps) => {
	// const [twitterHandle, setTwitterHandle] = useState('');
	const [formData, setFormData] = useState<{ [key in string]: any }>({});
	const [validationErrors, setValidationErrors] = useState<string[]>([]);

	return (
		<form
			action="/formstack-campaign/submit"
			method="post"
			css={formStyles}
			noValidate={true}
			onSubmit={(e) => {
				e.preventDefault();

				const errors: string[] = [];

				// replace with map ideally
				formFields.forEach((field: CampaignFieldType) => {
					if (field.required) {
						if (formData[field.id] == undefined) {
							errors.push(field.id);
						}
					}
				});

				if (errors.length) {
					setValidationErrors(errors);
					return;
				}
				onSubmit(formData);
			}}
		>
			<CalloutTermsAndConditions format={format} />
			{formFields.map((formField) => (
				<div
					css={formFieldWrapperStyles}
					// we use custom-guardian to find 1st field for accessibility
					// ideally we should useRef but need to wait for Source to
					// support React references
					custom-guardian="callout-form-field"
				>
					{!!error && <div css={errorMessagesStyles}>{error}</div>}
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
			<div css={footerPaddingStyles}>
				<Button
					priority="primary"
					type="submit"
					cssOverrides={css`
						margin: 20px 0px;
						width: 50%;
						display: block;
						background-color: ${decidePalette(format).text
							.richLink};
						:hover {
							background-color: ${neutral[0]};
						}
					`}
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
