import { css } from '@emotion/react';
import {
	body,
	neutral,
	palette,
	space,
	textSans,
} from '@guardian/source-foundations';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import { sanitiseHTML } from '../../../../src/model/sanitise';
import { decidePalette } from '../../lib/decidePalette';

const descriptionStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
			border-bottom: 1px solid ${decidePalette(format).text.richLink};
			text-decoration: none;
		}
		padding-bottom: ${space[4]}px;
		${body.medium()}

		p {
			margin-bottom: ${space[3]}px;
		}
	`;

export const CalloutDescription = ({
	description,
	format,
}: {
	description: string;
	format: ArticleFormat;
}) => (
	<div css={descriptionStyles(format)}>
		<div
			dangerouslySetInnerHTML={{ __html: sanitiseHTML(description) }}
		></div>
		<div>
			Please share your story if you are 18 or over, anonymously if you
			wish. For more information please see our{' '}
			<a href="https://www.theguardian.com/help/terms-of-service">
				terms of service
			</a>{' '}
			and{' '}
			<a href="https://www.theguardian.com/help/privacy-policy">
				privacy policy
			</a>
			.
		</div>
	</div>
);

const expiredStyles = css`
	${textSans.small()};
	color: ${palette.brand};
	background-color: ${palette.brandAlt[400]};
	width: fit-content;
`;

export const CalloutExpired = () => {
	return (
		<div css={expiredStyles}>
			This form has been deactivated and is closed to any further
			submissions.
		</div>
	);
};

const shareCalloutStyles = css`
	display: flex;
	align-items: center;
`;

const shareCalloutTextStyles = css`
	display: inline-block;
	${textSans.xsmall()}
`;

const shareCalloutLinkStyles = (format: ArticleFormat) =>
	css`
		color: ${decidePalette(format).text.calloutAccent};
		border-bottom: 1px solid ${decidePalette(format).text.calloutAccent};
		text-decoration: none;
		font-weight: normal;
	`;

const supportingText = css`
	${textSans.xsmall()};
	color: ${neutral[46]};
`;

interface Props {
	format: ArticleFormat;
}

export const CalloutShare = ({ format }: Props) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async () => {
		const url = window.location.href;
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(url);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		}
	};
	if (typeof window === 'undefined' || typeof navigator === 'undefined')
		return <></>;

	return (
		<>
			<div css={shareCalloutStyles}>
				<div
					css={css`
						width: 45px;
					`}
				>
					<SvgShareCallout />
				</div>
				<div css={shareCalloutTextStyles}>
					Know others who are affected?{' '}
					<Button
						size="xsmall"
						priority="subdued"
						onClick={onShare}
						css={shareCalloutLinkStyles(format)}
					>
						{' '}
						Please share this callout.
					</Button>
					{isCopied && (
						<span css={supportingText} role="alert">
							Link copied to clipboard
						</span>
					)}
				</div>
			</div>
		</>
	);
};

const termsAndConditionsStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.calloutAccent};
			border-bottom: 1px solid ${decidePalette(format).text.calloutAccent};
			text-decoration: none;
		}
		${textSans.small()}
		padding: ${space[4]}px 0px;
	`;

export const CalloutTermsAndConditions = ({ format }: Props) => (
	<div css={termsAndConditionsStyles(format)}>
		Your responses, which can be anonymous, are secure as the form is
		encrypted and only the Guardian has access to your contributions. We
		will only use the data you provide us for the purpose of the feature and
		we will delete any personal data when we no longer require it for this
		purpose. For true anonymity please use our{' '}
		<a href="https://www.theguardian.com/securedrop">SecureDrop</a> service
		instead.
	</div>
);
