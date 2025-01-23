import { Crossword as ReactCrossword } from '@guardian/react-crossword-next';
import type { CrosswordProps } from '@guardian/react-crossword-next';

/*
	The name of this component is important, when it was "Crossword"
	webpack was renaming it and the JS wasn't loading in the client.
 */
export const CrosswordComponent = ({
	data,
}: {
	data: CrosswordProps['data'];
}) => <ReactCrossword data={data} clueMinWidth={150} />;
