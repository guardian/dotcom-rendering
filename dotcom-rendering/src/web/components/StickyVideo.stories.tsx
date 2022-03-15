import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { ElementContainer } from './ElementContainer';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { StickyVideo } from './StickyVideo.importable';
import { TextBlockComponent } from './TextBlockComponent';
import { YoutubeBlockComponent } from './YoutubeBlockComponent.importable';

export default {
	component: StickyVideo,
	title: 'Components/StickyVideo',
};

const html =
	'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesquepharetra libero nec varius feugiat. Nulla commodo sagittis erat amalesuada. Ut iaculis interdum eros, et tristique ex. In veldignissim arcu. Nulla nisi urna, laoreet a aliquam at, viverra eueros. Proin imperdiet pellentesque turpis sed luctus. Donecdignissim lacus in risus fermentum maximus eu vel justo. Duis nontortor ac elit dapibus imperdiet ut at risus. Etiam pretium, odioeget accumsan venenatis, tortor mi aliquet nisl, vel ullamcorperneque nulla vel elit. Etiam porta mauris nec sagittis luctus.</p>';

const TextBlock = () => (
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

const MultipleTextBlocks = ({ number }: { number: number }) => (
	<>
		{[...Array(number)].map((e, i) => (
			<TextBlock key={i} />
		))}
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
					padding: 20px;
					h2 {
						font-size: 48px;
					}
				`}
			>
				<h2>Scroll Down</h2>
				<MultipleTextBlocks number={10} />
				{children}
				<MultipleTextBlocks number={10} />
				<h2>Scroll up</h2>
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</ElementContainer>
);

const videoId = 'c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28';

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
		duration={333}
		overrideImage="https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e"
		// eslint-disable-next-line jsx-a11y/aria-role
		role="inline"
		height={259}
		width={460}
	/>
);

export const Playing = () => {
	return (
		<Container>
			<StickyVideo isActive={true} videoId={videoId}>
				<MockYoutubeComponent />
			</StickyVideo>
		</Container>
	);
};

export const NotPlaying = () => {
	return (
		<Container>
			<StickyVideo isActive={false} videoId={videoId}>
				<MockYoutubeComponent />
			</StickyVideo>
		</Container>
	);
};
