import { trails } from '../layouts/HostedArticleLayout';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	ArticleSpecial,
} from '../lib/articleFormat';
import { HostedContentOnwards } from './HostedContentOnwards';

export default {
	component: HostedContentOnwards,
	title: 'Components/HostedContentOnwards',
};

export const Default = () => {
	return (
		<HostedContentOnwards
			trails={trails}
			format={
				{
					theme: ArticleSpecial.Labs,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.HostedArticle,
				} as ArticleFormat
			}
			discussionApiUrl=""
			onwardsSource="related-content"
			brandName="TrendAI"
		/>
	);
};

Default.storyName = 'default';

export const WithAccentColour = () => {
	return (
		<HostedContentOnwards
			trails={trails}
			format={
				{
					theme: ArticleSpecial.Labs,
					display: ArticleDisplay.Standard,
					design: ArticleDesign.HostedArticle,
				} as ArticleFormat
			}
			discussionApiUrl=""
			onwardsSource="related-content"
			brandName="TrendAI"
			accentColor="#FF0000"
		/>
	);
};

WithAccentColour.storyName = 'with accent colour';
