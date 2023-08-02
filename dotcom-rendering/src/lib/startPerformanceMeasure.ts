import type { TeamName } from '@guardian/libs';
import { startPerformanceMeasure as startPerformanceMeasureLibs } from '@guardian/libs';

const fallback = { endPerformanceMeasure: () => -1 };

export const startPerformanceMeasure = (
	team: TeamName,
	name: string,
	action?: string,
): ReturnType<typeof startPerformanceMeasureLibs> => {
	if (!('measure' in window.performance)) return fallback;
	try {
		window.performance.measure('fake-measure', { start: 0 }); // MeasureOptions is only supported in Safari 14.1+
		return startPerformanceMeasureLibs(team, name, action);
	} catch (error) {
		return fallback;
	}
};
