import { StrictMode } from 'react';
import { EditionsCrosswordLayout } from '../layouts/EditionsCrosswordLayout';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';

interface Props {
	editionsCrosswords: FEEditionsCrosswords;
}

export const EditionsCrosswordPage = ({ editionsCrosswords }: Props) => {
	return (
		<StrictMode>
			<EditionsCrosswordLayout
				editionsCrosswords={editionsCrosswords.crosswords}
			/>
		</StrictMode>
	);
};
