import { Available } from './available';

const SeeAlso = () => (
	<>
		<h2>See also</h2>
		<ul>
			<li>
				<a href="../football-fixtures">Football Fixtures</a>
			</li>
			<li>
				<a href="../football-results">Football Results</a>
			</li>
			<li>
				<a href="../football-tables">Football Tables</a>
			</li>
			<li>
				<a href="../football-match-summary">Football Match Summary</a>
			</li>
		</ul>
	</>
);

export const FootballLive = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			The{' '}
			<a href="https://www.theguardian.com/football/live">
				football live page
			</a>{' '}
			is a list of football matches happening today. It shows the fixture
			time before they start, live scores for each match that's currently
			being played, and results when they've finished. There are also
			versions of this page for specific competitions, such as the{' '}
			<a href="https://www.theguardian.com/football/premierleague/live">
				Premier League
			</a>
			, accessible from the dropdown. It's powered by data from the Press
			Association (PA).
		</p>
		<SeeAlso />
	</>
);
