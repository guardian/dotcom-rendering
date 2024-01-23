import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { Figure } from './Figure';
import { Flex } from './Flex';
import { ImageBlockComponent } from './ImageBlockComponent';
import { image } from './ImageBlockComponent.mocks';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';

export default {
	component: ImageBlockComponent,
	title: 'Components/ImageBlockComponent',
	parameters: {
		chromatic: { diffThreshold: 0.4 },
	},
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<Section fullWidth={true} showTopBorder={false}>
		<Flex>
			<LeftColumn>
				<></>
			</LeftColumn>
			<div
				css={css`
					max-width: 620px;
					padding: 20px;
					flex-grow: 1;
				`}
			>
				{children}
			</div>
			<RightColumn>
				<></>
			</RightColumn>
		</Flex>
	</Section>
);

/**
 type Props = {
    display: Display;
    design: Design;
    element: ImageBlockElement;
    pillar: Theme;
    hideCaption?: boolean;
};
 */

export const StandardArticle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
StandardArticle.storyName = 'with role inline';

export const Immersive = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="immersive"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
Immersive.storyName = 'with role immersive';

export const Showcase = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="showcase"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
Showcase.storyName = 'with role showcase';

export const Thumbnail = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="thumbnail"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'thumbnail' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
Thumbnail.storyName = 'with role thumbnail';

export const Supporting = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="supporting"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'supporting' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
Supporting.storyName = 'with role supporting';

export const HideCaption = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					hideCaption={true}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
HideCaption.storyName = 'with hideCaption true';

export const InlineTitle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
InlineTitle.storyName = 'with title and role inline';
InlineTitle.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [1300] },
	},
};

export const InlineTitleMobile = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
InlineTitleMobile.storyName = 'with title and role inline on mobile';
InlineTitleMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};

export const ImmersiveTitle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="immersive"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
ImmersiveTitle.storyName = 'with title and role immersive';

export const ShowcaseTitle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="showcase"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
					isInLightboxTest={false}
				/>
			</Figure>
		</Wrapper>
	);
};
ShowcaseTitle.storyName = 'with title and role showcase';
ShowcaseTitle.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [980] },
	},
};

export const HalfWidth = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
HalfWidth.storyName = 'with role halfWidth on desktop';
HalfWidth.story = {
	parameters: {
		viewport: { defaultViewport: 'desktop' },
		chromatic: { viewports: [980] },
	},
};

export const HalfWidthMobile = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Duis aute irure dolor in reprehenderit in voluptate velit esse
				cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
HalfWidthMobile.storyName = 'with role halfWidth on mobile';
HalfWidthMobile.story = {
	parameters: {
		viewport: { defaultViewport: 'mobileMedium' },
		chromatic: { viewports: [375] },
	},
};

export const HalfWidthWide = () => {
	return (
		<Wrapper>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est
				laborum.Duis aute irure dolor in reprehenderit in voluptate
				velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
				sint occaecat cupidatat non proident, sunt in culpa qui officia
				deserunt mollit anim id est laborum.
			</p>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
					isInLightboxTest={false}
				/>
			</Figure>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</Wrapper>
	);
};
HalfWidthWide.storyName = 'with role halfWidth';
HalfWidthWide.story = {
	parameters: {
		viewport: { defaultViewport: 'wide' },
		chromatic: { disable: true },
	},
};
