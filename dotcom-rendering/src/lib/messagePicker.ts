import { startPerformanceMeasure } from '@guardian/libs';
import { getOphan } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

export type MaybeFC = React.FC | null;
type ShowMessage<T> = (meta: T) => MaybeFC;

interface ShouldShow<T> {
	show: true;
	meta: T;
}
interface ShouldNotShow {
	show: false;
}
export type CanShowResult<T> = ShouldShow<T> | ShouldNotShow;

type Candidate<T> = {
	id: string;
	show: ShowMessage<T>;
	canShow: () => Promise<CanShowResult<T>>;
};

export type CandidateConfig<T> = {
	candidate: Candidate<T>;
	timeoutMillis: number | null;
	reportTiming?: boolean;
};

type CandidateConfigWithTimeout<T> = CandidateConfig<T> & {
	cancelTimeout: () => void;
};

export type SlotConfig = {
	candidates: CandidateConfig<any>[];
	name: string;
};

const recordMessageTimeoutInOphan = async (
	candidateId: string,
	slotName: string,
	renderingTarget: RenderingTarget,
) => {
	const ophan = await getOphan(renderingTarget);
	ophan.record({
		// @ts-expect-error -- Type 'string' is not assignable to type 'ComponentV2'.
		// the relevant team should remove this call as it is dropped by Ophan
		// see https://github.com/guardian/dotcom-rendering/pull/11438 further context
		component: `${slotName}-picker-timeout-dcr`,
		value: candidateId,
	});
};

const timeoutify = <T>(
	candidateConfig: CandidateConfig<T>,
	slotName: string,
	renderingTarget: RenderingTarget,
): CandidateConfigWithTimeout<T> => {
	let timer: number | undefined;

	const canShow = (): Promise<CanShowResult<T>> =>
		new Promise((resolve) => {
			const perfName = `messagePicker-canShow-${candidateConfig.candidate.id}`;
			const { endPerformanceMeasure } = startPerformanceMeasure(
				'tx',
				perfName,
			);

			if (candidateConfig.timeoutMillis !== null) {
				timer = window.setTimeout(() => {
					void recordMessageTimeoutInOphan(
						candidateConfig.candidate.id,
						slotName,
						renderingTarget,
					);
					resolve({ show: false });
				}, candidateConfig.timeoutMillis);
			}

			candidateConfig.candidate
				.canShow()
				.then((result) => {
					resolve(result);

					const canShowTimeTaken = endPerformanceMeasure();

					if (candidateConfig.reportTiming) {
						void getOphan(renderingTarget).then((ophan) => {
							ophan.record({
								// @ts-expect-error -- the relevant team should remove this call as it is dropped by Ophan
								// see https://github.com/guardian/dotcom-rendering/pull/11438 further context
								component: perfName,
								value: canShowTimeTaken,
							});
						});
					}
				})
				.catch((e) =>
					console.error(`timeoutify candidate - error: ${String(e)}`),
				);
		});

	const cancelTimeout = () => timer !== undefined && clearTimeout(timer);

	return {
		...candidateConfig,
		candidate: {
			...candidateConfig.candidate,
			canShow,
		},
		cancelTimeout,
	};
};

const clearAllTimeouts = (messages: CandidateConfigWithTimeout<any>[]) =>
	messages.map((m) => m.cancelTimeout());

const defaultShow = () => null;

interface PendingMessage<T> {
	candidateConfig: CandidateConfigWithTimeout<T>;
	canShow: Promise<CanShowResult<T>>;
}

interface WinningMessage<T> {
	meta: T;
	candidate: Candidate<T>;
}

export const pickMessage = (
	{ candidates, name }: SlotConfig,
	renderingTarget: RenderingTarget,
): Promise<() => MaybeFC> =>
	new Promise((resolve) => {
		const candidateConfigsWithTimeout = candidates.map((c) =>
			timeoutify(c, name, renderingTarget),
		);
		const results: PendingMessage<any>[] = candidateConfigsWithTimeout.map(
			(candidateConfig) => ({
				candidateConfig,
				canShow: candidateConfig.candidate.canShow(),
			}),
		);

		const winnerResult = results.reduce<
			Promise<WinningMessage<any> | null>
		>(async (winningMessageSoFar, { candidateConfig, canShow }) => {
			if (await winningMessageSoFar) {
				return winningMessageSoFar;
			}

			const result = await canShow;
			candidateConfig.cancelTimeout();
			if (result.show) {
				return {
					candidate: candidateConfig.candidate,
					meta: result.meta,
				};
			}

			return winningMessageSoFar;
		}, Promise.resolve(null));

		winnerResult
			.then((winner) => {
				clearAllTimeouts(candidateConfigsWithTimeout);

				if (winner === null) {
					resolve(defaultShow);
				} else {
					const { candidate, meta } = winner;
					resolve(() => candidate.show(meta));
				}
			})
			.catch((e) =>
				console.error(`pickMessage winner - error: ${String(e)}`),
			);
	});
