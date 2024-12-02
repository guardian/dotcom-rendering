import './webpackPublicPath';
import { createRoot } from 'react-dom/client';
import { EditionsCrossword } from '../components/EditionsCrossword';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

// eslint-disable-next-line ssr-friendly/no-dom-globals-in-module-scope
const element = document.getElementById('editions-crossword-player');
if (element === null) {
	throw new Error('No element found with id "editions-crossword-player"');
} else {
	const crosswordsData = element.dataset.crosswords;
	if (crosswordsData === undefined) {
		throw new Error('No data found for "editions-crossword-player"');
	}
	const crosswords = JSON.parse(crosswordsData) as FEEditionsCrossword[];
	const root = createRoot(element);
	root.render(<EditionsCrossword data={crosswords} />);
}
