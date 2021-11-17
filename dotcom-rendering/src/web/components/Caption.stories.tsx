import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Caption } from '@frontend/web/components/Caption';
import { StarRating } from '@root/src/web/components/StarRating/StarRating';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
import { css } from '@emotion/react';
import { decidePalette } from '../lib/decidePalette';

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
    isOverlayed?: boolean; // Not tested here as this option only works in the context of the ImageComponent
 */

export const Article = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			})}
		/>
	</ElementContainer>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Analysis caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Analysis,
				theme: ArticlePillar.News,
			})}
		/>
	</ElementContainer>
);
Analysis.story = { name: 'Analysis' };

export const PhotoEssay = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			})}
		/>
	</ElementContainer>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const SpecialReport = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a SpecialReport caption looks"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticleSpecial.SpecialReport,
			})}
		/>
	</ElementContainer>
);
SpecialReport.story = { name: 'SpecialReport' };

export const PhotoEssayLimitedWidth = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
			format={{
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Immersive,
				design: ArticleDesign.PhotoEssay,
				theme: ArticlePillar.News,
			})}
			shouldLimitWidth={true}
		/>
	</ElementContainer>
);
PhotoEssayLimitedWidth.story = { name: 'PhotoEssay with width limited' };

export const Credit = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a Feature caption looks with credit showing"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Feature,
				theme: ArticlePillar.News,
			})}
			credit="Credited to Able Jones"
			displayCredit={true}
		/>
	</ElementContainer>
);
Credit.story = { name: 'with credit' };

export const WidthLimited = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks with width limited"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			})}
			shouldLimitWidth={true}
		/>
	</ElementContainer>
);
WidthLimited.story = { name: 'with width limited' };

export const Padded = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks when padded"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			}}
			palette={decidePalette({
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: ArticlePillar.News,
			})}
			padCaption={true}
		/>
	</ElementContainer>
);
Padded.story = { name: 'when padded' };

export const Overlayed = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
				isOverlayed={true}
				captionText="This is how a caption looks when it's overlayed"
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: ArticlePillar.News,
				})}
				padCaption={true}
			/>
		</div>
	</ElementContainer>
);
Overlayed.story = { name: 'when overlayed' };

export const OverlayedWithStars = () => (
	<ElementContainer showTopBorder={false} showSideBorders={false}>
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
				isOverlayed={true}
				captionText="This is how a caption looks when it's overlayed with stars"
				format={{
					display: ArticleDisplay.Showcase,
					design: ArticleDesign.Review,
					theme: ArticlePillar.News,
				}}
				palette={decidePalette({
					display: ArticleDisplay.Showcase,
					design: ArticleDesign.Review,
					theme: ArticlePillar.News,
				})}
				padCaption={true}
			/>
			<div
				css={css`
					position: absolute;
					bottom: 0;
					background-color: yellow; ;
				`}
			>
				<StarRating rating={3} size="large" />
			</div>
		</div>
	</ElementContainer>
);
OverlayedWithStars.story = { name: 'when overlayed on stars' };
