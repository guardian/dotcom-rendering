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

type FormDataType = { [key in string]: any };

type FormFieldProp = {
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
}: FormFieldProp) => {
	switch (formField.type) {
		case 'textarea':
			return (
				<>
					<TextArea
						formField={formField}
						formData={formData}
						setFormData={setFormData}
					/>
					<hr />
				</>
			);
		case 'file':
			return (
				<>
					{/* <FileInput
						name={formField.id}
						label={formField.label}
						supporting={formField.description}
						format={format}
						mandatory={formField.required}
					/> */}
					<FileUpload
						formField={formField}
						formData={formData}
						setFormData={setFormData}
						format={format}
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
	error?: string;
};

export const Form = ({ onSubmit, formFields, format, error }: FormProps) => {
	// const [twitterHandle, setTwitterHandle] = useState('');
	const [formData, setFormData] = useState<{ [key in string]: any }>({});

	return (
		<form
			action="/formstack-campaign/submit"
			method="post"
			css={formStyles}
			onSubmit={(e) => {
				e.preventDefault();
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
					<FormField
						key={formField.id}
						format={format}
						formField={formField}
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
			))}
			{!!error && <div css={errorMessagesStyles}>{error}</div>}

			<div css={footerPaddingStyles}>
				<Button
					priority="primary"
					type="submit"
					cssOverrides={css`
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
