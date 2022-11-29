import type { ArticleFormat } from '@guardian/libs';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { calloutShare, calloutSharelink } from './styles';

export const ShareLink: FC<{ disabled: boolean; format: ArticleFormat }> = ({
	disabled,
	format,
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async (): Promise<void> => {
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
		<span css={calloutShare}>
			<SvgShareCallout size="medium" />
			Know others that are affected?
			<Button
				disabled={disabled}
				size="xsmall"
				priority="subdued"
				onClick={onShare}
				css={calloutSharelink(format)}
			>
				Please share this callout
			</Button>
			{isCopied && <em> Link copied to clipboard</em>}
		</span>
	);
};
