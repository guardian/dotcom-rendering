import { ClassNames } from '@emotion/react';

const prebidImg =
	'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

type Props = { url: string };

export const AnalyticsIframe = ({ url }: Props) => {
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
						data-block-on-consent="_till_responded"
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
