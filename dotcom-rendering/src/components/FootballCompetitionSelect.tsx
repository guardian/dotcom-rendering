import { Option, Select } from '@guardian/source/react-components';
import type { Region } from '../footballDataPage';
import type { FootballMatchKind } from '../footballMatches';
import { palette } from '../palette';

type FootballSelectKind = FootballMatchKind | 'Tables';

type Props = {
	regions: Region[];
	kind: FootballSelectKind;
	pageId: string;
	onChange: (competitionTag: string) => void;
};

const allLabel = (kind: FootballSelectKind): string => {
	switch (kind) {
		case 'Fixture':
			return 'All fixtures';
		case 'Result':
			return 'All results';
		case 'Live':
			return 'All live';
		case 'Tables':
			return 'All tables';
	}
};

const getPagePath = (kind: FootballSelectKind) => {
	switch (kind) {
		case 'Fixture':
			return '/football/fixtures';
		case 'Live':
			return '/football/live';
		case 'Result':
			return '/football/results';
		case 'Tables':
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
