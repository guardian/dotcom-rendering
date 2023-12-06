import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { fromNullable } from '../vendor/@guardian/types/index';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { atomScript } from 'components/InteractiveAtom';
import { isValidDate } from 'date';
import type Int64 from 'node-int64';
import type { DocParser } from 'parserContext';
import { Result } from 'result';

interface TimelineEvent {
	title: string;
	date: string;
	unixDate: number;
	body?: string;
	toDate?: string;
	toUnixDate?: number;
}

function formatOptionalDate(date: Int64 | undefined): string | undefined {
	if (date === undefined) return undefined;
	const d = new Date(date.toNumber());
	if (!isValidDate(d)) return undefined;
	return d.toDateString();
}

function parseAtom(
	element: BlockElement,
	atoms: Atoms,
	docParser: DocParser,
): Result<string, BodyElement> {
	if (element.contentAtomTypeData === undefined) {
		return Result.err('The atom has no data');
	}

	const id = element.contentAtomTypeData.atomId;

	if (id === 'interactives/2022/10/tr/default-about-the-series') {
		return Result.ok({ kind: ElementKind.SpecialReportAltAtom });
	}

	switch (element.contentAtomTypeData.atomType) {
		case 'interactive': {
			const atom = atoms.interactives?.find(
				(interactive) => interactive.id === id,
			);

			if (atom?.data.kind !== 'interactive') {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { html, css, mainJS: js } = atom.data.interactive;

			if (!html && !css && !js) {
				return Result.err(`No content for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.InteractiveAtom,
				html,
				css,
				js: fromNullable(js),
			});
		}

		case 'guide': {
			const atom = atoms.guides?.find((guide) => guide.id === id);

			if (atom?.data.kind !== 'guide' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const image = atom.data.guide.guideImage?.master?.file;
			const credit = atom.data.guide.guideImage?.master?.credit;
			const { body } = atom.data.guide.items[0];

			if (!title || !body) {
				return Result.err(`No title or body for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.GuideAtom,
				html: body,
				title,
				id,
				image,
				credit,
			});
		}

		case 'qanda': {
			const atom = atoms.qandas?.find((qanda) => qanda.id === id);

			if (atom?.data.kind !== 'qanda' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const { body } = atom.data.qanda.item;
			const image = atom.data.qanda.eventImage?.master?.file;
			const credit = atom.data.qanda.eventImage?.master?.credit;

			if (!title || !body) {
				return Result.err(`No title or body for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.QandaAtom,
				html: body,
				title,
				id,
				image,
				credit,
			});
		}

		case 'profile': {
			const atom = atoms.profiles?.find((profile) => profile.id === id);

			if (atom?.data.kind !== 'profile' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const { body } = atom.data.profile.items[0];
			const image = atom.data.profile.headshot?.master?.file;
			const credit = atom.data.profile.headshot?.master?.credit;

			if (!title || !body) {
				return Result.err(`No title or body for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.ProfileAtom,
				html: body,
				title,
				id,
				image,
				credit,
			});
		}

		case 'chart': {
			const atom = atoms.charts?.find((chart) => chart.id === id);

			if (atom?.data.kind !== 'chart' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title, defaultHtml } = atom;

			if (!title || !defaultHtml) {
				return Result.err(`No title or defaultHtml for atom: ${id}`);
			}

			const doc = docParser(defaultHtml);
			const styles = Array.from(doc.querySelectorAll('style')).map(
				(style) => style.innerHTML,
			);

			const inlineStyles = Array.from(
				doc.querySelectorAll('[style]'),
			).map((element) => (element as HTMLElement).style.cssText);

			const js = Array.from(doc.querySelectorAll('script')).map(
				(script) => script.innerHTML,
			);

			return Result.ok({
				kind: ElementKind.ChartAtom,
				title,
				id,
				html: defaultHtml + `<script>${atomScript}</script>`,
				css: [...styles, ...inlineStyles],
				js,
			});
		}

		case 'timeline': {
			const atom = atoms.timelines?.find(
				(timeline) => timeline.id === id,
			);

			if (atom?.data.kind !== 'timeline' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;

			const events: TimelineEvent[] = atom.data.timeline.events.map(
				(event) => ({
					title: event.title,
					date: formatOptionalDate(event.date) ?? '',
					body: event.body,
					toDate: formatOptionalDate(event.toDate),
					unixDate: event.date.toNumber(),
				}),
			);

			const description = atom.data.timeline.description;

			if (!title) {
				return Result.err(`No title for atom: ${id}`);
			}

			if (events.some((event) => event.date === '')) {
				return Result.err('Invalid date in timeline atom');
			}

			return Result.ok({
				kind: ElementKind.TimelineAtom,
				title,
				id,
				events,
				description,
			});
		}

		case 'explainer': {
			const atom = atoms.explainers?.find(
				(explainer) => explainer.id === id,
			);

			if (atom?.data.kind !== 'explainer' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { title, body } = atom.data.explainer;

			if (!title || !body) {
				return Result.err(`No title or body for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.ExplainerAtom,
				html: body,
				title,
				id,
			});
		}

		case 'media': {
			const atom = atoms.media?.find((media) => media.id === id);

			if (atom?.data.kind !== 'media') {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { posterUrl, duration, assets, activeVersion, title } =
				atom.data.media;
			const videoId = assets.find(
				(asset) =>
					asset.version.toNumber() === activeVersion?.toNumber(),
			)?.id;
			const caption = docParser(title);
			if (!posterUrl) {
				return Result.err(`No posterUrl for atom: ${id}`);
			}

			if (!videoId) {
				return Result.err(`No videoId for atom: ${id}`);
			}

			return Result.ok({
				kind: ElementKind.MediaAtom,
				id,
				posterUrl,
				videoId,
				title,
				duration: fromNullable(duration?.toNumber()),
				caption: fromNullable(caption),
			});
		}

		case 'audio': {
			const atom = atoms.audios?.find((audio) => audio.id === id);

			if (atom?.data.kind !== 'audio') {
				return Result.err(`No atom matched this id: ${id}`);
			}
			const { id: audioId, title } = atom;
			const { kicker, trackUrl } = atom.data.audio;

			if (!title) {
				return Result.err(
					`No title for audio atom with id: ${audioId}`,
				);
			}

			return Result.ok({
				kind: ElementKind.AudioAtom,
				id: audioId,
				trackUrl,
				kicker,
				title,
			});
		}

		case 'quiz': {
			const atom = atoms.quizzes?.find((quiz) => quiz.id === id);
			if (atom?.data.kind !== 'quiz' || !id) {
				return Result.err(`No atom matched this id: ${id}`);
			}

			const { content } = atom.data.quiz;

			if (content.questions.length === 0) {
				return Result.err(`No content for atom: ${id}`);
			}

			const questions = content.questions.map((question) => {
				return {
					text: question.questionText,
					...question,
					/* TODO: imageUrl & imageAlt should be set here,
						by parsing question.assets[x].data */
					answers: question.answers.map((answer) => {
						return {
							id: answer.id,
							text: answer.answerText,
							isCorrect: !!answer.weight,
							answerBuckets: answer.bucket ?? [],
						};
					}),
				};
			});

			if (atom.data.quiz.quizType === 'knowledge') {
				return Result.ok({
					kind: ElementKind.KnowledgeQuizAtom,
					id,
					questions,
					resultGroups:
						atom.data.quiz.content.resultGroups?.groups.map(
							(group) => ({
								...group,
								shareText: group.share,
							}),
						) ?? [],
				});
			}

			if (atom.data.quiz.quizType === 'personality') {
				return Result.ok({
					kind: ElementKind.PersonalityQuizAtom,
					id,
					questions,
					resultBuckets:
						atom.data.quiz.content.resultBuckets?.buckets ?? [],
				});
			}

			return Result.err(
				`Atom quizType '${atom.data.quiz.quizType}' is not supported.`,
			);
		}

		default: {
			return Result.err(
				`Atom type not supported: ${element.contentAtomTypeData.atomType}`,
			);
		}
	}
}

export type { TimelineEvent };

export { parseAtom, formatOptionalDate };
