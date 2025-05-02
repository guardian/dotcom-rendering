import { StrictMode } from 'react';
import type { CAPICrosswords } from '../types/editionsCrossword';

interface Props {
	editionsCrosswords: CAPICrosswords;
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
