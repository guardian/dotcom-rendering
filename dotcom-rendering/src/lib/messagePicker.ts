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

	const canShow = (): Promise<CanShowResult<T>> => {
		return new Promise((resolve) => {
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
					cancelTimeout();
					resolve({ show: false });
				}, candidateConfig.timeoutMillis);
			}

			try {
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
					.catch((e) => {
						console.error(
							`timeoutify candidate - error: ${String(e)}`,
						);
						resolve({ show: false });
					})
					.finally(() => {
						cancelTimeout();
					});
			} catch (error) {
				console.error(`timeoutify candidate - error: ${String(error)}`);
				cancelTimeout();
				resolve({ show: false });
			}
		});
	};

	const cancelTimeout = () => {
		if (timer !== undefined) {
			clearTimeout(timer);
			timer = undefined;
		}
	};

	return {
		...candidateConfig,
		candidate: {
			...candidateConfig.candidate,
			canShow,
		},
		cancelTimeout,
	};
};

const clearAllTimeouts = (
	candidateConfigs: CandidateConfigWithTimeout<any>[],
) => {
	for (const config of candidateConfigs) {
		config.cancelTimeout();
	}
};

const defaultShow = () => null;

/**
 * Sequential message picker that respects priority order.
 *
 * This processes candidates one by one in the order they appear in the array,
 * ensuring that higher priority messages are always checked first.
 */
export async function pickMessage(
	{ candidates, name }: SlotConfig,
	renderingTarget: RenderingTarget,
): Promise<() => MaybeFC> {
	const candidateConfigsWithTimeout = candidates.map((c) =>
		timeoutify(c, name, renderingTarget),
	);

	try {
		for (const config of candidateConfigsWithTimeout) {
			try {
				const result = await config.candidate.canShow();
				config.cancelTimeout();

				if (result.show) {
					clearAllTimeouts(candidateConfigsWithTimeout);
					const { candidate } = config;
					return () => candidate.show(result.meta);
				}
			} catch (error) {
				if (error instanceof Error) {
					window.guardian.modules.sentry.reportError(
						error,
						`pickMessage: error checking ${config.candidate.id}`,
					);
				}

				config.cancelTimeout();
			}
		}

		return defaultShow;
	} catch (fatal) {
		if (fatal instanceof Error) {
			window.guardian.modules.sentry.reportError(
				fatal,
				`pickMessage: fatal error`,
			);
		}
		clearAllTimeouts(candidateConfigsWithTimeout);
		return defaultShow;
	}
}
