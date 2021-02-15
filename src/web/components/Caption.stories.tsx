import { Section } from '@frontend/web/components/Section';
import { Caption } from '@frontend/web/components/Caption';
import { Display, Design, Pillar, Special } from '@guardian/types';
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
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Article caption looks"
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
	</Section>
);
Article.story = { name: 'Article' };

export const Analysis = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how an Analysis caption looks"
			format={{
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Analysis,
				theme: Pillar.News,
			})}
		/>
	</Section>
);
Analysis.story = { name: 'Analysis' };

export const PhotoEssay = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks</li></ul>"
			format={{
				display: Display.Immersive,
				design: Design.PhotoEssay,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Immersive,
				design: Design.PhotoEssay,
				theme: Pillar.News,
			})}
		/>
	</Section>
);
PhotoEssay.story = { name: 'PhotoEssay' };

export const SpecialReport = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a SpecialReport caption looks"
			format={{
				display: Display.Standard,
				design: Design.Article,
				theme: Special.SpecialReport,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Article,
				theme: Special.SpecialReport,
			})}
		/>
	</Section>
);
SpecialReport.story = { name: 'SpecialReport' };

export const PhotoEssayLimitedWidth = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="<ul><li>This is how a PhotoEssay caption looks when width is limited</li></ul>"
			format={{
				display: Display.Immersive,
				design: Design.PhotoEssay,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Immersive,
				design: Design.PhotoEssay,
				theme: Pillar.News,
			})}
			shouldLimitWidth={true}
		/>
	</Section>
);
PhotoEssayLimitedWidth.story = { name: 'PhotoEssay with width limited' };

export const Credit = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a Feature caption looks with credit showing"
			format={{
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.News,
			}}
			palette={decidePalette({
				display: Display.Standard,
				design: Design.Feature,
				theme: Pillar.News,
			})}
			credit="Credited to Able Jones"
			displayCredit={true}
		/>
	</Section>
);
Credit.story = { name: 'with credit' };

export const WidthLimited = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks with width limited"
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
			shouldLimitWidth={true}
		/>
	</Section>
);
WidthLimited.story = { name: 'with width limited' };

export const Padded = () => (
	<Section showTopBorder={false} showSideBorders={false}>
		<Caption
			captionText="This is how a caption looks when padded"
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
			padCaption={true}
		/>
	</Section>
);
Padded.story = { name: 'when padded' };
