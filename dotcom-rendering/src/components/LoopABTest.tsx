import { css } from '@emotion/react';

export const LoopABTest = () => (
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
				width: 100%;
				height: 100%;
			`,
		]}
	>
		Your browser does not support the video tag.
		<source
			type="video/mp4"
			src="https://uploads.guim.co.uk/2024/58/19/Deepfake%20clip%20shows%20Nigel%20Farage%20destroying%20Rishi%20Sunak%E2%80%99s%20house%20in%20Minecraft%20--007473ac-3147-41f5-9cf3-d454c28037cf-3.mp4"
		/>
	</video>
);
