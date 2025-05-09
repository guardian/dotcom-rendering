import { StrictMode } from 'react';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';

interface Props {
	editionsCrosswords: FEEditionsCrosswords;
}

export const EditionsCrosswordPage = ({ editionsCrosswords }: Props) => {
	return (
		<StrictMode>
			<main
				id="editions-crossword-player"
				data-crosswords={JSON.stringify(
					editionsCrosswords.newCrosswords,
				)}
			></main>
		</StrictMode>
	);
};
