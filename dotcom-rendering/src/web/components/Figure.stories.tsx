/* eslint-disable jsx-a11y/aria-role */

import { css } from '@emotion/react';

import { Flex } from '@root/src/web/components/Flex';
import { RightColumn } from '@root/src/web/components/RightColumn';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { LeftColumn } from '@frontend/web/components/LeftColumn';
import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { ArticleDisplay, ArticleDesign, ArticlePillar } from '@guardian/libs';

import { breakpoints } from '@guardian/src-foundations/mq';

import { Figure } from './Figure';

const textHtml =
	'<p>US and British intelligence agencies have successfully cracked much of the online encryption relied upon by hundreds of millions of people to protect the privacy of their personal data, online transactions and emails, according to top-secret documents revealed by former contractor Edward Snowden.</p>';

const SomeText = () => (
	<TextBlockComponent
		html={textHtml}
		format={{
			theme: ArticlePillar.News,
			design: ArticleDesign.Standard,
			display: ArticleDisplay.Standard,
		}}
		isFirstParagraph={false}
	/>
);

const Grey = ({ heightInPixels = 400 }: { heightInPixels?: number }) => (
	<div
		css={css`
			background-color: grey;
			width: 100%;
			height: ${heightInPixels}px;
		`}
	/>
);

export default {
	component: Figure,
	title: 'Components/Figure',
	parameters: {
		// Set the viewports in Chromatic at a component level.
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileMedium,
				breakpoints.phablet,
				breakpoints.tablet,
				breakpoints.desktop,
				breakpoints.leftCol,
				breakpoints.wide,
			],
		},
	},
};

export const InlineStory = () => {
	return (
		<ElementContainer showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<Figure isMainMedia={false}>
						<Grey />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
InlineStory.story = { name: 'Inline' };

export const SupportingStory = () => {
	return (
		<ElementContainer showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<SomeText />
					<Figure isMainMedia={false} role="supporting">
						<Grey heightInPixels={500} />
					</Figure>
					<SomeText />
					<SomeText />
					<SomeText />
					<SomeText />
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
SupportingStory.story = { name: 'Supporting' };

export const ImmersiveStory = () => {
	return (
		<ElementContainer showTopBorder={false} showSideBorders={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<Figure isMainMedia={false} role="immersive">
						<Grey heightInPixels={700} />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
ImmersiveStory.story = { name: 'Immersive' };

export const ThumbnailStory = () => {
	return (
		<ElementContainer showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<Figure isMainMedia={false} role="thumbnail">
						<Grey heightInPixels={200} />
					</Figure>
					<SomeText />
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
ThumbnailStory.story = { name: 'Thumbnail' };

export const ShowcaseStory = () => {
	return (
		<ElementContainer showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<Figure isMainMedia={false} role="showcase">
						<Grey heightInPixels={500} />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
ShowcaseStory.story = { name: 'Showcase' };

export const HalfWidthStory = () => {
	return (
		<ElementContainer showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: ArticlePillar.News,
					}}
				>
					<SomeText />
					<Figure isMainMedia={false} role="halfWidth">
						<Grey />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</ElementContainer>
	);
};
HalfWidthStory.story = { name: 'HalfWidth' };
