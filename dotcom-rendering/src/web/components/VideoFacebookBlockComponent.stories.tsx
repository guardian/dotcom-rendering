import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
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
					theme: ArticlePillar.News,
				}}
				isTracking={false}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
largeAspectRatio.story = {
	name: 'with large aspect ratio',
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
					theme: ArticlePillar.News,
				}}
				isTracking={false}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
verticalAspectRatio.story = { name: 'with vertical aspect ratio' };
