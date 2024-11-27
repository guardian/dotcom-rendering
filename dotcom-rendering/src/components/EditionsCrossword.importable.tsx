import type { CrosswordData } from '@guardian/source-development-kitchen/dist/react-components/crossword/@types/crossword';
import { Crossword } from '@guardian/source-development-kitchen/react-components';

interface EditionsCrosswordProps {
	data: CrosswordData;
}

export const EditionsCrossword = ({ data }: EditionsCrosswordProps) => (
	<>
		<h1>{data.id}</h1>
		<Crossword data={data} />
	</>
);
