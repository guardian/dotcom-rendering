import { Available } from './available';

export const CricketScorecard = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			These pages are summaries of cricket matches, and contain various
			statistics about a match, including batters, bowlers, and the fall
			of wickets. For example,{' '}
			<a href="https://www.theguardian.com/sport/cricket/match/2025-02-22/england-cricket-team">
				the cricket scorecard
			</a>{' '}
			for a match between England and Australia. They are typically
			reached from a link at the top of a{' '}
			<a href="https://www.theguardian.com/sport/live/2025/feb/22/australia-v-england-champions-trophy-updates-live">
				cricket liveblog
			</a>
			, which is a kind of <a href="../article">article</a>.
		</p>
	</>
);
