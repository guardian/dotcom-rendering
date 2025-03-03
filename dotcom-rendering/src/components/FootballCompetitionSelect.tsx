import { Option, Select } from '@guardian/source/react-components';
import type { FootballMatchKind, Regions } from '../footballMatches';
import { palette } from '../palette';

type Props = {
	nations: Regions;
	kind: FootballMatchKind;
	onChange: (competitionTag: string) => void;
};

const allLabel = (kind: FootballMatchKind): string => {
	switch (kind) {
		case 'Fixture':
			return 'All fixtures';
		case 'Result':
			return 'All results';
		case 'Live':
			return 'All live';
	}
};

const getPagePath = (kind: FootballMatchKind) => {
	switch (kind) {
		case 'Fixture':
			return 'football/fixtures';
		case 'Live':
			return 'football/live';
		case 'Result':
			return 'football/results';
	}
};

export const FootballCompetitionSelect = ({
	nations,
	kind,
	onChange,
}: Props) => (
	<Select
		label="Choose league:"
		onChange={(e) => onChange(e.target.value)}
		theme={{
			textLabel: palette('--football-competition-select-text'),
			textUserInput: palette('--football-competition-select-text'),
			backgroundInput: palette('--article-background'),
		}}
	>
		<Option value={getPagePath(kind)}>{allLabel(kind)}</Option>
		{nations.map((nation) => (
			<optgroup label={nation.name} key={nation.name}>
				{nation.competitions.map((competition) => (
					<Option key={competition.name} value={competition.url}>
						{competition.name}
					</Option>
				))}
			</optgroup>
		))}
	</Select>
);
