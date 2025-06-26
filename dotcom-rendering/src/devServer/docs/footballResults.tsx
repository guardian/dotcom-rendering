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
				<a href="../football-tables">Football Tables</a>
			</li>
			<li>
				<a href="../football-match-summary">Football Match Summary</a>
			</li>
		</ul>
	</>
);

export const FootballResults = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			The{' '}
			<a href="https://www.theguardian.com/football/results">
				football results page
			</a>{' '}
			is a list of results from football matches that have happened in the
			past. There are also versions of this page for specific
			competitions, such as the{' '}
			<a href="https://www.theguardian.com/football/premierleague/results">
				Premier League
			</a>
			, accessible from the dropdown. It's powered by data from the Press
			Association (PA).
		</p>
		<SeeAlso />
	</>
);
