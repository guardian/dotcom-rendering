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
				<a href="../football-match-summary">Football Match Summary</a>
			</li>
		</ul>
	</>
);

export const FootballTables = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			The{' '}
			<a href="https://www.theguardian.com/football/tables">
				football tables page
			</a>{' '}
			is a list of tables from different football competitions. There are
			also versions of this page for specific competitions, such as the{' '}
			<a href="https://www.theguardian.com/football/premierleague/table">
				Premier League
			</a>
			, accessible either from the dropdown or by following the links at
			the bottom of each table. It's powered by data from the Press
			Association (PA).
		</p>
		<SeeAlso />
	</>
);
