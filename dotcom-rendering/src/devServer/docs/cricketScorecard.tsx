import { Available } from './available';

export const CricketScorecard = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			These pages are summaries of cricket matches, and contain various
			statistics about a match, including batters, bowlers, and the fall
			of wickets. They are typically reached from a link at the top of
			some recent{' '}
			<a href="https://www.theguardian.com/sport/cricket+tone/minutebyminute">
				cricket liveblogs
			</a>
			, which are a kind of <a href="../article">article</a>.
		</p>
	</>
);
