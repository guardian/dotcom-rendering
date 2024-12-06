import type { FEEditionsCrossword } from '../types/editionsCrossword';

interface Props {
	editionsCrosswords: FEEditionsCrossword[];
}

export const EditionsCrosswordLayout = ({ editionsCrosswords }: Props) => {
	return (
		<main
			id="editions-crossword-player"
			data-crosswords={JSON.stringify(editionsCrosswords)}
		></main>
	);
};
