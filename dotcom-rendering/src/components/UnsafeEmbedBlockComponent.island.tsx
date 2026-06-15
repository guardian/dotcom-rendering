import { css } from '@emotion/react';
import { updateIframeHeight } from '../client/updateIframeHeight';
import { parseHtml } from '../lib/domUtils';
import type { RoleType } from '../types/content';
import { ClickToView } from './ClickToView';

type Props = {
	html: string;
	alt: string;
	index: number;
	role?: RoleType;
	isTracking: boolean;
	isMainMedia?: boolean;
	source?: string;
	sourceDomain?: string;
	isPinnedPost?: boolean;
	height?: number;
	width?: number;
};

const fullWidthStyles = css`
	width: 100%;
`;

const getIframeDimension = (
	iframe: HTMLIFrameElement | null,
	attr: 'height' | 'width',
): number | undefined => {
	const attrValue = iframe?.getAttribute(attr);
	const styleValue = iframe?.style[attr];
	return parseInt(attrValue ?? styleValue ?? '', 10) || undefined;
};

export const UnsafeEmbedBlockComponent = ({
	html,
	alt,
	index,
	role,
	isTracking,
	isMainMedia,
	source,
	sourceDomain,
	isPinnedPost,
	height: heightProp,
	width: widthProp,
}: Props) => {
	// This allows for when a block is duplicated on a live blog inside a pinned post
	const uniqueIndex = isPinnedPost ? `${index}-pinned` : index;

	const srcDoc = `
	${html}
    <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
    <gu-script>iframeMessenger.enableAutoResize();</gu-script>
	`;

	const iframe = parseHtml(html).querySelector<HTMLIFrameElement>('iframe');

	const height = heightProp ?? getIframeDimension(iframe, 'height');
	const width = widthProp ?? getIframeDimension(iframe, 'width');

	if (height === undefined) return null;

	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			isMainMedia={isMainMedia}
			source={source}
			sourceDomain={sourceDomain}
			onAccept={() =>
				void updateIframeHeight(
					`iframe[name="unsafe-embed-${uniqueIndex}"]`,
				)
			}
		>
			<iframe
				css={fullWidthStyles}
				className="js-embed__iframe"
				title={alt}
				// name is used to identify each unique iframe on the page to resize
				// we therefore use the "unsafe-embed-" prefix followed by index to
				// construct a unique ID
				name={`unsafe-embed-${uniqueIndex}`}
				data-testid="embed-block"
				srcDoc={srcDoc}
				width={width}
				height={height}
			/>
		</ClickToView>
	);
};
