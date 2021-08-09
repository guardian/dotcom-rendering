import { css } from '@emotion/react';

type Props = {
	html: string;
	alt: string;
	index: number;
};

const fullWidthStyles = css`
	width: 100%;
`;

export const UnsafeEmbedBlockComponent = ({ html, alt, index }: Props) => (
	<iframe
		css={fullWidthStyles}
		className="js-embed__iframe"
		title={alt}
		// name is used to identify each unique iframe on the page to resize
		// we therefore use the "unsafe-embed-" prefix followed by index to
		// construct a unique ID
		name={`unsafe-embed-${index}`}
		data-cy="embed-block"
		srcDoc={`${html}
            <script src="https://interactive.guim.co.uk/libs/iframe-messenger/iframeMessenger.js"></script>
            <gu-script>iframeMessenger.enableAutoResize();</gu-script>`}
	/>
);
