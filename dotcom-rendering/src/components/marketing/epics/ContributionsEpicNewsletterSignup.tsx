/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/a482b35a25ca59f66501c4de02de817046206298/packages/modules/src/modules/epics/NewsletterSignup.tsx
 */
import { css } from '@emotion/react';
import { isObject, log } from '@guardian/libs';
import { space } from '@guardian/source/foundations';
import { useEffect, useRef, useState } from 'react';

const containerStyles = css`
	margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
	width: 100%;
`;

export const ContributionsEpicNewsletterSignup = ({
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
					const message: unknown = JSON.parse(event.data);
					if (
						!isObject(message) ||
						typeof message.type !== 'string'
					) {
						return;
					}

					if (message.type === 'set-height') {
						if (typeof message.value === 'number') {
							setIframeHeight(message.value);
						} else if (typeof message.value === 'string') {
							const value = parseInt(message.value, 10);
							if (Number.isInteger(value)) {
								setIframeHeight(value);
							}
						}
					}
				}
			} catch (err) {
				log(
					'supporterRevenue',
					'Error handling event in epic NewsletterSignup',
					err,
				);
			}
		});
	}, []);

	return (
		<div css={containerStyles}>
			<iframe
				title="newsletter-signup-epic"
				src={url}
				name="newsletter-signup-epic"
				ref={iframeRef}
				scrolling="no"
				seamless={true}
				frameBorder="0"
				css={css`
					width: 100%;
					height: ${iframeHeight}px;
				`}
			/>
		</div>
	);
};
