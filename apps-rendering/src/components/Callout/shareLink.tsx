import {
	Button,
	SvgShareWeb,
	SvgTickRound,
} from '@guardian/source/react-components';
import { useState } from 'react';
import {
	calloutShare,
	calloutSharelink,
	shareIcon,
	sharePopup,
} from './styles';

export const ShareLink = ({
	title,
	urlAnchor,
}: {
	title?: string;
	urlAnchor: string;
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async (): Promise<void> => {
		const url = window.location.href;
		let shareTitle = `Share your experience`;
		if (title) shareTitle += `: ${title}`;

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
	if (typeof window === 'undefined' || typeof navigator === 'undefined') {
		return <></>;
	}

	return (
		<div css={calloutShare}>
			<span css={shareIcon}>
				<SvgShareWeb size="small" />
			</span>
			<div>
				Know others that are affected?{' '}
				<Button
					size="xsmall"
					priority="subdued"
					onClick={onShare}
					cssOverrides={calloutSharelink}
				>
					Please share this callout
					{isCopied && (
						<span css={sharePopup} role="alert">
							<SvgTickRound size="xsmall" />
							Link copied to clipboard
						</span>
					)}
				</Button>
			</div>
		</div>
	);
};
