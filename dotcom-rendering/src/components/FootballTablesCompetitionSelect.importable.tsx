import type { Region } from '../footballDataPage';
import { FootballCompetitionSelect } from './FootballCompetitionSelect';

const goToCompetitionSpecificPage =
	(guardianBaseUrl: string) => (path: string) => {
		const url = `${guardianBaseUrl}${path}`;
		window.location.assign(url);
	};

type Props = {
	regions: Region[];
	pageId: string;
	guardianBaseUrl: string;
};

export const FootballTablesCompetitionSelect = ({
	regions,
	pageId,
	guardianBaseUrl,
}: Props) => (
	<FootballCompetitionSelect
		regions={regions}
		pageId={pageId}
		onChange={goToCompetitionSpecificPage(guardianBaseUrl)}
		kind="Tables"
	/>
);
