import { Option, Select } from '@guardian/source/react-components';
import { palette } from '../palette';

type Nations = Array<{
	name: string;
	competitions: Array<{ tag: string; name: string }>;
}>;

type Props = {
	nations: Nations;
	onChange: (competitionTag: string) => void;
};

export const FootballCompetitionSelect = ({ nations, onChange }: Props) => (
	<Select
		label="Choose league:"
		onChange={(e) => onChange(e.target.value)}
		theme={{
			textLabel: palette('--football-competition-select-text'),
			textUserInput: palette('--football-competition-select-text'),
			backgroundInput: palette('--article-background'),
		}}
	>
		<Option value="All">All results</Option>
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
