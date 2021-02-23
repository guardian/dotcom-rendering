import { Atoms } from '@guardian/content-api-models/v1/atoms';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { Atom } from '@guardian/content-atom-model/atom';
import { AtomType } from '@guardian/content-atom-model/atomType';
import { ContentChangeDetails } from '@guardian/content-atom-model/contentChangeDetails';
import { err, fromNullable, ok } from '@guardian/types';
import { ElementKind } from 'bodyElement';
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
	let atomId: string;

	beforeEach(() => {
		atomId = 'atom-id';
		docFragment = document.createDocumentFragment();
		docParser = (html: string) => docFragment;
		blockElement = {
			type: ElementType.CONTENTATOM,
			assets: [],
			contentAtomTypeData: {
				atomId: atomId,
				atomType: 'interactive',
			},
		};
	});

	it('returns an error if the atom has no data', () => {
		blockElement.contentAtomTypeData = undefined;
		expect(parseAtom(blockElement, {}, docParser)).toEqual(
			err('The atom has no data'),
		);
	});

	describe('interactives', () => {
		let atoms: Atoms;
		let interactive: Atom;

		beforeEach(() => {
			interactive = {
				id: atomId,
				atomType: AtomType.INTERACTIVE,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'interactive',
					interactive: {
						type: 'interactive',
						title: '',
						css: '',
						html: '',
					},
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				interactives: [interactive],
			};
		});

		it(`returns an error if no interactive atom id matches`, () => {
			atoms.interactives = [];

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if there's not atom content`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No content for atom: ${atomId}`),
			);
		});

		it('returns InteractiveAtom result type given the correct args', () => {
			// (atoms.interactives as Atom[])[0]["data"] as .interactive
			const atomsWithData = { ...atoms };
			const css = 'css';
			const html = 'html';
			const js = 'js';
			const interactiveWithData: Atom = {
				...interactive,
				data: {
					kind: 'interactive',
					interactive: {
						type: 'interactive',
						title: '',
						css,
						html,
						mainJS: js,
					},
				},
			};
			atomsWithData.interactives = [interactiveWithData];

			expect(parseAtom(blockElement, atomsWithData, docParser)).toEqual(
				ok({
					kind: ElementKind.InteractiveAtom,
					html,
					css,
					js: fromNullable(js),
				}),
			);
		});
	});
});
