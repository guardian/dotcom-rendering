import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import {
	background,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	body,
	headline,
	neutral,
	remSpace,
	text as textPalette,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	SvgMinus,
	SvgPlus,
	TextArea,
	TextInput,
} from '@guardian/source-react-components';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { FC, ReactElement } from 'react';
import { plainTextElement } from 'renderer';
import { darkModeCss } from 'styles';

export interface CalloutProps {
	campaign: Campaign;
	format: ArticleFormat;
	description: DocumentFragment;
	isNonCollapsible: boolean;
}

const calloutStyles = css`
	border-top: 1px ${neutral[86]} solid;
	border-bottom: 1px ${neutral[86]} solid;
	position: relative;
	margin: ${remSpace[4]} 0 ${remSpace[9]} 0;

	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}

	.is-on,
	.is-off {
		position: absolute;
		transform: translate(0, 50%);
		bottom: 0;
	}

	&[open] {
		background: ${neutral[97]};
	}

	${darkModeCss`
        background: white;
        color: ${neutral[7]};
        border: none;
    `}
`;

const summaryStyles = css`
	outline: none;
	padding: 0;
	list-style: none;

	&::-webkit-details-marker {
		display: none;
	}
`;

const kickerStyles = css`
	display: flex;
	flex-direction: row;
`;

const logoStyles = css`
	flex: initial;
`;

const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	margin: 0;
`;

const descriptionStyles = css`
	margin: ${remSpace[3]};

	p {
		${body.small({ lineHeight: 'tight' })};
		margin: ${remSpace[3]} 0;
	}
`;

const errorStyles = css`
	color: ${textPalette.error};
	${textSans.small()};
`;

const speechBubbleStyles = (format: ArticleFormat): SerializedStyles => css`
	padding: ${remSpace[3]};
	position: relative;
	color: ${text.calloutSpeechBubble(format)};
	background-color: ${background.calloutSpeechBubble(format)};
	margin-bottom: ${remSpace[9]};
	min-width: 5.5rem;

	&::after {
		content: '';
		width: 1.25rem;
		height: 1.375rem;
		border-radius: 0 0 1.125rem;
		position: absolute;
		bottom: -0.75rem;
		left: 0.625rem;
		color: ${text.calloutSpeechBubble(format)};
		background-color: ${background.calloutSpeechBubble(format)};
	}
`;

const formStyles = css`
	margin: ${remSpace[4]} ${remSpace[3]} ${remSpace[9]} ${remSpace[3]};
`;

const formAnchor = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.calloutFormAnchor(format)};
	text-decoration: none;
	${textSans.small()};
	position: absolute;
	bottom: ${remSpace[3]};
	right: ${remSpace[3]};
`;

const renderField = ({
	type,
	label,
	mandatory,
	options,
	id,
}: FormField): ReactElement | null => {
	const name = `field_${id}`;
	const input = css`
		margin-bottom: ${remSpace[4]};
	`;
	switch (type) {
		case 'text':
			return (
				<TextInput
					cssOverrides={input}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					cssOverrides={input}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'file':
			return (
				<FileInput
					cssOverrides={input}
					required={mandatory}
					name={name}
					label={label}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					cssOverrides={input}
					options={options}
					name={name}
					label={label}
				/>
			);
		default:
			return null;
	}
};

const CalloutForm: FC<CalloutProps> = ({
	campaign,
	format,
	description,
	isNonCollapsible,
}) => (
	<details className="js-callout" css={calloutStyles}>
		<summary css={summaryStyles}>
			<div css={kickerStyles}>
				<div css={logoStyles}>
					<div css={speechBubbleStyles(format)}>
						<h4 css={headlineStyles}>Take part</h4>
					</div>
				</div>
				<div css={descriptionStyles}>
					<h4 css={headlineStyles}>{campaign.fields.callout}</h4>
					{Array.from(description.childNodes).map(plainTextElement)}
				</div>
			</div>
			<Button
				size="xsmall"
				className="is-off js-callout-expand"
				iconSide="left"
				icon={<SvgPlus />}
			>
				Tell us
			</Button>
			<Button
				size="xsmall"
				className="is-on js-callout-expand"
				iconSide="left"
				icon={<SvgMinus />}
			>
				Hide
			</Button>
		</summary>

		<form css={formStyles} action="#" method="post">
			<div>
				<input
					name="formId"
					type="hidden"
					value={campaign.fields.formId}
				/>
				{campaign.fields.formFields.map(renderField)}
				<p css={errorStyles} className="js-error-message"></p>
				<Button
					cssOverrides={css`
						margin: ${remSpace[4]} 0;
					`}
					type="submit"
					size="xsmall"
				>
					Share with the Guardian
				</Button>
				<a
					css={formAnchor(format)}
					href="https://www.theguardian.com/help/terms-of-service"
				>
					Terms and conditions
				</a>
			</div>
		</form>
	</details>
);

export default CalloutForm;
