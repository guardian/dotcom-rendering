import { getOphan } from '../client/ophan/ophan';

const milestones = [25, 50, 75, 100] as const;

export const trackPuzzlesHubScrollDepth = (): (() => void) => {
	if (!document.querySelector('[data-layout="PuzzlesPageLayout"]')) {
		return () => undefined;
	}

	const reported = new Set<number>();
	let active = true;
	let frame: number | undefined;

	const measure = () => {
		frame = undefined;
		const height = Math.max(
			document.documentElement.scrollHeight,
			document.body.scrollHeight,
		);
		if (document.visibilityState !== 'visible' || height <= 0) return;

		const depth = Math.min(
			100,
			((Math.max(0, window.scrollY) + window.innerHeight) / height) * 100,
		);
		const reached = milestones.filter(
			(milestone) => depth >= milestone && !reported.has(milestone),
		);
		if (reached.length === 0) return;

		void getOphan('Web')
			.then((ophan) => {
				if (!active) return;
				for (const milestone of reached) {
					if (reported.has(milestone)) continue;
					ophan.record({
						interaction: {
							component: 'puzzles-hub-scroll-depth',
							value: String(milestone),
						},
					});
					reported.add(milestone);
				}
			})
			.catch(() => undefined);
	};

	const schedule = () => {
		frame ??= window.requestAnimationFrame(measure);
	};

	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule);
	window.addEventListener('pageshow', schedule);
	document.addEventListener('visibilitychange', schedule);
	schedule();

	return () => {
		active = false;
		if (frame !== undefined) window.cancelAnimationFrame(frame);
		window.removeEventListener('scroll', schedule);
		window.removeEventListener('resize', schedule);
		window.removeEventListener('pageshow', schedule);
		document.removeEventListener('visibilitychange', schedule);
	};
};
