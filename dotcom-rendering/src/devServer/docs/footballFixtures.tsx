import { Available } from './available';

const SeeAlso = () => (
	<>
		<h2>See also</h2>
		<ul>
			<li>
				<a href="../football-live">Football Live</a>
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

export const FootballFixtures = () => (
	<>
		<Available targets={['dotcom']} />
		<p>
			The{' '}
			<a href="https://www.theguardian.com/football/fixtures">
				football fixtures page
			</a>{' '}
			is a list of football matches happening in the future. There are
			also versions of this page for specific competitions, such as the{' '}
			<a href="https://www.theguardian.com/football/premierleague/fixtures">
				Premier League
			</a>
			, accessible from the dropdown. It's powered by data from the Press
			Association (PA).
		</p>
		<SeeAlso />
	</>
);
