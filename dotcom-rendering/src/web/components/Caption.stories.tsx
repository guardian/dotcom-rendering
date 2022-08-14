import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { Caption } from './Caption';
import { ContainerLayout } from './ContainerLayout';
import { StarRating } from './StarRating/StarRating';

export default {
	component: Caption,
	title: 'Components/Caption',
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

export const Article = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how an Article caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
		/>
	</ContainerLayout>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how an Analysis caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.News,
			}}
		/>
	</ContainerLayout>
);
Analysis.story = { name: 'Analysis' };

export const PhotoEssay = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			}}
		/>
	</ContainerLayout>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const SpecialReport = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how a SpecialReport caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			}}
		/>
	</ContainerLayout>
);
SpecialReport.story = { name: 'SpecialReport' };

export const PhotoEssayLimitedWidth = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			}}
			shouldLimitWidth={true}
		/>
	</ContainerLayout>
);
PhotoEssayLimitedWidth.story = { name: 'PhotoEssay with width limited' };

export const Credit = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how a Feature caption looks with credit showing"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			}}
			credit="Credited to Able Jones"
			displayCredit={true}
		/>
	</ContainerLayout>
);
Credit.story = { name: 'with credit' };

export const WidthLimited = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how a caption looks with width limited"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			shouldLimitWidth={true}
		/>
	</ContainerLayout>
);
WidthLimited.story = { name: 'with width limited' };

export const Padded = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how a caption looks when padded"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			padCaption={true}
		/>
	</ContainerLayout>
);
Padded.story = { name: 'when padded' };

export const Overlaid = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
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
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				padCaption={true}
			/>
		</div>
	</ContainerLayout>
);
Overlaid.story = { name: 'when overlaid' };

export const OverlaidWithStars = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
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
				format={{
					display: ArticleDisplay.Showcase,
					design: ArticleDesign.Review,
					theme: ArticlePillar.News,
				}}
				padCaption={true}
			/>
			<div
				css={css`
					position: absolute;
					bottom: 0;
					background-color: yellow;
				`}
			>
				<StarRating rating={3} size="large" />
			</div>
		</div>
	</ContainerLayout>
);
OverlaidWithStars.story = { name: 'when overlaid on stars' };

export const VideoCaption = () => (
	<ContainerLayout
		fullWidth={true}
		showTopBorder={false}
		showSideBorders={false}
	>
		<Caption
			captionText="This is how an Article caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			mediaType="Video"
		/>
	</ContainerLayout>
);
VideoCaption.story = {
	name: 'for videos',
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
