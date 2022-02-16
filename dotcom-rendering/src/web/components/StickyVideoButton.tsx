import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';

const buttonStyles = css`
	position: absolute;
	left: 0;
	top: 0;
	z-index: ${getZIndex('sticky-video-button')};
`;

enum ButtonText {
	Stick = 'Stick',
	UnStick = 'Unstick',
}

interface StickyVideoProps {
	stickyVideo: boolean;
	onClick: () => void;
}

export const StickyVideoButton = ({
	stickyVideo,
	onClick,
}: StickyVideoProps) => (
	<button css={buttonStyles} onClick={onClick}>
		{stickyVideo ? ButtonText.UnStick : ButtonText.Stick}
	</button>
);
