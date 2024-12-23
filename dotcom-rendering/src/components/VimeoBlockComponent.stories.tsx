import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '../lib/articleFormat';
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

/**
 * Skipped (flaky).
 *
 * This story fails intermittently. Sometimes the video doesn't load
 * with the error message: "We couldn't verify the security of your connection."
 *
 * Example: https://www.chromatic.com/test?appId=63e251470cfbe61776b0ef19&id=6762b11e0dbf28eb24702ff1
 */
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
verticalAspectRatio.story = {
	chromatic: { disableSnapshot: true },
};
