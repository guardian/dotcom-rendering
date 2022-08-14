import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				/>
			</Figure>
		</Wrapper>
	);
};
StandardArticle.story = {
	name: 'with role inline',
};

export const Immersive = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="immersive"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				/>
			</Figure>
		</Wrapper>
	);
};
Immersive.story = {
	name: 'with role immersive',
};

export const Showcase = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="showcase"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				/>
			</Figure>
		</Wrapper>
	);
};
Showcase.story = {
	name: 'with role showcase',
};

export const Thumbnail = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="thumbnail"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'thumbnail' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				/>
			</Figure>
		</Wrapper>
	);
};
Thumbnail.story = {
	name: 'with role thumbnail',
};

export const Supporting = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="supporting"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'supporting' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				/>
			</Figure>
		</Wrapper>
	);
};
Supporting.story = {
	name: 'with role supporting',
};

export const HideCaption = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					hideCaption={true}
				/>
			</Figure>
		</Wrapper>
	);
};
HideCaption.story = {
	name: 'with hideCaption true',
};

export const InlineTitle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Wrapper>
	);
};
InlineTitle.story = {
	name: 'with title and role inline',
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="inline"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Wrapper>
	);
};
InlineTitleMobile.story = {
	name: 'with title and role inline on mobile',
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="immersive"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Wrapper>
	);
};
ImmersiveTitle.story = {
	name: 'with title and role immersive',
};

export const ShowcaseTitle = () => {
	return (
		<Wrapper>
			<Figure
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="showcase"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Wrapper>
	);
};
ShowcaseTitle.story = {
	name: 'with title and role showcase',
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
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
HalfWidth.story = {
	name: 'with role halfWidth on desktop',
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
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
HalfWidthMobile.story = {
	name: 'with role halfWidth on mobile',
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
					theme: ArticlePillar.News,
				}}
				isMainMedia={false}
				role="halfWidth"
			>
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
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
HalfWidthWide.story = {
	name: 'with role halfWidth',
	parameters: {
		viewport: { defaultViewport: 'wide' },
		chromatic: { disable: true },
	},
};
