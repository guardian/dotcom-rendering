/* eslint-disable ssr-friendly/no-dom-globals-in-module-scope */
import type { CAPICrossword } from '@guardian/react-crossword/dist/@types/CAPI';
import { createRoot } from 'react-dom/client';
import { Crosswords } from '../components/Crosswords.editions';

const element = document.getElementById('editions-crossword-player');
if (!element) {
	throw new Error('No element found with id "editions-crossword-player"');
}
const crosswordsData = element.dataset.crosswords;
if (!crosswordsData) {
	throw new Error('No data found for "editions-crossword-player"');
}

const crosswords = JSON.parse(crosswordsData) as CAPICrossword[];
const root = createRoot(element);
root.render(<Crosswords crosswords={crosswords} timeZone={undefined} />);
