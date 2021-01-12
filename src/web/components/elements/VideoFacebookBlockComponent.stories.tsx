import React from 'react';
import { css } from 'emotion';

import { Display } from '@guardian/types/Format';
import { VideoFacebookBlockComponent } from './VideoFacebookBlockComponent';

export default {
	component: VideoFacebookBlockComponent,
	title: 'Components/VideoFacebookComponent',
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const largeAspectRatio = () => {
	return (
		<Container>
			<p>abc</p>
			<VideoFacebookBlockComponent
				embedUrl="https://www.facebook.com/video/embed?video_id=10155703704626323\"
				pillar="news"
				height={281}
				width={500}
				caption="blah"
				credit=""
				title=""
				display={Display.Standard}
				designType="Article"
			/>
			<p>abc</p>
		</Container>
	);
};
largeAspectRatio.story = { name: 'with large aspect ratio' };

export const verticalAspectRatio = () => {
	return (
		<Container>
			<p>abc</p>
			<VideoFacebookBlockComponent
				embedUrl="https://www.facebook.com/video/embed?video_id=10155591097456323\"
				pillar="news"
				height={889}
				width={500}
				caption="blah"
				credit=""
				title=""
				display={Display.Standard}
				designType="Article"
			/>
			<p>abc</p>
		</Container>
	);
};
verticalAspectRatio.story = { name: 'with vertical aspect ratio' };
