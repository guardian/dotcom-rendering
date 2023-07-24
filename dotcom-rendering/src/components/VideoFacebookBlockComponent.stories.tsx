import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { VideoFacebookBlockComponent } from './VideoFacebookBlockComponent.importable';

export default {
	component: VideoFacebookBlockComponent,
	title: 'Components/VideoFacebookComponent',
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			max-width: 620px;
			padding: 20px;
		`}
	>
		{children}
	</div>
);

export const largeAspectRatio = () => {
	return (
		<Wrapper>
			<p>abc</p>
			<VideoFacebookBlockComponent
				embedUrl="https://www.facebook.com/video/embed?video_id=10155703704626323\"
				height={281}
				width={500}
				caption="blah"
				credit=""
				title=""
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isTracking={false}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
largeAspectRatio.storyName = 'with large aspect ratio';
largeAspectRatio.story = {
	chromatic: { disable: true },
};

export const verticalAspectRatio = () => {
	return (
		<Wrapper>
			<p>abc</p>
			<VideoFacebookBlockComponent
				embedUrl="https://www.facebook.com/video/embed?video_id=10155591097456323\"
				height={889}
				width={500}
				caption="blah"
				credit=""
				title=""
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isTracking={false}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
verticalAspectRatio.storyName = 'with vertical aspect ratio';
