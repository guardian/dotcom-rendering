import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';

const buttonStyles = css`
	position: absolute;
	left: 0;
	top: 0;
	${getZIndex('sticky-video-button')};
`;

enum ButtonText {
	Stick = 'Stick',
	UnStick = 'Unstick',
}

interface StickyVideoProps {
	isSticky: boolean;
	onClick: () => void;
}

export const StickyVideoButton = ({ isSticky, onClick }: StickyVideoProps) => (
	<button css={buttonStyles} onClick={onClick}>
		{isSticky ? ButtonText.UnStick : ButtonText.Stick}
	</button>
);
