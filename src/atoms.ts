import type { TimelineEvent } from '@guardian/atoms-rendering/dist/types';
import type { Atoms } from '@guardian/content-api-models/v1/atoms';
import type { BlockElement } from '@guardian/content-api-models/v1/blockElement';
import { err, fromNullable, ok } from '@guardian/types';
import type { Result } from '@guardian/types';
import type { BodyElement } from 'bodyElement';
import { ElementKind } from 'bodyElement';
import { atomScript } from 'components/atoms/interactiveAtom';
import { isValidDate } from 'date';
import type Int64 from 'node-int64';
import type { DocParser } from 'types/parserContext';

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
		return err('The atom has no data');
	}

	const id = element.contentAtomTypeData.atomId;

	switch (element.contentAtomTypeData.atomType) {
		case 'interactive': {
			const atom = atoms.interactives?.find(
				(interactive) => interactive.id === id,
			);

			if (atom?.data.kind !== 'interactive') {
				return err(`No atom matched this id: ${id}`);
			}

			const { html, css, mainJS: js } = atom.data.interactive;

			if (!html && !css && !js) {
				return err(`No content for atom: ${id}`);
			}

			return ok({
				kind: ElementKind.InteractiveAtom,
				html,
				css,
				js: fromNullable(js),
			});
		}

		case 'guide': {
			const atom = atoms.guides?.find((guide) => guide.id === id);

			if (atom?.data.kind !== 'guide' || !id) {
				return err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const image = atom.data.guide.guideImage?.master?.file;
			const credit = atom.data.guide.guideImage?.master?.credit;
			const { body } = atom.data.guide.items[0];

			if (!title || !body) {
				return err(`No title or body for atom: ${id}`);
			}

			return ok({
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
				return err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const { body } = atom.data.qanda.item;
			const image = atom.data.qanda.eventImage?.master?.file;
			const credit = atom.data.qanda.eventImage?.master?.credit;

			if (!title || !body) {
				return err(`No title or body for atom: ${id}`);
			}

			return ok({
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
				return err(`No atom matched this id: ${id}`);
			}

			const { title } = atom;
			const { body } = atom.data.profile.items[0];
			const image = atom.data.profile.headshot?.master?.file;
			const credit = atom.data.profile.headshot?.master?.credit;

			if (!title || !body) {
				return err(`No title or body for atom: ${id}`);
			}

			return ok({
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
				return err(`No atom matched this id: ${id}`);
			}

			const { title, defaultHtml } = atom;

			if (!title || !defaultHtml) {
				return err(`No title or defaultHtml for atom: ${id}`);
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

			return ok({
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
				return err(`No atom matched this id: ${id}`);
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

			if (!title || events.length === 0) {
				return err(`No title or body for atom: ${id}`);
			}

			if (events.some((event) => event.date === '')) {
				return err('Invalid date in timeline atom');
			}

			return ok({
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
				return err(`No atom matched this id: ${id}`);
			}

			const { title, body } = atom.data.explainer;

			if (!title || !body) {
				return err(`No title or body for atom: ${id}`);
			}

			return ok({
				kind: ElementKind.ExplainerAtom,
				html: body,
				title,
				id,
			});
		}

		case 'media': {
			const atom = atoms.media?.find((media) => media.id === id);

			if (atom?.data.kind !== 'media') {
				return err(`No atom matched this id: ${id}`);
			}

			const {
				posterUrl,
				duration,
				assets,
				activeVersion,
				title,
			} = atom.data.media;
			const videoId = assets.find(
				(asset) =>
					asset.version.toNumber() === activeVersion?.toNumber(),
			)?.id;
			const caption = docParser(title);
			if (!posterUrl) {
				return err(`No posterUrl for atom: ${id}`);
			}

			if (!videoId) {
				return err(`No videoId for atom: ${id}`);
			}

			return ok({
				kind: ElementKind.MediaAtom,
				posterUrl,
				videoId,
				duration: fromNullable(duration?.toNumber()),
				caption: fromNullable(caption),
			});
		}

		case 'audio': {
			const atom = atoms.audios?.find((audio) => audio.id === id);

			if (atom?.data.kind !== 'audio') {
				return err(`No atom matched this id: ${id}`);
			}
			const { id: audioId, title } = atom;
			const { kicker, trackUrl } = atom.data.audio;

			if (!title) {
				return err(`No title for audio atom with id: ${audioId}`);
			}

			return ok({
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
				return err(`No atom matched this id: ${id}`);
			}

			const { content } = atom.data.quiz;

			if (content.questions.length === 0) {
				return err(`No content for atom: ${id}`);
			}

			const questions = content.questions.map((question) => {
				return {
					text: question.questionText,
					...question,
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
				return ok({
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
				return ok({
					kind: ElementKind.PersonalityQuizAtom,
					id,
					questions,
					resultBuckets:
						atom.data.quiz.content.resultBuckets?.buckets ?? [],
				});
			}

			return err(
				`Atom quizType '${atom.data.quiz.quizType}' is not supported.`,
			);
		}

		default: {
			return err(
				`Atom type not supported: ${element.contentAtomTypeData.atomType}`,
			);
		}
	}
}

export { parseAtom, formatOptionalDate };
