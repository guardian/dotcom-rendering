import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { text } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	Option,
	Select,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import CheckboxInput from 'components/CheckboxInput';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { ReactElement } from 'react';
import { darkModeStyles } from 'styles';

const disclaimerStyles = (format: ArticleFormat): SerializedStyles => css`
	${textSans.small()};
	margin-bottom: ${remSpace[3]};

	a {
		color: ${text.richLink(format)};
		${darkModeStyles`
			color: ${text.richLinkDark(format)};
		`}
	}
`;

const renderDisclaimer = (format: ArticleFormat): ReactElement => (
	<div css={disclaimerStyles(format)}>
		You must be 18 or over to fill in this form. Only the Guardian can see
		your contributions and one of our journalists may contact you to discuss
		further. For more information please see our{' '}
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

const renderField = (
	{ type, label, description, mandatory, options, id }: FormField,
	format: ArticleFormat,
): ReactElement | null => {
	const name = `field_${id}`;
	const inputStyles = css`
		margin-bottom: ${remSpace[4]};
	`;

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
					supporting={description}
					optional={!mandatory}
					cssOverrides={inputStyles}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					name={name}
					label={label}
					supporting={description}
					optional={!mandatory}
					cssOverrides={inputStyles}
				/>
			);
		case 'file':
			return (
				<FileInput
					name={name}
					label={label}
					supporting={description}
					mandatory={mandatory}
					format={format}
					cssOverrides={inputStyles}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					name={name}
					label={label}
					supporting={description}
					options={options}
				/>
			);
		case 'checkbox':
			return (
				<CheckboxInput
					name={name}
					label={label}
					supporting={description}
					options={options}
					cssOverrides={inputStyles}
				/>
			);
		case 'select':
			return (
				<Select
					label={label}
					supporting={description}
					cssOverrides={inputStyles}
				>
					{options.map(({ value, label }) => {
						return (
							<Option key={value} value={value}>
								{label}
							</Option>
						);
					})}
				</Select>
			);
		default:
			return null;
	}
};

export { renderField, renderDisclaimer };
