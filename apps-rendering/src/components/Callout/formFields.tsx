import { css } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import type { ArticleFormat } from '@guardian/libs';
import { error, remSpace, textSans } from '@guardian/source-foundations';
import {
	InlineError,
	Label,
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import CheckboxInput from 'components/CheckboxInput';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { FC, ReactElement } from 'react';
import { darkModeCss } from 'styles';
import { logger } from '../../logger';
import { fieldInput, fieldLabel, textareaStyles } from './styles';

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

const FieldError = (): ReactElement => (
	<InlineError
		cssOverrides={css`
			${textSans.small()};
			color: ${error[400]};
			${darkModeCss`
				color: ${error[500]};
			`}
		`}
		className="field__feedback"
	>
		Please complete all required fields
	</InlineError>
);

export const renderField = (
	formId: number,
	{ type, label, description, mandatory, options, id }: FormField,
	format: ArticleFormat,
): ReactElement | null => {
	const name = `field_${type}_${id}`;

	const FormField: FC<{ children: ReactElement }> = ({
		children,
	}): ReactElement => (
		<Label
			id={name}
			key={name}
			text={label}
			supporting={description}
			optional={!mandatory}
			cssOverrides={fieldLabel}
		>
			<FieldError />
			{children}
		</Label>
	);

	switch (type) {
		case 'text':
		case 'number':
		case 'phone':
		case 'email':
			return (
				<FormField>
					<TextInput
						name={name}
						type={type === 'phone' ? 'tel' : type}
						label={label}
						hideLabel
						optional={!mandatory}
						cssOverrides={fieldInput}
					/>
				</FormField>
			);
		case 'textarea':
			return (
				<FormField>
					<TextArea
						name={name}
						label={label}
						hideLabel
						cssOverrides={textareaStyles}
						optional={!mandatory}
					/>
				</FormField>
			);
		case 'file':
			return (
				<FormField>
					<FileInput
						name={name}
						format={format}
						mandatory={mandatory}
					/>
				</FormField>
			);
		case 'radio':
			return (
				<FormField>
					<RadioInput
						name={name}
						mandatory={mandatory}
						options={options}
					/>
				</FormField>
			);
		case 'checkbox':
			return (
				<FormField>
					<CheckboxInput
						name={name}
						label={label}
						hideLabel
						options={options}
						cssOverrides={fieldInput}
						mandatory={mandatory}
					/>
				</FormField>
			);
		case 'select':
			return (
				<FormField>
					<Select
						label={label}
						hideLabel
						id={name}
						cssOverrides={fieldInput}
						key={name}
						name={name}
					>
						{options.map(({ value, label }) => {
							return (
								<Option key={value} value={value}>
									{label}
								</Option>
							);
						})}
					</Select>
				</FormField>
			);
		default:
			logger.error(
				`Invalid field ${type} provided for callout ${formId}`,
			);
			return null;
	}
};
