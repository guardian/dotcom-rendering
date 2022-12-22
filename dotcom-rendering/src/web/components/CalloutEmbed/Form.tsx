import { css } from '@emotion/react';
import { text, textSans } from '@guardian/source-foundations';
import { Button, Link } from '@guardian/source-react-components';
import { useState } from 'react';
import type { CampaignFieldType } from '../../../types/content';
import { FileUpload } from './FormFields/FileUpload';
import { MultiSelect } from './FormFields/MultiSelect';
import { Select } from './FormFields/Select';
import { TextArea } from './FormFields/TextArea';
import { TextInput } from './FormFields/TextInput';

const formStyles = css`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-left: 10px;
	padding-right: 10px;
`;

const footerPaddingStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 15px;
`;

const errorMessagesStyles = css`
	padding-bottom: 10px;
	color: ${text.error};
	${textSans.medium({ fontWeight: 'bold' })};
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
	error?: string;
};

export const Form = ({ onSubmit, formFields, error }: FormProps) => {
	const [twitterHandle, setTwitterHandle] = useState('');
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

			{/* this element is a H O N £ Y - P 0 T */}
			<div
				css={css`
					position: absolute;
					left: -62.5rem;
				`}
				aria-hidden="true"
			>
				<input
					name="twitter-handle"
					type="text"
					id="twitter-handle"
					tabIndex={-1}
					placeholder="@mytwitterhandle"
					value={twitterHandle}
					onChange={(e) => setTwitterHandle(e.target.value)}
				/>
			</div>
			{!!error && <div css={errorMessagesStyles}>{error}</div>}
			<div css={footerPaddingStyles}>
				<Button priority="secondary" size="xsmall" type="submit">
					Share with the Guardian
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
	);
};
