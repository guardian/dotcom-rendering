import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints, palette } from '@guardian/source/foundations';
import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Caption } from './Caption';
import { Section } from './Section';
import { StarRating } from './StarRating/StarRating';

export default {
	component: Caption,
	title: 'Components/Caption',
};

const articleFormat: ArticleFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
};

/**
    display: Display;
    design: Design;
    captionText?: string;
    pillar: Theme;
    padCaption?: boolean;
    credit?: string;
    displayCredit?: boolean;
    shouldLimitWidth?: boolean;
    isOverlaid?: boolean; // Not tested here as this option only works in the context of the ImageComponent
 */

export const Article: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
			format={format}
		/>
	</Section>
);
Article.storyName = 'Article';
Article.decorators = [splitTheme([articleFormat])];

export const Analysis: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Analysis caption looks"
			format={format}
		/>
	</Section>
);
Analysis.storyName = 'Analysis';
Analysis.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Analysis,
			theme: Pillar.News,
		},
	]),
];

export const PhotoEssay: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
			format={format}
		/>
	</Section>
);
PhotoEssay.storyName = 'PhotoEssay';
PhotoEssay.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.News,
		},
	]),
];

export const SpecialReport: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a SpecialReport caption looks"
			format={format}
		/>
	</Section>
);
SpecialReport.storyName = 'SpecialReport';
SpecialReport.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Standard,
			theme: ArticleSpecial.SpecialReport,
		},
	]),
];

export const PhotoEssayLimitedWidth: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
			format={format}
			shouldLimitWidth={true}
		/>
	</Section>
);
PhotoEssayLimitedWidth.storyName = 'PhotoEssay with width limited';
PhotoEssayLimitedWidth.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Immersive,
			design: ArticleDesign.PhotoEssay,
			theme: Pillar.News,
		},
	]),
];

export const Credit: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a Feature caption looks with credit showing"
			format={format}
			credit="Credited to Able Jones"
			displayCredit={true}
		/>
	</Section>
);
Credit.storyName = 'with credit';
Credit.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Standard,
			design: ArticleDesign.Feature,
			theme: Pillar.News,
		},
	]),
];

export const WidthLimited: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks with width limited"
			format={format}
			shouldLimitWidth={true}
		/>
	</Section>
);
WidthLimited.storyName = 'with width limited';
WidthLimited.decorators = [splitTheme([articleFormat])];

export const Padded: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks when padded"
			format={format}
			padCaption={true}
		/>
	</Section>
);
Padded.storyName = 'when padded';
Padded.decorators = [splitTheme([articleFormat])];

export const Overlaid: StoryObj = ({ format }: { format: ArticleFormat }) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<div
			css={css`
				position: relative;
				height: 600px;
				width: 800px;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			`}
		>
			<img
				alt=""
				src="https://i.guim.co.uk/img/media/eaecb92d15c7e9691274226d0935038bfcc9de53/0_0_6720_4480/master/6720.jpg?width=880&quality=45&auto=format&fit=max&dpr=2&s=452e8da9ad0b2ba274ae8987b3799fd4"
			/>
			<Caption
				isOverlaid={true}
				captionText="This is how a caption looks when it's overlaid"
				format={format}
				padCaption={true}
			/>
		</div>
	</Section>
);
Overlaid.storyName = 'when overlaid';
Overlaid.decorators = [splitTheme([articleFormat])];

export const OverlaidWithStars: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<div
			css={css`
				position: relative;
				height: 600px;
				width: 800px;

				img {
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			`}
		>
			<img
				alt=""
				src="https://i.guim.co.uk/img/media/eaecb92d15c7e9691274226d0935038bfcc9de53/0_0_6720_4480/master/6720.jpg?width=880&quality=45&auto=format&fit=max&dpr=2&s=452e8da9ad0b2ba274ae8987b3799fd4"
			/>
			<Caption
				isOverlaid={true}
				captionText="This is how a caption looks when it's overlaid with stars"
				format={format}
				padCaption={true}
			/>
			<div
				css={css`
					position: absolute;
					bottom: 0;
					background-color: ${palette.brandAlt[400]};
					color: ${palette.neutral[7]};
				`}
			>
				<StarRating rating={3} size="large" />
			</div>
		</div>
	</Section>
);
OverlaidWithStars.storyName = 'when overlaid on stars';
OverlaidWithStars.decorators = [
	splitTheme([
		{
			display: ArticleDisplay.Showcase,
			design: ArticleDesign.Review,
			theme: Pillar.News,
		},
	]),
];

export const VideoCaption: StoryObj = ({
	format,
}: {
	format: ArticleFormat;
}) => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
			format={format}
			mediaType="Video"
		/>
	</Section>
);
VideoCaption.storyName = 'for videos';
VideoCaption.story = {
	parameters: {
		chromatic: {
			viewports: [
				breakpoints.mobile,
				breakpoints.mobileLandscape,
				breakpoints.phablet,
			],
		},
	},
};
VideoCaption.decorators = [splitTheme([articleFormat])];
