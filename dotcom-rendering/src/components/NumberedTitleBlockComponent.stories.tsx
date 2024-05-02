import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { NumberedTitleBlockComponent } from './NumberedTitleBlockComponent';

export default {
	component: NumberedTitleBlockComponent,
	title: 'Components/NumberedTitleBlockComponent',
};

const allThemes = [
	Pillar.News,
	Pillar.Sport,
	Pillar.Culture,
	Pillar.Lifestyle,
	Pillar.Opinion,
	ArticleSpecial.SpecialReportAlt,
	ArticleSpecial.SpecialReport,
	ArticleSpecial.Labs,
] as const satisfies ReadonlyArray<ArticleTheme>;

const allThemeStandardVariations = allThemes.map((theme) => ({
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
	theme,
}));

export const JustH2 = () => (
	<div>
		<NumberedTitleBlockComponent position={1} html="<h2>Simple text</h2>" />
	</div>
);
JustH2.storyName = 'with just h2 text';
JustH2.decorators = [splitTheme(allThemeStandardVariations)];

export const Strong = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2><strong>Strong text</strong></h2>"
		/>
	</div>
);
Strong.storyName = 'with only strong text';
Strong.decorators = [splitTheme(allThemeStandardVariations)];

export const Leading = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2><strong>Strong text</strong> One Plus 7T Pro</h2>"
		/>
	</div>
);
Leading.storyName = 'with leading strong text';
Leading.decorators = [splitTheme(allThemeStandardVariations)];

export const Trailing = () => (
	<div>
		<NumberedTitleBlockComponent
			position={1}
			html="<h2>Plain H2<strong>Strong text</strong></h2>"
		/>
	</div>
);
Trailing.storyName = 'with trailing strong text';
Trailing.decorators = [splitTheme(allThemeStandardVariations)];
