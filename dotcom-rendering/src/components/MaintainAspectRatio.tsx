import { css } from '@emotion/react';

type Props = {
	height: number;
	width: number;
	children: React.ReactNode;
};

export const MaintainAspectRatio = ({ height, width, children }: Props) => (
	/* https://css-tricks.com/aspect-ratio-boxes/ */
	<div
		css={css`
			/* position relative to contain the absolutely positioned iframe plus any Overlay image */
			position: relative;
			padding-bottom: ${(height / width) * 100}%;

			iframe {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
			}

			/*
                The IMA script gives the following styles to the ad container element:
                    width: [pixel value equal to the youtube iframe's width]
                    height: [pixel value equal to the youtube iframe's height]
                    position: relative;
                    display: block;
                We need to override these styles to make sure that the ad container overlays
                the youtube player exactly and to avoid a player-sized white space underneath the ad.
            */
			[data-atom-type='ima-ad-container'] {
				width: 100%;
				height: 100%;
				position: absolute !important;
				top: 0;
				left: 0;
				display: none;
			}
		`}
	>
		{children}
	</div>
);
