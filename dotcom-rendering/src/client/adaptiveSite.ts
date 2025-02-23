import { log } from '@guardian/libs';
import { isServer } from '../lib/isServer';
import { setSchedulerPriorityLastStartTime } from '../lib/scheduler';
import type { RenderingTarget } from '../types/renderingTarget';
import { recordExperiences } from './ophan/ophan';

/**
 * Whether we should adapt the current page to address poor performance issues.
 *
 * It will resolve immediately if `false`, but needs to wait for perf check to
 * complete if you're in the adaptive site test variant.
 */
export const shouldAdapt = async (): Promise<boolean> => {
	if (isServer) return false;
	console.log(window.document.referrer);
	if (window.location.hash === '#adapt') return true;
	if (!window.guardian.config.switches.adaptiveSite) return false;
	if (window.location.host !== 'www.theguardian.com') return false;
	if (window.document.referrer === 'https://profile.theguardian.com/') {
		return false;
	}

	/**
	 * The europe beta front is being served to a 0% audience. This means it's rarely in cache and so it gets adapted more often.
	 * This is a temporary measure to ensure that the front is not adapted during testing.
	 */
	if (
		window.guardian.config.tests.europeBetaFrontVariant === 'variant' &&
		window.location.pathname === '/europe'
	) {
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
	recordExperiences(renderingTarget, ['adapted']);

export const adaptSite = (renderingTarget: RenderingTarget): void => {
	log('dotcom', '🎛️ Adapting');

	// disable all tasks except critical ones
	setSchedulerPriorityLastStartTime('feature', 0);
	setSchedulerPriorityLastStartTime('enhancement', 0);
	hideAdaptedIslands();

	void recordAdaptedSite(renderingTarget);
};
