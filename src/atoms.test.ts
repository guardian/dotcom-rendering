import { Atoms } from '@guardian/content-api-models/v1/atoms';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { Atom } from '@guardian/content-atom-model/atom';
import { AtomType } from '@guardian/content-atom-model/atomType';
import { ChartAtom } from '@guardian/content-atom-model/chart/chartAtom';
import { ContentChangeDetails } from '@guardian/content-atom-model/contentChangeDetails';
import { GuideAtom } from '@guardian/content-atom-model/guide/guideAtom';
import { GuideItem } from '@guardian/content-atom-model/guide/guideItem';
import { ProfileAtom } from '@guardian/content-atom-model/profile/profileAtom';
import { ProfileItem } from '@guardian/content-atom-model/profile/profileItem';
import { QAndAAtom } from '@guardian/content-atom-model/qanda/qAndAAtom';
import { QAndAItem } from '@guardian/content-atom-model/qanda/qAndAItem';
import { err, fromNullable, ok } from '@guardian/types';
import { ElementKind } from 'bodyElement';
import { atomScript } from 'components/atoms/interactiveAtom';
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

	describe('guide', () => {
		let atoms: Atoms;
		let guide: Atom;
		let guideItem: GuideItem;
		let guideAtom: GuideAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'guide',
			};
			guideItem = {
				title: 'guide title',
				body: 'guide body',
				entities: [],
			};
			guideAtom = {
				items: [guideItem],
			};
			guide = {
				id: atomId,
				title: '',
				atomType: AtomType.GUIDE,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'guide',
					guide: guideAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				guides: [guide],
			};
		});

		it(`returns an error if no guide atom id matches`, () => {
			guide.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no guide title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns GuideAtom result type given the correct guide`, () => {
			guide.title = 'guide title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.GuideAtom,
					html: 'guide body',
					title: guide.title,
					id: atomId,
					image: undefined,
					credit: undefined,
				}),
			);

			guideAtom.guideImage = {
				master: { file: 'image-file', credit: 'credit' },
				assets: [],
				mediaId: 'media-id',
			};

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.GuideAtom,
					html: 'guide body',
					title: guide.title,
					id: atomId,
					image: 'image-file',
					credit: 'credit',
				}),
			);
		});
	});

	describe('qanda', () => {
		let atoms: Atoms;
		let qanda: Atom;
		let qandaItem: QAndAItem;
		let qandaAtom: QAndAAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'qanda',
			};
			qandaItem = {
				title: 'qanda title',
				body: 'qanda body',
			};
			qandaAtom = {
				item: qandaItem,
			};
			qanda = {
				id: atomId,
				title: '',
				atomType: AtomType.QANDA,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'qanda',
					qanda: qandaAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				qandas: [qanda],
			};
		});

		it(`returns an error if no guide atom id matches`, () => {
			qanda.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no guide title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns GuideAtom result type given the correct guide`, () => {
			qanda.title = 'qanda title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.QandaAtom,
					html: 'qanda body',
					title: qanda.title,
					id: atomId,
					image: undefined,
					credit: undefined,
				}),
			);

			qandaAtom.eventImage = {
				master: { file: 'image-file', credit: 'credit' },
				assets: [],
				mediaId: 'media-id',
			};

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.QandaAtom,
					html: 'qanda body',
					id: atomId,
					image: 'image-file',
					credit: 'credit',
					title: qanda.title,
				}),
			);
		});
	});

	describe('profile', () => {
		let atoms: Atoms;
		let profile: Atom;
		let profileItem: ProfileItem;
		let profileAtom: ProfileAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'profile',
			};
			profileItem = {
				title: 'profile title',
				body: 'profile body',
			};
			profileAtom = {
				items: [profileItem],
			};
			profile = {
				id: atomId,
				title: '',
				atomType: AtomType.PROFILE,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'profile',
					profile: profileAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				profiles: [profile],
			};
		});

		it(`returns an error if no profile atom id matches`, () => {
			profile.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no profile title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns ProfileAtom result type given the correct profile`, () => {
			profile.title = 'profile title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.ProfileAtom,
					html: 'profile body',
					title: profile.title,
					id: atomId,
					image: undefined,
					credit: undefined,
				}),
			);

			profileAtom.headshot = {
				master: { file: 'image-file', credit: 'credit' },
				assets: [],
				mediaId: 'media-id',
			};

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.ProfileAtom,
					html: 'profile body',
					id: atomId,
					image: 'image-file',
					credit: 'credit',
					title: profile.title,
				}),
			);
		});
	});

	describe('chart', () => {
		let atoms: Atoms;
		let chart: Atom;
		let chartAtom: ChartAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'chart',
			};
			chart = {
				id: atomId,
				title: '',
				atomType: AtomType.PROFILE,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'chart',
					chart: chartAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				charts: [chart],
			};
		});

		it(`returns an error if no chart atom id matches`, () => {
			chart.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no chart title or defaultHtml`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				err(`No title or defaultHtml for atom: ${atomId}`),
			);
		});

		it('parses', () => {
			chart.title = 'chart title';
			chart.defaultHtml = 'some default html';

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.ChartAtom,
					title: 'chart title',
					id: atomId,
					html: `some default html<script>${atomScript}</script>`,
					css: [],
					js: [],
				}),
			);

			const frag = document.createDocumentFragment();
			const css = `some css`;
			const inlineCss = `display: inline;`;
			const js = `some javascript`;
			const styleEl = document.createElement('style');
			const jsEl = document.createElement('script');
			const el = document.createElement('div');
			el.setAttribute('style', inlineCss);
			styleEl.append(document.createTextNode(css));
			jsEl.append(document.createTextNode(js));
			frag.appendChild(el);
			frag.appendChild(styleEl);
			frag.appendChild(jsEl);

			docParser = jest.fn(() => frag);

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				ok({
					kind: ElementKind.ChartAtom,
					title: 'chart title',
					id: atomId,
					html: `some default html<script>${atomScript}</script>`,
					css: [css, inlineCss],
					js: [js],
				}),
			);
		});
	});
});
