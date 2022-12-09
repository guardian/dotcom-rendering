import type { ArticleFormat } from '@guardian/libs';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { calloutShare, calloutSharelink } from './styles';

export const ShareLink: FC<{ format: ArticleFormat }> = ({ format }) => {
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
		} else if ('clipboard' in navigator) {
			const nav: Navigator = navigator;
			await nav.clipboard.writeText(url);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		}
	};
	if (typeof window === 'undefined' || typeof navigator === 'undefined')
		return <></>;

	return (
		<span css={calloutShare}>
			<SvgShareCallout size="medium" />
			Know others that are affected?
			<Button
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
