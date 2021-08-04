import React from 'react';
import { ClassNames } from '@emotion/react';

const prebidImg =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

export const AnalyticsIframe: React.FC<{ url: string }> = ({ url }) => {
	return (
		<ClassNames>
			{({ css }) => {
				const prebidIframeStyle = css`
					position: fixed;
					top: -1px;
				`;

				return (
					<amp-iframe
						class={prebidIframeStyle}
						data-block-on-consent="_till_accepted"
						title="Analytics Iframe"
						height="1"
						width="1"
						sandbox="allow-scripts allow-same-origin"
						frameborder="0"
						src={url}
					>
						<amp-img layout="fill" src={prebidImg} placeholder="" />
					</amp-iframe>
				);
			}}
		</ClassNames>
	);
};
