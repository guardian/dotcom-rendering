import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
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
		color: ${decidePalette(format).text.richLink};
		border-bottom: 1px solid ${decidePalette(format).text.richLink};
		text-decoration: none;
		font-weight: normal;
	`;

const placeholderCircle = css`
	width: 45px;
	display: inline-block;
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
				<div css={placeholderCircle}>
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
					{isCopied && <em> Link copied to clipboard</em>}
				</div>
			</div>
		</>
	);
};
