import { Option, Select } from '@guardian/source/react-components';
import type { FootballMatchKind } from '../footballMatches';
import { palette } from '../palette';

export type Nations = Array<{
	name: string;
	competitions: Array<{ tag: string; name: string }>;
}>;

type Props = {
	nations: Nations;
	kind: Exclude<FootballMatchKind, 'Live'>;
	onChange: (competitionTag: string) => void;
};

const allLabel = (kind: Exclude<FootballMatchKind, 'Live'>): string => {
	switch (kind) {
		case 'Fixture':
			return 'All fixtures';
		case 'Result':
			return 'All results';
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
		<Option value="All">{allLabel(kind)}</Option>
		{nations.map((nation) => (
			<optgroup label={nation.name} key={nation.name}>
				{nation.competitions.map((competition) => (
					<Option key={competition.tag} value={competition.tag}>
						{competition.name}
					</Option>
				))}
			</optgroup>
		))}
	</Select>
);
