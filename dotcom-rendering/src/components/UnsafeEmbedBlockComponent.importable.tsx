import { css } from '@emotion/react';
import { updateIframeHeight } from '../client/updateIframeHeight';
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
};

const fullWidthStyles = css`
	width: 100%;
`;

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
}: Props) => {
	// This allows for when a block is duplicated on a live blog inside a pinned post
	const uniqueIndex = isPinnedPost ? `${index}-pinned` : index;
	return (
		<ClickToView
			role={role}
			isTracking={isTracking}
			isMainMedia={isMainMedia}
			source={source}
			sourceDomain={sourceDomain}
			onAccept={() =>
				updateIframeHeight(`iframe[name="unsafe-embed-${uniqueIndex}"]`)
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
				data-cy="embed-block"
				srcDoc={`${html}
            <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
            <gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
			/>
		</ClickToView>
	);
};
