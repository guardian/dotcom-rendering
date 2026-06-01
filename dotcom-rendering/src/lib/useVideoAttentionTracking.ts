import type { EventPayload } from '@guardian/ophan-tracker-js';
import { useEffect, useRef } from 'react';
import { getOphan } from '../client/ophan/ophan';
import type { RenderingTarget } from '../types/renderingTarget';

/**
 * How often attention time is reported to Ophan, matching the interval used
 * by ophan-tracker-js internally.
 */
const REPORTING_INTERVAL_MS = 10_000;

const dispatchOphanAttentionEvent = (
	eventType: 'videoPlaying' | 'videoPause',
) => {
	const event = new Event(eventType, { bubbles: true });
	document.dispatchEvent(event);
};

/**
 * Tracks incremental video attention time whilst the video is both visible
 * in the viewport and actively playing.
 *
 * Emulates the component attention tracking behaviour of ophan-tracker-js
 * (`components.js` / `attention.js`), but managed within React so that
 * attention is only accumulated when the video is playing — not merely when
 * it is in view.

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
	const totalAttentionMsRef = useRef(0);
	const reportedAttentionMsRef = useRef(0);
	const attentionStartedAtRef = useRef<number | null>(null);

	const isActive = isInView === true && isPlaying;

	useEffect(() => {
		if (isActive) {
			/**
			 * Update Ophan to flag a video is playing. This will
			 * mean attention time updates are continually sent.
			 */
			dispatchOphanAttentionEvent('videoPlaying');
			attentionStartedAtRef.current ??= performance.now();
		} else {
			if (attentionStartedAtRef.current !== null) {
				/**
				 * Update Ophan to flag a video has stopped. This will
				 * mean attention time updates are eventually stopped.
				 */
				dispatchOphanAttentionEvent('videoPause');
				const now = performance.now();
				totalAttentionMsRef.current += Math.min(
					now - attentionStartedAtRef.current,
					REPORTING_INTERVAL_MS,
				);
				attentionStartedAtRef.current = null;
			}
		}
	}, [isActive]);

	useEffect(() => {
		const accumulateAttention = () => {
			if (attentionStartedAtRef.current !== null) {
				const now = performance.now();
				totalAttentionMsRef.current += Math.min(
					now - attentionStartedAtRef.current,
					REPORTING_INTERVAL_MS,
				);
				attentionStartedAtRef.current = now;
			}
		};

		const report = () => {
			accumulateAttention();
			if (
				totalAttentionMsRef.current !== reportedAttentionMsRef.current
			) {
				void getOphan(renderingTarget).then((ophan) => {
					if (renderingTarget === 'Web') {
						// EventPayload is current typed erroneously
						ophan.record({
							componentAttentionMs: {
								[componentName]: Math.round(
									totalAttentionMsRef.current,
								),
							},
						} as unknown as EventPayload);
					} else {
						/**
						 * Report component attention time via Bridget.
						 */
					}
				});

				reportedAttentionMsRef.current = totalAttentionMsRef.current;
			}
		};

		const intervalId = window.setInterval(report, REPORTING_INTERVAL_MS);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [componentName, renderingTarget]);
};
