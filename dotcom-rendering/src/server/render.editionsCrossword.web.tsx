import { isString } from '@guardian/libs';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import {
	ASSET_ORIGIN,
	generateScriptTags,
	getPathFromManifest,
} from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import type { Config } from '../types/configContext';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';
import { htmlCrosswordPageTemplate } from './htmlCrosswordPageTemplate';

interface Props {
	editionsCrosswords: FEEditionsCrosswords;
}

export const renderCrosswordHtml = ({
	editionsCrosswords,
}: Props): { html: string; prefetchScripts: string[] } => {
	const renderingTarget = 'Web';
	const config: Config = {
		renderingTarget,
		darkModeAvailable: false,
		assetOrigin: ASSET_ORIGIN,
		editionId: 'UK',
	};

	const { html } = renderToStringWithEmotion(
		<EditionsCrosswordPage editionsCrosswords={editionsCrosswords} />,
	);

	const prefetchScripts = [
		getPathFromManifest('client.editionsCrossword', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...prefetchScripts]);

	const pageHtml = htmlCrosswordPageTemplate({
		scriptTags,
		html,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
