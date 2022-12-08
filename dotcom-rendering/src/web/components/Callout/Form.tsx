import { css } from '@emotion/react';
import {
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgAlertTriangle } from '@guardian/source-react-components';
import { useState } from 'react';
import type { CampaignFieldType } from 'src/types/content';
import { decidePalette } from '../../lib/decidePalette';
import { CalloutTermsAndConditions } from './CalloutTermsAndConditions';
import { FileUpload } from './FormFields/FileUpload';
import { MultiSelect } from './FormFields/MultiSelect';
import { Select } from './FormFields/Select';
import { TextArea } from './FormFields/TextArea';
import { TextInput } from './FormFields/TextInput';

const errorBoxStyles = css`
	padding: 10px;
	margin-bottom: ${space[2]}px;
	color: ${palette.error[400]};
	width: fit-content;
	border: ${space[1]}px solid ${palette.error[400]};

	svg {
		fill: ${palette.error[400]};
	}
`;

const errorHeaderStyles = css`
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
	networkError?: string;
};

export const Form = ({
	onSubmit,
	formFields,
	format,
	networkError,
}: FormProps) => {
	// const [twitterHandle, setTwitterHandle] = useState('');
	const [formData, setFormData] = useState<{ [key in string]: any }>({});
	const [validationErrors, setValidationErrors] = useState<{
		[key in string]: string;
	}>({});

	return (
		<form
			action="/formstack-campaign/submit"
			method="post"
			css={formStyles}
			noValidate={true}
			onSubmit={(e) => {
				e.preventDefault();
				const errors: { [key in string]: string } = {};

				formFields.forEach((field: CampaignFieldType) => {
					if (field.required) {
						if (formData[field.id] == undefined) {
							errors[field.id] =
								'Please complete all required fields';
						}
					}
				});
				if (Object.keys(errors).length) {
					setValidationErrors(errors);
					return;
				}
				onSubmit(formData);
			}}
		>
			<CalloutTermsAndConditions format={format} />
			{!!networkError && (
				<div css={[errorBoxStyles, errorHeaderStyles]}>
					<SvgAlertTriangle size="medium" />
					{networkError}
				</div>
			)}
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
