import { useEffect, useState } from 'react';
import {
	type CrosswordsByDate,
	type FEEditionsCrossword,
	groupByDate,
} from '../types/editionsCrossword';
import { CrosswordSelect } from './CrosswordSelect.editions';

type Props = {
	crosswords: FEEditionsCrossword[];
	/**
	 * Used to derive the dates by which to group the crosswords. If `undefined`
	 * it will use a side-effect to determine the local timezone.
	 */
	timeZone: string | undefined;
};

export const Crosswords = ({ crosswords, timeZone }: Props) => {
	const [crosswordsByDate, setCrosswordsByDate] = useState<
		CrosswordsByDate | undefined
	>(undefined);

	useEffect(() => {
		// This is side-effectful, it can depend on the user's timezone.
		const formatter = Intl.DateTimeFormat('en-GB', {
			year: 'numeric',
			month: 'long',
			day: '2-digit',
			weekday: 'long',
			timeZone,
		});

		setCrosswordsByDate(groupByDate(formatter)(crosswords));
	}, [crosswords, timeZone]);

	// Initially undefined until the effect runs.
	if (crosswordsByDate === undefined) {
		return null;
	}

	const initialDate = Object.keys(crosswordsByDate)[0];

	// If there are no dates then there are no crosswords.
	if (initialDate === undefined) {
		return null;
	}

	return (
		<CrosswordsWithInitialDate
			crosswordsByDate={crosswordsByDate}
			initialDate={initialDate}
		/>
	);
};

type CrosswordsWithInitialDateProps = {
	crosswordsByDate: CrosswordsByDate;
	initialDate: string;
};

const CrosswordsWithInitialDate = ({
	crosswordsByDate,
	initialDate,
}: CrosswordsWithInitialDateProps) => {
	const [date, setDate] =
		useState<keyof typeof crosswordsByDate>(initialDate);
	const [crosswordIndex, setCrosswordIndex] = useState<number>(0);

	const crossword = crosswordsByDate[date]?.at(crosswordIndex);

	return (
		<>
			<CrosswordSelect
				crosswordsByDate={crosswordsByDate}
				date={date}
				onDateChange={(newDate: string) => {
					setDate(newDate);
					// When selecting a new date, display the first crossword
					// in the list for that date.
					setCrosswordIndex(0);
				}}
				crosswordIndex={crosswordIndex}
				onCrosswordIndexChange={setCrosswordIndex}
			/>
			{crossword === undefined ? null : (
				<ul>
					{crossword.entries.map((entry) => (
						<li key={entry.id}>{entry.clue}</li>
					))}
				</ul>
			)}
		</>
	);
};
