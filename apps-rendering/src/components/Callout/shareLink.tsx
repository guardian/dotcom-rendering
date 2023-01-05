import type { ArticleFormat } from '@guardian/libs';
import { Button, SvgShareCallout } from '@guardian/source-react-components';
import { useState } from 'react';
import type { FC } from 'react';
import { calloutShare, calloutSharelink, supportingText } from './styles';

export const ShareLink: FC<{ format: ArticleFormat; title: string }> = ({
	format,
	title,
}) => {
	const [isCopied, setIsCopied] = useState(false);

	const onShare = async (): Promise<void> => {
		const url = window.location.href;
		const shareTitle = `
Share your experience: ${title}
`;
		const shareText = `
I saw this callout on an article I was reading and thought you might like to share your story.
${url}
You can share your story by using the form on this article, or by contacting us on WhatsApp or Telegram.
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
			</Button>
			{isCopied && (
				<span css={supportingText} role="alert">
					Link copied to clipboard
				</span>
			)}
		</span>
	);
};
