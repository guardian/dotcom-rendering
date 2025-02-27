import type { FootballMatches, FootballMatchKind } from '../footballMatches';
import type { EditionId } from '../lib/edition';
import type { Nations } from './FootballCompetitionSelect';
import { FootballMatchesPage } from './FootballMatchesPage';

const getPagePath = (kind: FootballMatchKind) => {
	switch (kind) {
		case 'Fixture':
			return 'fixtures';
		case 'Live':
			return 'live';
		case 'Result':
			return 'results';
	}
};

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string, kind: FootballMatchKind) => (tag: string) => {
		const url =
			tag === 'All'
				? `${guardianBaseUrl}/football/${getPagePath(kind)}`
				: `${guardianBaseUrl}/${tag}/${getPagePath(kind)}`;
		window.location.assign(url);
	};

type Props = {
	nations: Nations;
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	initialDays: FootballMatches;
	edition: EditionId;
	renderAds: boolean;
};

export const FootballMatchesPageWrapper = ({
	nations,
	guardianBaseUrl,
	kind,
	initialDays,
	edition,
	renderAds,
}: Props) => (
	<FootballMatchesPage
		nations={nations}
		guardianBaseUrl={guardianBaseUrl}
		kind={kind}
		initialDays={initialDays}
		edition={edition}
		goToCompetitionSpecificPage={goToCompetitionSpecificPage(
			guardianBaseUrl,
			kind,
		)}
		renderAds={renderAds}
	/>
);
