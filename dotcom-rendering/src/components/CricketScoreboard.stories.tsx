import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import { breakpoints } from '@guardian/source-foundations';
import { match } from '../../fixtures/manual/cricket-scoreboard.ts';
import { CricketScoreboard } from './CricketScoreboard.tsx';

export default {
	component: CricketScoreboard,
	title: 'Components/CricketScoreboard',
	parameters: {
		chromatic: {
			viewports: [breakpoints.mobileLandscape],
		},
	},
};

export const defaultStory = () => {
	return (
		<div>
			<CricketScoreboard
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.LiveBlog,
					theme: Pillar.Sport,
				}}
				match={match}
				scorecardUrl="/test"
			/>
		</div>
	);
};
defaultStory.storyName = 'Cricket Scoreboard';
