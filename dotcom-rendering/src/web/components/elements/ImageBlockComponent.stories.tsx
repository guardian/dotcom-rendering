/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import { Display, Design, Pillar } from '@guardian/types';
import { decidePalette } from '@root/src/web/lib/decidePalette';
import { ElementContainer } from '../ElementContainer';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';
import { Figure } from '../Figure';

import { ImageBlockComponent } from './ImageBlockComponent';

import { image } from './ImageBlockComponent.mocks';

export default {
	component: ImageBlockComponent,
	title: 'Components/ImageBlockComponent',
	parameters: {
		chromatic: { diffThreshold: 0.4 },
	},
};

const Container = ({ children }: { children: React.ReactNode }) => (
	<ElementContainer showTopBorder={false}>
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
	</ElementContainer>
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
		<Container>
			<Figure isMainMedia={false} role="inline">
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
				/>
			</Figure>
		</Container>
	);
};
StandardArticle.story = {
	name: 'with role inline',
};

export const Immersive = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="immersive">
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
				/>
			</Figure>
		</Container>
	);
};
Immersive.story = {
	name: 'with role immersive',
};

export const Showcase = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="showcase">
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
				/>
			</Figure>
		</Container>
	);
};
Showcase.story = {
	name: 'with role showcase',
};

export const Thumbnail = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="thumbnail">
				<ImageBlockComponent
					element={{ ...image, role: 'thumbnail' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
				/>
			</Figure>
		</Container>
	);
};
Thumbnail.story = {
	name: 'with role thumbnail',
};

export const Supporting = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="supporting">
				<ImageBlockComponent
					element={{ ...image, role: 'supporting' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
				/>
			</Figure>
		</Container>
	);
};
Supporting.story = {
	name: 'with role supporting',
};

export const HideCaption = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="inline">
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					hideCaption={true}
				/>
			</Figure>
		</Container>
	);
};
HideCaption.story = {
	name: 'with hideCaption true',
};

export const InlineTitle = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="inline">
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Container>
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
		<Container>
			<Figure isMainMedia={false} role="inline">
				<ImageBlockComponent
					element={{ ...image, role: 'inline' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Container>
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
		<Container>
			<Figure isMainMedia={false} role="immersive">
				<ImageBlockComponent
					element={{ ...image, role: 'immersive' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Container>
	);
};
ImmersiveTitle.story = {
	name: 'with title and role immersive',
};

export const ShowcaseTitle = () => {
	return (
		<Container>
			<Figure isMainMedia={false} role="showcase">
				<ImageBlockComponent
					element={{ ...image, role: 'showcase' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
					title="This is the title text"
					hideCaption={true}
				/>
			</Figure>
		</Container>
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
		<Container>
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
			<Figure isMainMedia={false} role="halfWidth">
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
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
		</Container>
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
		<Container>
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
			<Figure isMainMedia={false} role="halfWidth">
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
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
		</Container>
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
		<Container>
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
			<Figure isMainMedia={false} role="halfWidth">
				<ImageBlockComponent
					element={{ ...image, role: 'halfWidth' }}
					format={{
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					}}
					palette={decidePalette({
						display: Display.Standard,
						design: Design.Article,
						theme: Pillar.News,
					})}
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
		</Container>
	);
};
HalfWidthWide.story = {
	name: 'with role halfWidth',
	parameters: {
		viewport: { defaultViewport: 'wide' },
		chromatic: { disable: true },
	},
};
