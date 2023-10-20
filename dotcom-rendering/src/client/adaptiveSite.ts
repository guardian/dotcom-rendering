import { log } from '@guardian/libs';
import { isServer } from '../lib/isServer';
import { setSchedulerPriorityLastStartTime } from '../lib/scheduler';
import { recordExperiences } from './ophan/ophan';
import { RenderingTarget } from '../types/renderingTarget';

/**
 * Whether we should adapt the current page to address poor performance issues.
 *
 * It will resolve immediately if `false`, but needs to wait for perf check to
 * complete if you're in the adaptive site test variant.
 */
export const shouldAdapt = async (): Promise<boolean> => {
	if (isServer) return false;
	if (window.location.hash === '#adapt') return true;
	if (window.guardian.config.tests.adaptiveSiteVariant !== 'variant') {
		return false;
	}

	// only evaluate this code if we want to adapt in response to page performance
	const { isPerformingPoorly } = await import(
		/* webpackMode: "eager" */ './poorPerformanceMonitoring'
	);

	return isPerformingPoorly();
};

/**  Hide all placeholders of non-critical islands */
const hideAdaptedIslands = () => {
	const style = document.createElement('style');
	style.innerHTML = `gu-island:not([priority=critical]) [data-name=placeholder] { display: none; }`;
	document.head.appendChild(style);
};

const recordAdaptedSite = (renderingTarget: RenderingTarget) =>
	recordExperiences(renderingTarget, 'adapted');

export const adaptSite = (renderingTarget: RenderingTarget): void => {
	log('openJournalism', '🎛️ Adapting');

	// disable all tasks except critical ones
	setSchedulerPriorityLastStartTime('feature', 0);
	setSchedulerPriorityLastStartTime('enhancement', 0);
	hideAdaptedIslands();

	void recordAdaptedSite(renderingTarget);
};
