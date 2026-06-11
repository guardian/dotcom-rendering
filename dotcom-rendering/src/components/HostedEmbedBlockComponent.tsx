import { css } from '@emotion/react';
// import { updateIframeHeight } from '../client/updateIframeHeight';
import { parseHtml } from '../lib/domUtils';
// import type { RoleType } from '../types/content';
// import { ClickToView } from './ClickToView';

type Props = {
	html: string;
	alt: string;
	// index: number;
	// role?: RoleType;
	// isTracking: boolean;
	// isMainMedia?: boolean;
	// source?: string;
	// sourceDomain?: string;
	width?: number;
	height?: number;
};

// const fullWidthStyles = css`
// 	width: 100%;
// `;

const embedContainerStyles = css`
	position: relative;
	padding-bottom: 56.25%; /* 16:9 aspect ratio */
	height: 0;
	overflow: hidden;
	max-width: 100%;
`;

const getIframeDimension = (
	iframe: HTMLIFrameElement | null,
	attr: 'height' | 'width',
): number | undefined => {
	const attrValue = iframe?.getAttribute(attr);
	const styleValue = iframe?.style[attr];
	return parseInt(attrValue ?? styleValue ?? '', 10) || undefined;
};

export const HostedEmbedBlockComponent = ({
	html,
	alt,
	// index,
	// role,
	// isTracking,
	// isMainMedia,
	// source,
	// sourceDomain,
	width: widthProp,
	height: heightProp,
}: Props) => {
	const iframeFromEmbed =
		parseHtml(html).querySelector<HTMLIFrameElement>('iframe');

	const height = heightProp ?? getIframeDimension(iframeFromEmbed, 'height');
	const width = widthProp ?? getIframeDimension(iframeFromEmbed, 'width');

	iframeFromEmbed?.style.setProperty('position', 'absolute');
	iframeFromEmbed?.style.setProperty('top', '0');
	iframeFromEmbed?.style.setProperty('left', '0');
	iframeFromEmbed?.style.setProperty('width', '100%');
	iframeFromEmbed?.style.setProperty('height', '100%');

	const iframeHtml = iframeFromEmbed?.outerHTML ?? html;

	return (
		<div css={embedContainerStyles}>
			<iframe
				title={alt}
				srcDoc={iframeHtml}
				width={width ?? '100%'}
				height={height}
			/>
		</div>
	);
	// return (
	// 	<ClickToView
	// 		role={role}
	// 		isTracking={isTracking}
	// 		isMainMedia={isMainMedia}
	// 		source={source}
	// 		sourceDomain={sourceDomain}
	// 		onAccept={() =>
	// 			updateIframeHeight(`iframe[name="hosted-embed-${index}"]`)
	// 		}
	// 	>
	// 		<iframe
	// 			css={fullWidthStyles}
	// 			className="js-embed__iframe"
	// 			title={alt}
	// 			// name is used to identify each unique iframe on the page to resize
	// 			// we therefore use the "hosted-embed-" prefix followed by index to
	// 			// construct a unique ID
	// 			name={`hosted-embed-${index}`}
	// 			data-testid="embed-block"
	// 			srcDoc={`${html}
	// 			<script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
	// 			<gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
	// 		/>
	// 	</ClickToView>
	// );
};
