import type { Region } from '../footballMatches';
import type { FootballTableData } from '../footballTables';
import { FootballTablesPage } from './FootballTablesPage';

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}${path}`;
		window.location.assign(url);
	};

type Props = {
	regions: Region[];
	pageId: string;
	tables: FootballTableData[];
	renderAds: boolean;
	guardianBaseUrl: string;
};

export const FootballTablesPageWrapper = ({
	regions,
	pageId,
	tables,
	renderAds,
	guardianBaseUrl,
}: Props) => (
	<FootballTablesPage
		regions={regions}
		pageId={pageId}
		competitions={tables}
		renderAds={renderAds}
		goToCompetitionSpecificPage={goToCompetitionSpecificPage(
			guardianBaseUrl,
		)}
		guardianBaseUrl={guardianBaseUrl}
	/>
);
