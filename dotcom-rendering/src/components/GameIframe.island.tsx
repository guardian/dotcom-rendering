import { css } from '@emotion/react';

interface Props {
	/** The already-resolved iframe src URL (with `{slug}` substituted). */
	src: string;
	title: string;
}

const frameStyles = css`
	width: 100%;
	min-height: 500px;
	border: none;
`;

/**
 * Generic sandboxed iframe wrapper for third-party (or in-house, non-React)
 * puzzle/game providers, such as AmuseLabs-hosted games or bespoke providers
 * like wordiply.com. Used for any `GameConfig` with `renderMode: 'iframe'`.
 */
export const GameIframe = ({ src, title }: Props) => (
	<iframe
		css={frameStyles}
		src={src}
		title={title}
		loading="lazy"
		sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
	/>
);
