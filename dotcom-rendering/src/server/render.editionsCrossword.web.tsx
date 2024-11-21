import { isString } from '@guardian/libs';
import { ConfigProvider } from '../components/ConfigContext';
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
	const config: Config = {
		renderingTarget: 'Web',
		darkModeAvailable: false,
		assetOrigin: ASSET_ORIGIN,
		editionId: 'UK',
	};
	const { html, extractedCss } = renderToStringWithEmotion(
		<ConfigProvider value={config}>
			<EditionsCrosswordPage editionsCrosswords={editionsCrosswords} />,
		</ConfigProvider>,
	);

	const prefetchScripts = [
		getPathFromManifest('client.editionsCrossword', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...prefetchScripts]);

	const pageHtml = htmlCrosswordPageTemplate({
		css: extractedCss,
		html,
		scriptTags,
		config,
	});

	return { html: pageHtml, prefetchScripts };
};
