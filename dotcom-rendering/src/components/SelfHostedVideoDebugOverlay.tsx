import { css } from '@emotion/react';
import { headlineMedium14 } from '@guardian/source/foundations';
import { useEffect, useRef, useState } from 'react';
import { palette } from '../palette';

/**
 * A lightweight, intentionally disposable debug overlay for self-hosted video.
 *
 * Enable by appending `?videoDebug=1` (or `&videoDebug=1`) to the page URL.
 *
 * Surfaces:
 *  - FORMAT: mime/extension of the selected source
 *  - STARTUP: ms from `loadstart` to first `playing`
 *  - CACHE: HIT / MISS / UNKNOWN, derived from Resource Timing
 *  - STATE: current readyState / paused / muted
 */

type Props = {
	videoRef: React.RefObject<HTMLVideoElement>;
	atomId: string;
};

const overlayStyles = css`
	position: absolute;
	top: 8px;
	left: 8px;
	z-index: 2147483647;
	padding: 8px 10px;
	background: ${palette('--versus-change')};
	color: ${palette('--uk-elections-scottish-national-party')};
	${headlineMedium14};
	white-space: pre;
	pointer-events: none;
	border-radius: 4px;
	max-width: calc(100% - 16px);
	overflow: hidden;
	text-shadow: 0 0 2px ${palette('--versus-change')};
`;

const getCacheStatus = (src: string): 'HIT' | 'MISS' | 'UNKNOWN' => {
	if (!src || typeof performance === 'undefined') return 'UNKNOWN';
	const entries = performance.getEntriesByName(
		src,
	) as PerformanceResourceTiming[];
	if (entries.length === 0) return 'UNKNOWN';
	const entry = entries[entries.length - 1];
	if (!entry) return 'UNKNOWN';

	// transferSize === 0 typically means a memory/disk cache hit
	// (but can also mean a cross-origin response without TAO header).
	if (entry.transferSize === 0 && entry.decodedBodySize > 0) return 'HIT';
	// Heuristic: very fast response start ⇒ likely cache
	if (entry.responseStart - entry.requestStart < 5) return 'HIT';
	return 'MISS';
};

const getFormat = (video: HTMLVideoElement | null): string => {
	if (!video?.currentSrc) return '—';
	const src = video.currentSrc;
	const ext = src.split('?')[0]?.split('#')[0]?.split('.').pop();
	if (!ext) return 'unknown';
	if (ext.toLowerCase() === 'm3u8') return 'HLS';
	return ext.toUpperCase();
};

const useQueryParam = (name: string): string | null => {
	const [value, setValue] = useState<string | null>(null);
	useEffect(() => {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		setValue(params.get(name));
	}, [name]);
	return value;
};

export const SelfHostedVideoDebugOverlay = ({ videoRef, atomId }: Props) => {
	const enabled = useQueryParam('videoDebug');
	const [, force] = useState(0);

	const loadStartRef = useRef<number | null>(null);
	const startupRef = useRef<number | null>(null);
	const hasPlayedRef = useRef(false);

	useEffect(() => {
		if (enabled !== '1') return;
		const video = videoRef.current;
		if (!video) return;

		const rerender = () => force((n) => n + 1);

		// iOS Safari often fires `loadstart` before this effect attaches its
		// listener (the overlay mounts after the <video> element). In that
		// case, seed loadStartRef from the resource timing entry's startTime
		// so STARTUP can still be computed when `playing` / `timeupdate`
		// eventually fires. Fall back to "now" if no entry is available.
		const seedLoadStartFromResourceTiming = () => {
			if (loadStartRef.current !== null) return;
			const src = video.currentSrc;
			if (src && typeof performance !== 'undefined') {
				const entries = performance.getEntriesByName(
					src,
				) as PerformanceResourceTiming[];
				const entry = entries[entries.length - 1];
				if (entry) {
					loadStartRef.current = entry.startTime;
					return;
				}
			}
			loadStartRef.current = performance.now();
		};

		const computeStartup = () => {
			if (startupRef.current !== null) return;
			if (loadStartRef.current === null) {
				seedLoadStartFromResourceTiming();
			}
			if (loadStartRef.current !== null) {
				startupRef.current = Math.max(
					0,
					Math.round(performance.now() - loadStartRef.current),
				);
			}
		};

		const onLoadStart = () => {
			loadStartRef.current = performance.now();
			startupRef.current = null;
			hasPlayedRef.current = false;
			rerender();
		};
		const onPlaying = () => {
			if (!hasPlayedRef.current) {
				computeStartup();
			}
			hasPlayedRef.current = true;
			rerender();
		};
		// iOS Safari is unreliable about firing `playing`; the first
		// `timeupdate` with currentTime > 0 is a robust fallback.
		const onTimeUpdate = () => {
			if (!hasPlayedRef.current && video.currentTime > 0) {
				computeStartup();
				hasPlayedRef.current = true;
				rerender();
			}
		};

		const passthrough = () => rerender();

		video.addEventListener('loadstart', onLoadStart);
		video.addEventListener('playing', onPlaying);
		video.addEventListener('timeupdate', onTimeUpdate);
		video.addEventListener('loadedmetadata', passthrough);
		video.addEventListener('canplay', passthrough);
		video.addEventListener('pause', passthrough);
		video.addEventListener('ended', passthrough);
		video.addEventListener('ratechange', passthrough);
		video.addEventListener('volumechange', passthrough);

		// If the video already started loading (or is already playing) before
		// we attached listeners (common on iOS Safari), backfill state now.
		if (video.currentSrc || video.readyState > 0) {
			seedLoadStartFromResourceTiming();
		}
		if (!video.paused && video.currentTime > 0) {
			computeStartup();
			hasPlayedRef.current = true;
		}

		// Re-render every second so connection / cache snapshots stay fresh
		const interval = window.setInterval(rerender, 1000);

		return () => {
			video.removeEventListener('loadstart', onLoadStart);
			video.removeEventListener('playing', onPlaying);
			video.removeEventListener('timeupdate', onTimeUpdate);
			video.removeEventListener('loadedmetadata', passthrough);
			video.removeEventListener('canplay', passthrough);
			video.removeEventListener('pause', passthrough);
			video.removeEventListener('ended', passthrough);
			video.removeEventListener('ratechange', passthrough);
			video.removeEventListener('volumechange', passthrough);
			window.clearInterval(interval);
		};
	}, [enabled, videoRef]);

	if (enabled !== '1') return null;

	const video = videoRef.current;
	const format = getFormat(video);
	const cache = video?.currentSrc
		? getCacheStatus(video.currentSrc)
		: 'UNKNOWN';
	const startup =
		startupRef.current !== null ? `${startupRef.current}ms` : '—';

	const readyState = (() => {
		switch (video?.readyState) {
			case 0:
				return 'HAVE_NOTHING';
			case 1:
				return 'HAVE_METADATA';
			case 2:
				return 'HAVE_CURRENT_DATA';
			case 3:
				return 'HAVE_FUTURE_DATA';
			case 4:
				return 'HAVE_ENOUGH_DATA';
			default:
				return '—';
		}
	})();

	const state = video
		? `${readyState}${video.paused ? ' · paused' : ' · playing'}${
				video.muted ? ' · muted' : ''
		  }`
		: '—';

	const lines = [
		`ATOM:    ${atomId}`,
		`FORMAT:  ${format}`,
		`STARTUP: ${startup}`,
		`CACHE:   ${cache}`,
		`STATE:   ${state}`,
	];

	return <div css={overlayStyles}>{lines.join('\n')}</div>;
};
