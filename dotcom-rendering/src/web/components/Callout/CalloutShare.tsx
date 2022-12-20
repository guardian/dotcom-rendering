import { css } from '@emotion/react';
import { neutral, textSans } from '@guardian/source-foundations';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import { decidePalette } from '../../lib/decidePalette';

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
