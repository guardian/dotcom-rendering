import { Available } from './available';

const SeeAlso = () => (
	<>
		<h2>See also</h2>
		<ul>
			<li>
				<a href="../football-live">Football Live</a>
			</li>
			<li>
				<a href="../football-fixtures">Football Fixtures</a>
			</li>
			<li>
				<a href="../football-results">Football Results</a>
			</li>
			<li>
				<a href="../football-tables">Football Tables</a>
			</li>
		</ul>
	</>
);

export const FootballMatchSummary = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			These pages are summaries of football matches, and there are two
			variants. Before a match has begun it's a simple placeholder showing
			the names and crests of the two teams. After a match has started, it
			will be populated with various statistics about the match, including
			scores, possession and line-ups. For example,{' '}
			<a href="https://www.theguardian.com/football/match/2025/apr/08/arsenal-v-realmadrid">
				the summary page
			</a>{' '}
			for a completed match between Arsenal and Real Madrid. These pages
			are powered by data from the Press Association (PA).
		</p>
		<p>
			Often matches that are completed have match reports, which are a
			kind of <a href="../article">article</a>, written about them.
			Whenever one of these is available, the various pages that list
			matches, such as the <a href="../football-results">results page</a>,
			will link to the match report. For example,{' '}
			<a href="https://www.theguardian.com/football/2025/apr/08/arsenal-real-madrid-champions-league-quarter-final-first-leg-match-report">
				the match report
			</a>{' '}
			for the aforementioned Arsenal vs Real Madrid match. When one of
			these is not available for a given match, however, the links will
			instead point to the match summary page.
		</p>
		<SeeAlso />
	</>
);
