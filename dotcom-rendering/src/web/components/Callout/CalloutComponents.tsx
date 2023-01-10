import { css } from '@emotion/react';
import {
	body,
	neutral,
	palette,
	space,
	success,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	SvgShareCallout,
	SvgTickRound,
} from '@guardian/source-react-components';
import { useState } from 'react';
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
		<div dangerouslySetInnerHTML={{ __html: description }}></div>
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
			<p>This callout is now closed to any further submissions.</p>
			<p>
				You can see{' '}
				<a href="https://www.theguardian.com/profile/guardian-community-team">
					other Guardian community callouts here
				</a>{' '}
				or{' '}
				<a href="https://www.theguardian.com/community/2015/sep/02/guardianwitness-send-us-a-story">
					tell us about a story here.
				</a>
			</p>
		</div>
	);
};

const shareCalloutStyles = css`
	display: flex;
	align-items: center;
	padding-bottom: ${space[2]}px;
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
		margin: 0 ${space[1]}px;
	`;

const tooltipStyles = css`
	${textSans.xsmall()};
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -50px;
	margin-left: -100px;
	display: flex;
	align-items: center;
	background-color: ${neutral[100]};
	color: ${neutral[7]};
	font-weight: normal;
	border-radius: 4px;
	z-index: 1;
	padding: 0 ${space[1]}px 0 0;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);

	> svg {
		fill: ${success[400]};
	}
`;

export const CalloutShare = ({
	format,
	title,
	urlAnchor,
}: {
	format: ArticleFormat;
	title: string;
	urlAnchor: string;
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async () => {
		const url = window.location.href;
		if (
			'share' in navigator &&
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		) {
			const shareTitle = `Share your experience: ${title}`;

			const shareText = `
			I saw this callout in an article: ${url}#${urlAnchor}
			You can share your story by using the form on this article, or by contacting the Guardian on WhatsApp, Signal or Telegram.`;

			await navigator.share({
				title: shareTitle,
				text: shareText,
			});
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 3000);
		}

		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(`${url}#${urlAnchor}`);
			setIsCopied(true);
			// setTimeout(() => setIsCopied(false), 3000);
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
					Know others who are affected?{'   '}
					<Button
						size="xsmall"
						priority="subdued"
						onClick={onShare}
						css={shareCalloutLinkStyles(format)}
					>
						Please share this callout.
					</Button>
					{isCopied && (
						<div css={tooltipStyles}>
							<SvgTickRound size="medium" />
							Link copied to clipboard
						</div>
					)}
				</div>
			</div>
		</>
	);
};

const termsAndConditionsStyles = (format: ArticleFormat) =>
	css`
		a {
			color: ${decidePalette(format).text.richLink};
			border-bottom: 1px solid ${decidePalette(format).text.richLink};
			text-decoration: none;
		}
		${textSans.small()}
		padding-bottom: ${space[4]}px;
	`;

export const CalloutTermsAndConditions = ({
	format,
}: {
	format: ArticleFormat;
}) => (
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
