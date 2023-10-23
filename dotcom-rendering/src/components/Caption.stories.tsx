import { css } from '@emotion/react';
import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
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

export const Article = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
			format={articleFormat}
		/>
	</Section>
);
Article.storyName = 'Article';

export const Analysis = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Analysis caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: Pillar.News,
			}}
		/>
	</Section>
);
Analysis.storyName = 'Analysis';

export const PhotoEssay = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: Pillar.News,
			}}
		/>
	</Section>
);
PhotoEssay.storyName = 'PhotoEssay';

export const SpecialReport = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a SpecialReport caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			}}
		/>
	</Section>
);
SpecialReport.storyName = 'SpecialReport';

export const PhotoEssayLimitedWidth = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: Pillar.News,
			}}
			shouldLimitWidth={true}
		/>
	</Section>
);
PhotoEssayLimitedWidth.storyName = 'PhotoEssay with width limited';

export const Credit = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a Feature caption looks with credit showing"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: Pillar.News,
			}}
			credit="Credited to Able Jones"
			displayCredit={true}
		/>
	</Section>
);
Credit.storyName = 'with credit';

export const WidthLimited = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks with width limited"
			format={articleFormat}
			shouldLimitWidth={true}
		/>
	</Section>
);
WidthLimited.storyName = 'with width limited';

export const Padded = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks when padded"
			format={articleFormat}
			padCaption={true}
		/>
	</Section>
);
Padded.storyName = 'when padded';

export const Overlaid = () => (
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
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
				padCaption={true}
			/>
		</div>
	</Section>
);
Overlaid.storyName = 'when overlaid';

export const OverlaidWithStars = () => (
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
				format={{
					display: ArticleDisplay.Showcase,
					design: ArticleDesign.Review,
					theme: Pillar.News,
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
	</Section>
);
OverlaidWithStars.storyName = 'when overlaid on stars';

export const VideoCaption = () => (
	<Section fullWidth={true} showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
			format={articleFormat}
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
