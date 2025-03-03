import type {
	FootballMatches,
	FootballMatchKind,
	Regions,
} from '../footballMatches';
import type { EditionId } from '../lib/edition';
import { FootballMatchesPage } from './FootballMatchesPage';

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}/${path}`;
		window.location.assign(url);
	};

type Props = {
	nations: Regions;
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
		)}
		renderAds={renderAds}
	/>
);
