/**
 * @jest-environment jsdom
 */

import { Atoms } from '@guardian/content-api-models/v1/atoms';
import { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { ElementType } from '@guardian/content-api-models/v1/elementType';
import { Atom } from '@guardian/content-atom-model/atom';
import { AtomType } from '@guardian/content-atom-model/atomType';
import { AudioAtom } from '@guardian/content-atom-model/audio/audioAtom';
import { ChartAtom } from '@guardian/content-atom-model/chart/chartAtom';
import { ContentChangeDetails } from '@guardian/content-atom-model/contentChangeDetails';
import { ExplainerAtom } from '@guardian/content-atom-model/explainer/explainerAtom';
import { GuideAtom } from '@guardian/content-atom-model/guide/guideAtom';
import { GuideItem } from '@guardian/content-atom-model/guide/guideItem';
import { AssetType } from '@guardian/content-atom-model/media/assetType';
import { Category } from '@guardian/content-atom-model/media/category';
import { MediaAtom } from '@guardian/content-atom-model/media/mediaAtom';
import { Platform } from '@guardian/content-atom-model/media/platform';
import { ProfileAtom } from '@guardian/content-atom-model/profile/profileAtom';
import { ProfileItem } from '@guardian/content-atom-model/profile/profileItem';
import { QAndAAtom } from '@guardian/content-atom-model/qanda/qAndAAtom';
import { QAndAItem } from '@guardian/content-atom-model/qanda/qAndAItem';
import { QuizAtom } from '@guardian/content-atom-model/quiz/quizAtom';
import { TimelineAtom } from '@guardian/content-atom-model/timeline/timelineAtom';
import { TimelineItem } from '@guardian/content-atom-model/timeline/timelineItem';
import { fromNullable, some } from '../vendor/@guardian/types/index';
import { ElementKind } from 'bodyElement';
import { atomScript } from 'components/InteractiveAtom';
import { Int64 } from 'thrift';
import { DocParser } from 'parserContext';
import { Result } from 'result';
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
			Result.err('The atom has no data'),
		);
	});

	it('returns an error if atom type not supported', () => {
		let unsupportedAtomType = 'unsupported type';
		blockElement.contentAtomTypeData = {
			atomId: atomId,
			atomType: unsupportedAtomType,
		};
		expect(parseAtom(blockElement, {}, docParser)).toEqual(
			Result.err(`Atom type not supported: ${unsupportedAtomType}`),
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
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if there's not atom content`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No content for atom: ${atomId}`),
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
				Result.ok({
					kind: ElementKind.InteractiveAtom,
					html,
					css,
					js: fromNullable(js),
				}),
			);
		});

		it('returns SpecialReportAltAtom element if atom has correct id', () => {
			const element = {
				type: ElementType.CONTENTATOM,
				assets: [],
				contentAtomTypeData: {
					atomId: 'interactives/2022/10/tr/default-about-the-series',
					atomType: 'interactive',
				},
			};

			expect(parseAtom(element, atoms, docParser)).toEqual(
				Result.ok({ kind: ElementKind.SpecialReportAltAtom }),
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
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no guide title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns GuideAtom result type given the correct guide`, () => {
			guide.title = 'guide title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
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
				Result.ok({
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
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no guide title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns GuideAtom result type given the correct guide`, () => {
			qanda.title = 'qanda title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
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
				Result.ok({
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
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no profile title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`returns ProfileAtom result type given the correct profile`, () => {
			profile.title = 'profile title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
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
				Result.ok({
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
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no chart title or defaultHtml`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title or defaultHtml for atom: ${atomId}`),
			);
		});

		it('parses', () => {
			chart.title = 'chart title';
			chart.defaultHtml = 'some default html';

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
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
				Result.ok({
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

	describe('timeline', () => {
		let atoms: Atoms;
		let timeline: Atom;
		let timelineItem: TimelineItem;
		let timelineAtom: TimelineAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'timeline',
			};
			timelineItem = {
				title: 'timeline title',
				date: new Int64(1),
			};
			timelineAtom = {
				events: [timelineItem],
				description: 'timeline description',
			};
			timeline = {
				id: atomId,
				title: '',
				atomType: AtomType.TIMELINE,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'timeline',
					timeline: timelineAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				timelines: [timeline],
			};
		});

		it(`returns an error if no timeline atom id matches`, () => {
			timeline.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no timeline title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title for atom: ${atomId}`),
			);
		});

		it(`returns an error of the timeline event date is not valid`, () => {
			timeline.title = 'timeline title';
			timelineItem.body = 'timeline item body';
			timelineItem.date = new Int64('123456789abcdef0');
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`Invalid date in timeline atom`),
			);
		});

		it(`parses timeline atom correctly`, () => {
			timeline.title = 'timeline title';
			timelineItem.body = 'timeline item body';
			timelineItem.date = new Int64(1);
			timelineItem.toDate = new Int64(1614157023336);

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
					kind: ElementKind.TimelineAtom,
					title: 'timeline title',
					id: atomId,
					events: [
						{
							body: 'timeline item body',
							date: 'Thu Jan 01 1970',
							title: 'timeline title',
							toDate: 'Wed Feb 24 2021',
							unixDate: 1,
						},
					],
					description: 'timeline description',
				}),
			);
		});
	});

	describe('explainer', () => {
		let atoms: Atoms;
		let explainer: Atom;
		let explainerAtom: ExplainerAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'explainer',
			};
			explainerAtom = {
				title: '',
				body: '',
				displayType: 0,
			};
			explainer = {
				id: atomId,
				title: '',
				atomType: AtomType.EXPLAINER,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'explainer',
					explainer: explainerAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				explainers: [explainer],
			};
		});

		it(`returns an error if no explainer atom id matches`, () => {
			explainer.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error if no explainer title or body`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title or body for atom: ${atomId}`),
			);
		});

		it(`parses explainer atom correctly`, () => {
			explainerAtom.title = 'explainer title';
			explainerAtom.body = 'explainer body';

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
					kind: ElementKind.ExplainerAtom,
					html: 'explainer body',
					title: 'explainer title',
					id: atomId,
				}),
			);
		});
	});

	describe('media', () => {
		let atoms: Atoms;
		let media: Atom;
		let mediaAtom: MediaAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'media',
			};
			mediaAtom = {
				title: '',
				assets: [
					{
						assetType: AssetType.VIDEO,
						id: 'asset-id',
						version: new Int64(1),
						platform: Platform.YOUTUBE,
					},
				],
				category: Category.NEWS,
				posterUrl: 'poster-url',
				duration: new Int64(1000),
				activeVersion: new Int64(1),
			};
			media = {
				id: atomId,
				title: '',
				atomType: AtomType.MEDIA,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'media',
					media: mediaAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				media: [media],
			};
		});

		it(`returns an error if no media atom id matches`, () => {
			media.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error given no poster url`, () => {
			mediaAtom.posterUrl = '';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No posterUrl for atom: ${atomId}`),
			);
		});

		it(`returns an error given no video id`, () => {
			mediaAtom.activeVersion = new Int64(42);
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No videoId for atom: ${atomId}`),
			);
		});

		it(`parses media atom correctly`, () => {
			const frag = document.createDocumentFragment();
			const el = document.createElement('h1');
			el.appendChild(document.createTextNode('media title'));
			frag.appendChild(el);
			docParser = jest.fn(() => frag);

			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
					kind: ElementKind.MediaAtom,
					posterUrl: 'poster-url',
					caption: some(frag),
					duration: some(1000),
					videoId: 'asset-id',
					id: atomId,
					title: '',
				}),
			);
		});
	});

	describe('audio', () => {
		let atoms: Atoms;
		let audio: Atom;
		let audioAtom: AudioAtom;

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'audio',
			};
			audioAtom = {
				kicker: 'audio-kickcer',
				coverUrl: 'cover-url',
				trackUrl: 'track-url',
				duration: 1000,
				contentId: 'content-id',
			};
			audio = {
				id: atomId,
				title: '',
				atomType: AtomType.AUDIO,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'audio',
					audio: audioAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				audios: [audio],
			};
		});

		it(`returns an error if no audio atom id matches`, () => {
			audio.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error given no audio title`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No title for audio atom with id: ${atomId}`),
			);
		});

		it(`parses audio atom correctly`, () => {
			audio.title = 'audio title';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
					kind: ElementKind.AudioAtom,
					id: 'atom-id',
					kicker: 'audio-kickcer',
					title: 'audio title',
					trackUrl: 'track-url',
				}),
			);
		});
	});

	describe('quiz', () => {
		let atoms: Atoms;
		let quiz: Atom;
		let quizAtom: QuizAtom;
		let answerMock = {
			answerText: 'answer text',
			assets: [],
			weight: 1,
			id: 'answer-id',
		};
		let questionsMock = [
			{
				questionText: 'question text',
				assets: [],
				answers: [answerMock],
				id: 'question-id',
			},
		];

		beforeEach(() => {
			blockElement.contentAtomTypeData = {
				atomId: atomId,
				atomType: 'quiz',
			};
			quizAtom = {
				id: 'quiz-id',
				title: 'quiz title',
				revealAtEnd: true,
				published: true,
				content: {
					questions: questionsMock,
				},
				quizType: 'knowledge',
			};
			quiz = {
				id: atomId,
				title: '',
				atomType: AtomType.AUDIO,
				labels: [],
				defaultHtml: '',
				data: {
					kind: 'quiz',
					quiz: quizAtom,
				},
				contentChangeDetails: {} as ContentChangeDetails,
				commissioningDesks: [],
			};
			atoms = {
				quizzes: [quiz],
			};
		});

		it(`returns an error if no quiz atom id matches`, () => {
			quiz.data.kind = 'interactive';
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No atom matched this id: ${atomId}`),
			);
		});

		it(`returns an error of quiz atom has no content`, () => {
			quizAtom.content.questions = [];
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.err(`No content for atom: ${atomId}`),
			);
		});

		it(`parses knowledge quiz atom correctly`, () => {
			expect(parseAtom(blockElement, atoms, docParser)).toEqual(
				Result.ok({
					kind: ElementKind.KnowledgeQuizAtom,
					id: atomId,
					questions: [
						{
							text: 'question text',
							...questionsMock[0],
							answers: [
								{
									answerBuckets: [],
									id: answerMock.id,
									isCorrect: true,
									text: 'answer text',
								},
							],
						},
					],
					resultGroups: [],
				}),
			);
		});
	});
});
