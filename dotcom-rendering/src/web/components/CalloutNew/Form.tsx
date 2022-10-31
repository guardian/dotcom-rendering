import { css } from '@emotion/react';
import { Button, Link } from '@guardian/source-react-components';
import { useState } from 'react';
import { Disclaimer } from './Disclaimer';
import { FileUpload } from './FileUpload';
import { MultiSelect } from './MultiSelect';
import { Select } from './Select';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';

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

const footerPaddingStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 15px;
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
		<>
			<Disclaimer />
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
				<div css={footerPaddingStyles}>
					<Button priority="secondary" size="xsmall" type="submit">
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
					>
						<Link
							priority="secondary"
							target="_blank"
							href="https://www.theguardian.com/help/terms-of-service"
							cssOverrides={css`
								text-decoration: none;
							`}
						>
							Terms and conditions
						</Link>
					</div>
				</div>
			</form>
		</>
	);
};
