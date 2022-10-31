import { css } from '@emotion/react';
import { useState } from 'react';
import { FileUpload } from '../Callout/FileUpload';
import { MultiSelect } from '../Callout/MultiSelect';
import { Select } from '../Callout/Select';
import { TextArea } from '../Callout/TextArea';
import { TextInput } from '../Callout/TextInput';

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 10px;
	padding-right: 10px;
`;

const formFieldWrapperStyles = css`
	display: flex;
	flex-direction: column;
`;

type FormDataType = { [key in string]: any };

type FormFieldProp = {
	formField: CampaignFieldType;
	formData: FormDataType;
	setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

const FormField = ({ formField, formData, setFormData }: FormFieldProp) => {
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
					<FileUpload
						formField={formField}
						formData={formData}
						setFormData={setFormData}
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
};

export const Form = ({ onSubmit, formFields }: FormProps) => {
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
			{formFields.map((formField, index) => (
				<div
					css={formFieldWrapperStyles}
					// we use custom-guardian to find 1st field for accessibility
					// ideally we should useRef but need to wait for Source to
					// support React references
					custom-guardian="callout-form-field"
					key={index}
				>
					<FormField
						formField={formField}
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
			))}
		</form>
	);
};
