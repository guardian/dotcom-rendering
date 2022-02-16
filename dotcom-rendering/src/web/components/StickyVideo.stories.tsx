import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ElementContainer } from './ElementContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { StickyVideo } from './StickyVideo.importable';
import { TextBlockComponent } from './TextBlockComponent';
import { YoutubeBlockComponent } from './YoutubeBlockComponent';

export default {
	component: StickyVideo,
	title: 'Components/StickyVideo',
};

const html =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';

const Text = () => (
	<TextBlockComponent
		html={html}
		format={{
			theme: ArticlePillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}}
		isFirstParagraph={false}
	/>
);

const BlocksOfText = () => (
	<>
		<Text />
		<Text />
		<Text />
	</>
);

const Container = ({ children }: { children: React.ReactNode }) => (
	<ElementContainer showTopBorder={false}>
		<Flex>
			<LeftColumn borderType="full">
				<></>
			</LeftColumn>
			<div
				css={css`
					width: 500px;
					padding: 20px;
					h2 {
						font-size: 48px;
					}
				`}
			>
				<h2>Scroll Down</h2>
				<BlocksOfText />
				<BlocksOfText />
				{children}
				<BlocksOfText />
				<BlocksOfText />
				<BlocksOfText />
				<h2>Scroll up</h2>
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</ElementContainer>
);

const MockYoutubeComponent = () => (
	<YoutubeBlockComponent
		format={{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticlePillar.News,
		}}
		assetId="d2Q5bXvEgMg"
		mediaTitle="Prince Harry and Meghan's 'bombshell' plans explained – video"
		id="c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28"
		expired={false}
		// eslint-disable-next-line jsx-a11y/aria-role
		role="inline"
	/>
);

export const Playing = () => {
	return (
		<Container>
			<StickyVideo isPlaying={true} height={283}>
				<MockYoutubeComponent />
			</StickyVideo>
		</Container>
	);
};

export const NotPlaying = () => {
	return (
		<Container>
			<StickyVideo isPlaying={false} height={283}>
				<MockYoutubeComponent />
			</StickyVideo>
		</Container>
	);
};
