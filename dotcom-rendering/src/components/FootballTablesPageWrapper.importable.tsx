import type { Region } from '../footballMatches';
import type { FootballTableCompetition } from '../footballTables';
import { FootballTablesPage } from './FootballTablesPage';

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}${path}`;
		window.location.assign(url);
	};

type Props = {
	regions: Region[];
	pageId: string;
	competitions: FootballTableCompetition[];
	renderAds: boolean;
	guardianBaseUrl: string;
};

export const FootballTablesPageWrapper = ({
	regions,
	pageId,
	competitions,
	renderAds,
	guardianBaseUrl,
}: Props) => (
	<FootballTablesPage
		regions={regions}
		pageId={pageId}
		competitions={competitions}
		renderAds={renderAds}
		goToCompetitionSpecificPage={goToCompetitionSpecificPage(
			guardianBaseUrl,
		)}
		guardianBaseUrl={guardianBaseUrl}
	/>
);
