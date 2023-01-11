import type { ArticleFormat } from '@guardian/libs';
import {
	Button,
	SvgShareCallout,
	SvgTickRound,
} from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { calloutShare, calloutSharelink, sharePopup } from './styles';

export const ShareLink: FC<{
	format: ArticleFormat;
	title: string;
	urlAnchor: string;
}> = ({ format, title, urlAnchor }) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async (): Promise<void> => {
		const url = window.location.href;
		const shareTitle = `
Share your experience: ${title}
`;
		const shareText = `
I saw this callout in an article: ${url}#${urlAnchor}
You can share your story by using the form on this article, or by contacting the Guardian on WhatsApp, Signal or Telegram.
		`;
		if ('share' in navigator) {
			navigator
				.share({
					url,
					title: shareTitle,
					text: shareText,
				})
				.catch(console.error);
		} else if ('clipboard' in navigator) {
			const nav: Navigator = navigator;
			const share = `
				${shareTitle}
				${shareText}
			`;
			await nav.clipboard.writeText(share);
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
				{isCopied && (
					<span css={sharePopup} role="alert">
						<SvgTickRound size="xsmall" />
						Link copied to clipboard
					</span>
				)}
			</Button>
		</span>
	);
};
