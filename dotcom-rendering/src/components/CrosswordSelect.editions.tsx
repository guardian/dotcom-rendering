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
		<>
			<label htmlFor="date-select">Date</label>
			<select
				id="date-select"
				value={date}
				onChange={(e) => onDateChange(e.target.value)}
			>
				{dates.map((crosswordDate) => (
					<option value={crosswordDate} key={crosswordDate}>
						{crosswordDate}
					</option>
				))}
			</select>
			{crosswordsByDate[date] === undefined ||
			crosswordsByDate[date].length === 0 ? null : (
				<>
					<label htmlFor="crossword-select">Crossword</label>
					<select
						id="crossword-select"
						value={crosswordIndex}
						onChange={(e) => {
							const index = parseInt(e.target.value);

							if (!isNaN(index)) {
								onCrosswordIndexChange(index);
							}
						}}
					>
						{crosswordsByDate[date].map((crossword, index) => (
							<option value={index} key={crossword.name}>
								{crossword.name}
							</option>
						))}
					</select>
				</>
			)}
		</>
	);
}
