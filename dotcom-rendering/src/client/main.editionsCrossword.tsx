/* eslint-disable ssr-friendly/no-dom-globals-in-module-scope */
import css from '@guardian/react-crossword/lib/index.css';
import { createRoot } from 'react-dom/client';
import { Crosswords } from '../components/Crosswords.editions';
import type { FEEditionsCrossword } from '../types/editionsCrossword';

const style = document.createElement('style');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- We know this will be a string
style.innerHTML = css;
document.body.appendChild(style);

const element = document.getElementById('editions-crossword-player');
if (!element) {
	throw new Error('No element found with id "editions-crossword-player"');
}
const crosswordsData = element.dataset.crosswords;
if (!crosswordsData) {
	throw new Error('No data found for "editions-crossword-player"');
}

const crosswords = JSON.parse(crosswordsData) as FEEditionsCrossword[];
const root = createRoot(element);
root.render(<Crosswords crosswords={crosswords} timeZone={undefined} />);
