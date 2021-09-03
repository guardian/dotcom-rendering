import { css } from '@emotion/react';

import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { VideoFacebookBlockComponent } from './VideoFacebookBlockComponent';

export default {
	component: VideoFacebookBlockComponent,
	title: 'Components/VideoFacebookComponent',
};

const Container = ({ children }: { children: React.ReactNode }) => (
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
		<Container>
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
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				})}
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
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				})}
			/>
			<p>abc</p>
		</Container>
	);
};
verticalAspectRatio.story = { name: 'with vertical aspect ratio' };
