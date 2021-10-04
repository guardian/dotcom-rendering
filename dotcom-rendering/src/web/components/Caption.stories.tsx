import { ElementContainer } from '@frontend/web/components/ElementContainer';
import { Caption } from '@frontend/web/components/Caption';
import {
	ArticleDisplay,
	ArticleDesign,
	ArticlePillar,
	ArticleSpecial,
} from '@guardian/libs';
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
