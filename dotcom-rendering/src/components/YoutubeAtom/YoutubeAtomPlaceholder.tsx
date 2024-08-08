import { css } from '@emotion/react';

/**
 * The placeholder component is used to render a black rectangle
 * until the player is ready
 *
 * Otherwise the container may visibly flash white between the
 * overlay image being removed and the player becoming ready
 */
export const YoutubeAtomPlaceholder = ({
	uniqueId,
}: {
	uniqueId: string;
}): JSX.Element => {
	const id = `youtube-placeholder-${uniqueId}`;
	return (
		<div
			data-name={id}
			data-testid={id}
			css={[
				css`
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					flex-grow: 1;
					background-color: black;
				`,
			]}
		></div>
	);
};
