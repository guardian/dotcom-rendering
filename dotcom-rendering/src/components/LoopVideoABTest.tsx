import { css } from '@emotion/react';

export const LoopVideoABTest = () => (
	<video
		id="video1"
		autoPlay={true}
		loop={true}
		muted={true}
		playsInline={true}
		controls={true}
		preload="none"
		css={[
			css`
				position: relative;
				z-index: 10;
				width: 100%;
				height: 100%;
			`,
		]}
	>
		Your browser does not support the video tag.
		<source
			type="video/mp4"
			src="https://uploads.guim.co.uk/2024/10/01/241001HeleneLoop_2.mp4"
		/>
	</video>
);
