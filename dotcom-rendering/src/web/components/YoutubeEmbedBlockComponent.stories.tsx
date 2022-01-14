import { css } from '@emotion/react';

import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';
import { decidePalette } from '@root/src/web/lib/decidePalette';

import { YoutubeEmbedBlockComponent } from './YoutubeEmbedBlockComponent';

export default {
	component: YoutubeEmbedBlockComponent,
	title: 'Components/YoutubeEmbedComponent',
	parameters: {
		chromatic: {
			disable: true,
		},
	},
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

export const standardAspectRatio = () => {
	return (
		<Container>
			<p>abc</p>
			<YoutubeEmbedBlockComponent
				embedUrl="https://www.youtube-nocookie.com/embed/79fzeNUqQbQ?wmode=opaque&feature=oembed"
				format={{
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
				palette={decidePalette({
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				})}
				height={259}
				width={460}
				caption="blah"
				credit=""
				title=""
			/>
			<p>abc</p>
		</Container>
	);
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
