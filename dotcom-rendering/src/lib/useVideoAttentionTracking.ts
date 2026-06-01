import { useEffect, useRef } from 'react';
import { getOphan } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

/**
 * How often attention time is reported to Ophan, matching the interval used
 * by ophan-tracker-js internally.
 */
const REPORTING_INTERVAL_MS = 10_000;

/**
 * Tracks incremental video attention time whilst the video is both visible
 * in the viewport and actively playing.
 *
 * Emulates the component attention tracking behaviour of ophan-tracker-js
 * (`components.js` / `attention.js`), but managed within React so that
 * attention is only accumulated when the video is playing — not merely when
 * it is in view.
 *
 * Attention time is reported periodically via `ophan.record` using the same
 * `componentAttentionMs` payload format as ophan-tracker-js.
 *
 * @param componentName - The component name key used in the `componentAttentionMs` payload.
 *   Should follow the `gu-video-<style>-<atomId>` convention.
 * @param isInView - Whether the video element is sufficiently visible in the viewport.
 *   Typically sourced from `useIsInView`.
 * @param isPlaying - Whether the video is currently playing.
 * @param renderingTarget - Used to obtain the correct Ophan instance.
 */
export const useVideoAttentionTracking = (
	componentName: string,
	isInView: boolean | null,
	isPlaying: boolean,
	renderingTarget: RenderingTarget,
): void => {
	/** Accumulated attention time in milliseconds. */
	const totalAttentionMsRef = useRef(0);

	/**
	 * The last value of `totalAttentionMsRef` that was reported to Ophan.
	 * Initialised to `null` so the first report fires even when attention is 0ms,
	 * matching the behaviour of attention.js.
	 */
	const reportedAttentionMsRef = useRef<number | null>(null);

	/**
	 * The `performance.now()` timestamp at which the current unrecorded attention
	 * period began. `null` when attention is not being tracked.
	 */
	const attentionStartedAtRef = useRef<number | null>(null);

	/**
	 * Kept in refs so they can be read from the interval callback without
	 * requiring it as a dependency or causing stale closures.
	 */
	const componentNameRef = useRef(componentName);
	const renderingTargetRef = useRef(renderingTarget);
	componentNameRef.current = componentName;
	renderingTargetRef.current = renderingTarget;

	/**
	 * Attention is active when the video is both in view and playing.
	 * Mirrors the condition in ophan-tracker-js where a video component only
	 * accumulates attention when `visible && videoPlaying`.
	 */
	const isActive = isInView === true && isPlaying;

	/**
	 * React to changes in the active state:
	 * - When becoming active, record the start timestamp.
	 * - When becoming inactive, flush unrecorded time into the total and clear
	 *   the start timestamp.
	 */
	useEffect(() => {
		if (isActive) {
			if (attentionStartedAtRef.current === null) {
				attentionStartedAtRef.current = performance.now();
			}
		} else {
			if (attentionStartedAtRef.current !== null) {
				const now = performance.now();
				totalAttentionMsRef.current += Math.min(
					now - attentionStartedAtRef.current,
					REPORTING_INTERVAL_MS,
				);
				attentionStartedAtRef.current = null;
			}
		}
	}, [isActive]);

	/**
	 * Set up periodic reporting. Runs once on mount.
	 *
	 * Matches the reporting cadence of attention.js:
	 * - An initial report fires after 100ms.
	 * - Subsequent reports fire every `REPORTING_INTERVAL_MS`.
	 *
	 * Each report:
	 * 1. Flushes any unrecorded time from the current attention period into the
	 *    total (capped at `REPORTING_INTERVAL_MS` to avoid inflated values from
	 *    suspended devices).
	 * 2. Sends `componentAttentionMs` via `ophan.record` only when the total has
	 *    changed since the last report.
	 */
	useEffect(() => {
		const accumulateAttention = () => {
			if (attentionStartedAtRef.current !== null) {
				const now = performance.now();
				totalAttentionMsRef.current += Math.min(
					now - attentionStartedAtRef.current,
					REPORTING_INTERVAL_MS,
				);
				// Reset to now so the next accumulation starts from here,
				// matching the behaviour of incrementTotalAttentionTimeByUnrecordedAmount
				// in components.js.
				attentionStartedAtRef.current = now;
			}
		};

		const report = () => {
			accumulateAttention();
			if (
				totalAttentionMsRef.current !== reportedAttentionMsRef.current
			) {
				const attentionMs = Math.round(totalAttentionMsRef.current);
				// Update before the async call to prevent duplicate reports if
				// the interval fires again before the promise resolves.
				reportedAttentionMsRef.current = totalAttentionMsRef.current;
				void getOphan(renderingTargetRef.current).then((ophan) => {
					// `componentAttentionMs` is not part of the EventPayload TypeScript
					// type definition, but it is the raw query-string key consumed by
					// the Ophan backend — matching what attention.js sends via
					// transmit.sendMore.
					ophan.record({
						componentAttentionMs: {
							[componentNameRef.current]: attentionMs,
						},
					} as Parameters<typeof ophan.record>[0]);
				});
			}
		};

		const initialTimerId = window.setTimeout(report, 100);
		const intervalId = window.setInterval(report, REPORTING_INTERVAL_MS);

		return () => {
			window.clearTimeout(initialTimerId);
			window.clearInterval(intervalId);
		};
	}, []);
};
