import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { err } from '@guardian/types';
import Int64 from 'node-int64';
import { DocParser } from 'types/parserContext';
import { formatOptionalDate, parseAtom } from './atoms';

describe('formatOptionalDate', () => {
	it('returns undefined given an undefined value', () => {
		expect(formatOptionalDate(undefined)).toBe(undefined);
	});

	it('returns undefined given a non valid date Int64', () => {
		const int64 = new Int64('123456789abcdef0');
		expect(formatOptionalDate(int64)).toBe(undefined);
	});

	it('returns date string given a valid Int64', () => {
		const date = 1614000379674;
		const int64 = new Int64(date);
		expect(formatOptionalDate(int64)).toBe('Mon Feb 22 2021');
	});
});

describe('parseAtom', () => {
	let docFragment: DocumentFragment;
	let docParser: DocParser;
	let blockElement: BlockElement;

	beforeEach(() => {
		docFragment = document.createDocumentFragment();
		docParser = (html: string) => docFragment;
		blockElement = {
			type: ElementType.CONTENTATOM,
			assets: [],
		};
	});

	it('returns an error if the atom has no data', () => {
		expect(parseAtom(blockElement, {}, docParser)).toEqual(
			err('The atom has no data'),
		);
	});
});
