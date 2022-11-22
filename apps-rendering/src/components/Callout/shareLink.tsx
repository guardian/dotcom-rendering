import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';

const shareStyles = (theme: any): SerializedStyles => css`
	display: inline-flex;
	align-items: center;
	color: ${theme.text};
	padding-right: ${remSpace[2]};
	padding-bottom: ${remSpace[2]};
`;
const linkStyles = (theme: any): SerializedStyles => css`
	color: ${theme.linkColor};
	padding: 0 ${remSpace[2]};
	font-weight: normal;
`;

export const ShareLink: FC<{disabled: boolean}> = ({disabled}) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async () => {
		const url = window.location.href;
		if ('share' in navigator) {
			navigator
				.share({
					title: 'Share this callout',
					url,
				})
				.catch(console.error);
		} else {
			await navigator.clipboard.writeText(url);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		}
	};
	return (
		<span css={shareStyles}>
			<SvgShareCallout size="medium" />
			Know others that are affected?
			<Button
				disabled={disabled}
				size="xsmall"
				priority="subdued"
				onClick={onShare}
				css={linkStyles}
			>
				Please share this callout
			</Button>
			{isCopied && <em> Link copied to clipboard</em>}
		</span>
	);
};
