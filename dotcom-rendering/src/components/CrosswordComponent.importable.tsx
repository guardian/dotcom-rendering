import { Crossword as ReactCrossword } from '@guardian/react-crossword-next';
import type { CrosswordProps } from '@guardian/react-crossword-next';

export const CrosswordComponent = ({
	data,
}: {
	data: CrosswordProps['data'];
}) => <ReactCrossword data={data} clueMinWidth={150} />;
