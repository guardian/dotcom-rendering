import { EditionsCrossword } from '../components/EditionsCrossword.importable';
import { Island } from '../components/Island';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

interface Props {
	editionsCrossword: FEEditionsCrossword;
}

export const EditionsCrosswordLayout = ({ editionsCrossword }: Props) => {
	const crossword: FEEditionsCrossword = editionsCrossword;
	if (
		!crossword.number ||
		!crossword.name ||
		!crossword.date ||
		!crossword.solutionAvailable ||
		!crossword.pdf
	) {
		console.error('Crossword data is missing or incomplete:', crossword);
		return null;
	}
	return (
		<main data-layout="EditionsCrosswordLayout">
			<Island priority="critical">
				<EditionsCrossword
					data={{
						id: crossword.name,
						number: crossword.number,
						name: crossword.name,
						date: new Date(crossword.date).getTime(),
						webPublicationDate: new Date(crossword.date).getTime(),
						entries: crossword.entries,
						solutionAvailable: crossword.solutionAvailable,
						dateSolutionAvailable: new Date(
							crossword.dateSolutionAvailable,
						).getTime(),
						dimensions: crossword.dimensions,
						crosswordType: crossword.type,
						pdf: crossword.pdf,
					}}
				/>
			</Island>
		</main>
	);
};
