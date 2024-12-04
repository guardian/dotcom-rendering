import './webpackPublicPath';
import css from '@guardian/react-crossword/lib/index.css';
import { createRoot } from 'react-dom/client';
import { EditionsCrossword } from '../components/EditionsCrossword';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

const style = document.createElement('style');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- We know this will be a string
style.innerHTML = css;
document.body.appendChild(style);

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
	root.render(
		<>
			<EditionsCrossword data={crosswords} />
		</>,
	);
}
