import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { ArticleContainer } from './ArticleContainer';
import { Figure } from './Figure';
import { Flex } from './Flex';
import { LeftColumn } from './LeftColumn';
import { RightColumn } from './RightColumn';
import { Section } from './Section';
import { TextBlockComponent } from './TextBlockComponent';

const textHtml =
	'<p>US and British intelligence agencies have successfully cracked much of the online encryption relied upon by hundreds of millions of people to protect the privacy of their personal data, online transactions and emails, according to top-secret documents revealed by former contractor Edward Snowden.</p>';

const SomeText = () => (
	<TextBlockComponent
		html={textHtml}
		format={{
			theme: Pillar.News,
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
		<Section fullWidth={true} showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
					>
						<Grey />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
InlineStory.storyName = 'Inline';

export const SupportingStory = () => {
	return (
		<Section fullWidth={true} showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="supporting"
					>
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
		</Section>
	);
};
SupportingStory.storyName = 'Supporting';

export const ImmersiveStory = () => {
	return (
		<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="immersive"
					>
						<Grey heightInPixels={700} />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
ImmersiveStory.storyName = 'Immersive';

export const ThumbnailStory = () => {
	return (
		<Section fullWidth={true} showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="thumbnail"
					>
						<Grey heightInPixels={200} />
					</Figure>
					<SomeText />
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
ThumbnailStory.storyName = 'Thumbnail';

export const ShowcaseStory = () => {
	return (
		<Section fullWidth={true} showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="showcase"
					>
						<Grey heightInPixels={500} />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
ShowcaseStory.storyName = 'Showcase';

export const HalfWidthStory = () => {
	return (
		<Section fullWidth={true} showTopBorder={false}>
			<Flex>
				<LeftColumn>
					<></>
				</LeftColumn>
				<ArticleContainer
					format={{
						display: ArticleDisplay.Standard,
						design: ArticleDesign.Standard,
						theme: Pillar.News,
					}}
				>
					<SomeText />
					<Figure
						format={{
							display: ArticleDisplay.Standard,
							design: ArticleDesign.Standard,
							theme: Pillar.News,
						}}
						isMainMedia={false}
						role="halfWidth"
					>
						<Grey />
					</Figure>
					<SomeText />
				</ArticleContainer>
				<RightColumn>
					<></>
				</RightColumn>
			</Flex>
		</Section>
	);
};
HalfWidthStory.storyName = 'HalfWidth';
