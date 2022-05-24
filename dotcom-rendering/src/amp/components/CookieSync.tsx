import { ClassNames } from '@emotion/react';
import { isInVariant } from '../lib/prebid-server-test';
import { useContentABTestGroup } from './ContentABTest';

/**
 * TODO ...
 */
export const CookieSync = () => {
	const { group } = useContentABTestGroup();

	// Currently we only perform cookie-sync for Relevant Yield
	if (isInVariant('relevant-yield', group)) {
		return (
			<ClassNames>
				{({ css }) => {
					// Hide the iframe above the viewport
					const cookieSyncIframeStyle = css`
						position: fixed;
						top: -1px;
					`;

					return (
						<amp-iframe
							class={cookieSyncIframeStyle}
							data-block-on-consent=""
							width="1"
							title="User Sync"
							height="1"
							sandbox="allow-scripts allow-same-origin"
							frameborder="0"
							src="https://guardian-cdn.relevant-digital.com/static/tags/6214c1072d89bdff800f25f2_cookiesync.html?endpoint=relevant&max_sync_count=5"
						>
							<amp-img
								layout="fill"
								src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
								placeholder="true"
							></amp-img>
						</amp-iframe>
					);
				}}
			</ClassNames>
		);
	}

	return null;
};
