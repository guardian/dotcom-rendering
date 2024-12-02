import type { CrosswordData } from '@guardian/source-development-kitchen/dist/react-components/crossword/@types/crossword';
import { EditionsCrossword } from '../components/EditionsCrossword';
import { Island } from '../components/Island';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

interface Props {
	editionsCrosswords: FEEditionsCrossword[];
}

const getTodaysCrosswords = (
	editionsCrosswords: FEEditionsCrossword[],
): FEEditionsCrossword[] => {
	const today = new Date().toISOString().split('T')[0] ?? '2024-11-27';

	return editionsCrosswords.filter(({ date }) => {
		return date.startsWith(today);
	});
};

const transformCrosswordData = (crossword: FEEditionsCrossword) => ({
	id: crossword.name,
	number: crossword.number,
	name: crossword.name,
	creator: crossword.creator,
	date: new Date(crossword.date).getTime(),
	webPublicationDate: new Date(crossword.date).getTime(),
	entries: crossword.entries,
	solutionAvailable: crossword.solutionAvailable,
	dateSolutionAvailable: new Date(crossword.dateSolutionAvailable).getTime(),
	dimensions: crossword.dimensions,
	crosswordType: crossword.type as CrosswordData['crosswordType'],
	pdf: crossword.pdf,
});

export const EditionsCrosswordLayout = ({ editionsCrosswords }: Props) => {
	const todaysCrosswords = getTodaysCrosswords(editionsCrosswords);

	return (
		<main
			id="editions-crossword-player"
			data-crosswords={JSON.stringify(editionsCrosswords)}
		></main>
	);
};
