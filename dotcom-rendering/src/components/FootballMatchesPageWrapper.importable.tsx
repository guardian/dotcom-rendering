import type {
	FootballMatches,
	FootballMatchKind,
	Regions,
} from '../footballMatches';
import type { EditionId } from '../lib/edition';
import { FootballMatchesPage } from './FootballMatchesPage';

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}${path}`;
		window.location.assign(url);
	};

type Props = {
	nations: Regions;
	guardianBaseUrl: string;
	kind: FootballMatchKind;
	initialDays: FootballMatches;
	edition: EditionId;
	renderAds: boolean;
	pageId: string;
};

export const FootballMatchesPageWrapper = ({
	nations,
	guardianBaseUrl,
	kind,
	initialDays,
	edition,
	renderAds,
	pageId,
}: Props) => (
	<FootballMatchesPage
		regions={nations}
		guardianBaseUrl={guardianBaseUrl}
		kind={kind}
		initialDays={initialDays}
		edition={edition}
		goToCompetitionSpecificPage={goToCompetitionSpecificPage(
			guardianBaseUrl,
		)}
		renderAds={renderAds}
		pageId={pageId}
	/>
);
