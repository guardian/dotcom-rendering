import { css } from '@emotion/react';
import { getZIndex } from '../lib/getZIndex';

const buttonStyles = css`
	position: absolute;
	left: 0;
	top: 0;
	${getZIndex('sticky-video-button')};
`;

interface StickyVideoProps {
	onClick: () => void;
}

// TODO this needs updating to match designs
// https://trello.com/c/4vnkOOiD/246-sticky-video-add-close-dismiss-button-to-wrapper-in-dcr

// TODO we need to track the button clicks
// https://trello.com/c/23UEZRvN/235-sticky-video-track-if-users-close-dismiss-video-and-how-long-it-was-in-sticky-mode

export const StickyVideoButton = ({ onClick }: StickyVideoProps) => (
	<button css={buttonStyles} onClick={onClick}>
		Unstick
	</button>
);
