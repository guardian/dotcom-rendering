import { from, width } from '@guardian/source/foundations';
import { Option, Select } from '@guardian/source/react-components';

type Props<Crossword> = {
	/**
	 * Crosswords organised by date.
	 */
	crosswordsByDate: Record<string, Crossword[]>;
	/**
	 * The selected date.
	 */
	date: string;
	/**
	 * Called when a new date is chosen.
	 */
	onDateChange: (date: string) => void;
	/**
	 * The location of the crossword in the list of crosswords for a given date.
	 */
	crosswordIndex: number;
	/**
	 * Called when a new crossword index in the list of crosswords is chosen.
	 */
	onCrosswordIndexChange: (crossword: number) => void;
};

/**
 * Provides two select elements to choose a specific crossword. Each date has a
 * list of crosswords available. The first select element is for choosing the
 * date, the second is for choosing a particular crossword on that date.
 */
export function CrosswordSelect<Crossword extends { name: string }>({
	crosswordsByDate,
	date,
	onDateChange,
	crosswordIndex,
	onCrosswordIndexChange,
}: Props<Crossword>) {
	const dates = Object.keys(crosswordsByDate);

	if (dates.length === 0) {
		return null;
	}

	return (
		<div
			css={{
				display: 'flex',
				flexDirection: 'column',
				marginBottom: '20px',
				[from.tablet]: {
					maxWidth: '481px',
				},
			}}
		>
			<Select
				id="date-select"
				value={date}
				onChange={(e) => onDateChange(e.target.value)}
				label="Date"
			>
				{dates.map((crosswordDate) => (
					<Option value={crosswordDate} key={crosswordDate}>
						{crosswordDate}
					</Option>
				))}
			</Select>
			{crosswordsByDate[date] === undefined ||
			crosswordsByDate[date].length === 0 ? null : (
				<>
					<Select
						id="crossword-select"
						label="Crossword"
						value={crosswordIndex}
						onChange={(e) => {
							const index = parseInt(e.target.value);

							if (!isNaN(index)) {
								onCrosswordIndexChange(index);
							}
						}}
					>
						{crosswordsByDate[date].map((crossword, index) => (
							<Option value={index} key={crossword.name}>
								{crossword.name}
							</Option>
						))}
					</Select>
				</>
			)}
		</div>
	);
}
