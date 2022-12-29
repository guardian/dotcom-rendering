import { css } from '@emotion/react';
import { neutral, space, visuallyHidden } from '@guardian/source-foundations';
import { SvgArrowExpand } from '@guardian/source-react-components';
import type { RoleType } from '../../types/content';

type Props = {
	elementId: string;
	role: RoleType;
};

function decideSize(role: RoleType) {
	switch (role) {
		case 'halfWidth':
		case 'supporting': {
			return css`
				height: 30px;
				width: 30px;
			`;
		}
		case 'inline':
		case 'showcase':
		case 'immersive':
		default: {
			return css`
				height: 44px;
				width: 44px;
			`;
		}
	}
}

export const LightboxButton = ({ elementId, role }: Props) => {
	// Don't show the button over thumbnails; they're too small
	if (role === 'thumbnail') return null;
	return (
		<button
			data-element-id={elementId}
			type="button"
			className="open-lightbox"
			css={[
				css`
					position: absolute;
					top: 3px;
					right: 3px;
					svg {
						margin-top: 4px;
						fill: ${neutral[100]};
					}
					margin: ${space[2]}px;
					border-radius: 50%;
					border: none;
					cursor: pointer;
					background-color: ${neutral[46]};
					opacity: 0.5;
					:hover {
						filter: brightness(85%);
						opacity: 0.6;
					}
				`,
				decideSize(role),
			]}
		>
			<SvgArrowExpand />
			<span
				css={css`
					${visuallyHidden}
				`}
			>
				View in fullscreen
			</span>
		</button>
	);
};
