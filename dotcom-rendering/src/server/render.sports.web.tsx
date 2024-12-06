import { FELiveScoresType } from '../types/sports';
import { LiveScoresPage } from '../components/Football/LiveScoresPage';
import { renderToStringWithEmotion } from '../lib/emotion';
import { getPathFromManifest } from '../lib/assets';
import { polyfillIO } from '../lib/polyfill.io';
import { isString } from '@guardian/libs';

interface Props {
	sports: FELiveScoresType;
}

export const renderSportsHtml = ({
	sports,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { html } = renderToStringWithEmotion(
		<LiveScoresPage liveScores={sports} />,
	);

	/**
	 * The highest priority scripts.
	 * These scripts have a considerable impact on site performance.
	 * Only scripts critical to application execution may go in here.
	 * Please talk to the dotcom platform team before adding more.
	 * Scripts will be executed in the order they appear in this array
	 */
	const prefetchScripts = [
		polyfillIO,
		getPathFromManifest('client.web', 'frameworks.js'),
		getPathFromManifest('client.web', 'index.js'),
	].filter(isString);

	return { html: html, prefetchScripts };
};
