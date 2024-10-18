import { css } from '@emotion/react';
import { from, palette } from '@guardian/source/foundations';

export const Wrapper = ({
	showVolumeControls,
	...props
}: { showVolumeControls: boolean } & React.ComponentPropsWithoutRef<'div'>) => (
	<div
		css={css`
			position: relative;
			background-color: ${palette.neutral[7]};

			/* define the grid for the component */
			display: grid;
			grid-template-rows: ${showVolumeControls
				? '30px 40px 120px 40px'
				: '30px 40px 120px'};
			grid-template-areas:
				'current-time duration'
				'progress-bar progress-bar'
				'playback     playback'
				'.            volume';

			${from.leftCol} {
				grid-template-columns: 90px 1fr 90px;
				grid-template-rows: 50px 110px;
				grid-template-areas:
					'current-time progress-bar duration'
					'playback     playback     playback';
			}
		`}
		{...props}
	/>
);
