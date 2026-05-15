import { css } from '@emotion/react';
import { updateIframeHeight } from '../client/updateIframeHeight';
import type { InstagramBlockElement } from '../types/content';
import { ClickToView } from './ClickToView';

const fullWidthStyles = css`
	width: 100%;
`;

/**
 * Note the iframe created in this component is dependent on the embedIFrame function being
 * called to be size correctly.
 * src/client/embedIframe/embedIframe.ts
 */
type Props = {
	element: InstagramBlockElement;
	index: number;
	isMainMedia: boolean;
};
export const InstagramBlockComponent = ({
	element,
	index,
	isMainMedia,
}: Props) => {
	return (
		<ClickToView
			role={element.role}
			isTracking={element.isThirdPartyTracking}
			isMainMedia={isMainMedia}
			source={element.source}
			sourceDomain={element.sourceDomain}
			onAccept={() =>
				updateIframeHeight(`iframe[name="instagram-embed-${index}"]`)
			}
		>
			<iframe
				css={fullWidthStyles}
				className="js-embed__iframe"
				name={`instagram-embed-${index}`}
				data-testid="instagram-embed"
				title={`Instagram Post ${index}`}
				srcDoc={`${element.html}
			<script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
			<gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
			/>
		</ClickToView>
	);
};
