import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { MatchTabs } from './MatchTabs';

export default {
	component: MatchTabs,
	title: 'Components/MatchTabs',
};

export const BothURLs = () => {
	return (
		<MatchTabs
			minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates"
			reportUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.Sport,
			}}
		/>
	);
};
BothURLs.storyName = 'Both URLs';

export const OnReportPage = () => {
	return (
		<MatchTabs
			minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates"
			reportUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.Sport,
			}}
		/>
	);
};
OnReportPage.storyName = 'On Report Page';

export const OnBlogPage = () => {
	return (
		<MatchTabs
			minByMinUrl="https://www.theguardian.com/football/live/2021/nov/03/manchester-city-v-club-brugge-champions-league-live-score-updates"
			reportUrl="https://www.theguardian.com/football/2021/nov/03/manchester-city-club-brugge-champions-league-match-report"
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.DeadBlog,
				theme: Pillar.Sport,
			}}
		/>
	);
};
OnBlogPage.storyName = 'On Blog Page';
