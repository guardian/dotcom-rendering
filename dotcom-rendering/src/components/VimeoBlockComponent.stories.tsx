import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { VimeoBlockComponent } from './VimeoBlockComponent';

export default {
	component: VimeoBlockComponent,
	title: 'Components/VimeoComponent',
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

export const smallAspectRatio = () => {
	return (
		<Wrapper>
			<p>abc</p>
			<VimeoBlockComponent
				embedUrl="https://player.vimeo.com/video/327310297?app_id=122963"
				height={250}
				width={250}
				caption="blah"
				credit=""
				title=""
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
smallAspectRatio.storyName = 'with small aspect ratio';

export const largeAspectRatio = () => {
	return (
		<Wrapper>
			<p>abc</p>
			<VimeoBlockComponent
				embedUrl="https://player.vimeo.com/video/327310297?app_id=122963"
				height={259}
				width={460}
				caption="blah"
				credit=""
				title=""
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
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
			<VimeoBlockComponent
				embedUrl="https://player.vimeo.com/video/265111898?app_id=122963"
				height={818}
				width={460}
				caption="blah"
				credit=""
				title=""
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
			/>
			<p>abc</p>
		</Wrapper>
	);
};
verticalAspectRatio.storyName = 'with vertical aspect ratio';
