import Crossword from '@guardian/react-crossword';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

interface EditionsCrosswordProps {
	data: FEEditionsCrossword[];
}

export const EditionsCrossword = ({ data }: EditionsCrosswordProps) => (
	<>
		<Crossword data={data[0]} />
	</>
);
