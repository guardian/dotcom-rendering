import {
	ArticleDesign,
	ArticleDisplay,
	ArticleSpecial,
	Pillar,
} from '@guardian/libs';
import type { Meta } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { Byline } from './Byline';

const meta: Meta<typeof Byline> = {
	component: Byline,
	title: 'Components/Byline',
};
export default meta;

const bylineName = 'CP Scott';

const StoryForFormat = (format: ArticleFormat) => {
	return (
		<>
			<Byline text={bylineName} format={format} size="ginormous" />
			<br />
			<Byline text={bylineName} format={format} size="huge" />
			<br />
			<Byline text={bylineName} format={format} size="large" />
			<br />
			<Byline text={bylineName} format={format} size="medium" />
			<br />
			<Byline text={bylineName} format={format} size="small" />
			<br />
			<Byline text={bylineName} format={format} size="tiny" />
		</>
	);
};

const makeStory = (format: ArticleFormat) => ({
	render: () => StoryForFormat(format),
	decorators: [splitTheme(format)],
});

export const NewsThemeStandardDisplayLiveBlogDesign = makeStory({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.LiveBlog,
	theme: Pillar.News,
});

export const OpinionThemeNumberedListDisplayCommentDesign = makeStory({
	display: ArticleDisplay.NumberedList,
	design: ArticleDesign.Comment,
	theme: Pillar.Opinion,
});

export const SportThemeStandardDisplayMatchReportDesign = makeStory({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.MatchReport,
	theme: Pillar.Sport,
});

export const CultureThemeStandardDisplayPhotoEssayDesign = makeStory({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.PhotoEssay,
	theme: Pillar.Culture,
});

export const LifestyleThemeShowcaseDisplayStandardDesign = makeStory({
	display: ArticleDisplay.Showcase,
	design: ArticleDesign.Standard,
	theme: Pillar.Lifestyle,
});

export const LabsThemeStandardDisplayStandardDesign = makeStory({
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticleSpecial.Labs,
});
