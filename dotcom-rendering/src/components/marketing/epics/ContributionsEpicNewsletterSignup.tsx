/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/NewsletterSignup.tsx
 */
import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

const containerStyles = css`
	margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
	width: 100%;
`;

const ContributionsEpicNewsletterSignup = ({
	url,
}: {
	url: string;
}): JSX.Element => {
	const [iframeHeight, setIframeHeight] = useState(60);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		// Handle iframe resize events. Based on https://github.com/guardian/dotcom-rendering/blob/main/dotcom-rendering/src/web/browser/newsletterEmbedIframe/init.ts
		window.addEventListener('message', (event) => {
			try {
				// Check if this is the newsletter iframe
				const contentWindow = iframeRef?.current?.contentWindow;
				if (
					contentWindow &&
					event.source &&
					contentWindow === event.source
				) {
					const message = JSON.parse(event.data);

					if (message.type === 'set-height') {
						if (typeof message.value === 'number') {
							setIframeHeight(message.value);
						} else if (typeof message.value === 'string') {
							const value = parseInt(message.value, 10);
							if (Number.isInteger(value)) {
								setIframeHeight(message.value);
							}
						}
					}
				}
			} catch (err) {
				console.log(
					`Error handling event in epic NewsletterSignup: ${err}`,
				);
			}
		});
	}, []);

	return (
		<div css={containerStyles}>
			<iframe
				src={url}
				name="newsletter-signup-epic"
				ref={iframeRef}
				scrolling="no"
				seamless
				frameBorder="0"
				css={css`
					width: 100% !important;
					height: ${iframeHeight}px;
				`}
			/>
		</div>
	);
};

export default ContributionsEpicNewsletterSignup;
