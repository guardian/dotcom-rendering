import { Option, Select } from '@guardian/source/react-components';
import { palette } from '../palette';
import type { FootballPageKind, Region } from '../sportDataPage';

type Props = {
	regions: Region[];
	kind: FootballPageKind;
	pageId: string;
	onChange: (competitionTag: string) => void;
};

const allLabel = (kind: FootballPageKind): string => {
	switch (kind) {
		case 'FootballFixtures':
			return 'All fixtures';
		case 'FootballResults':
			return 'All results';
		case 'FootballLiveScores':
			return 'All live';
		case 'FootballTables':
			return 'All tables';
	}
};

const getPagePath = (kind: FootballPageKind) => {
	switch (kind) {
		case 'FootballFixtures':
			return '/football/fixtures';
		case 'FootballLiveScores':
			return '/football/live';
		case 'FootballResults':
			return '/football/results';
		case 'FootballTables':
			return '/football/tables';
	}
};

export const FootballCompetitionSelect = ({
	regions,
	kind,
	pageId,
	onChange,
}: Props) => (
	<Select
		label="Choose league:"
		onChange={(e) => onChange(e.target.value)}
		value={pageId.startsWith('/') ? pageId : `/${pageId}`}
		theme={{
			textLabel: palette('--football-competition-select-text'),
			textUserInput: palette('--football-competition-select-text'),
			backgroundInput: palette('--article-background'),
		}}
	>
		<Option value={getPagePath(kind)}>{allLabel(kind)}</Option>
		{regions.map((region) => (
			<optgroup label={region.name} key={region.name}>
				{region.competitions.map((competition) => (
					<Option key={competition.name} value={competition.url}>
						{competition.name}
					</Option>
				))}
			</optgroup>
		))}
	</Select>
);
