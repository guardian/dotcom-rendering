import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
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

export const standardAspectRatio = () => {
	return (
		<Wrapper>
			<p>abc</p>
			<YoutubeEmbedBlockComponent
				embedUrl="https://www.youtube-nocookie.com/embed/79fzeNUqQbQ?wmode=opaque&feature=oembed"
				format={{
					theme: ArticlePillar.News,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
				}}
				height={259}
				width={460}
				caption="blah"
				credit=""
				title=""
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
