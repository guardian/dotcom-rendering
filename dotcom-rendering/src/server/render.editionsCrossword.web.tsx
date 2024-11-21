import { isString } from '@guardian/libs';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import { generateScriptTags, getPathFromManifest } from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import type { FEEditionsCrosswords } from '../types/editionsCrossword';
import { htmlCrosswordPageTemplate } from './htmlCrosswordPageTemplate';

interface Props {
	editionsCrosswords: FEEditionsCrosswords;
}

export const renderCrosswordHtml = ({
	editionsCrosswords,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { html, extractedCss } = renderToStringWithEmotion(
		<EditionsCrosswordPage editionsCrosswords={editionsCrosswords} />,
	);

	const prefetchScripts = [
		getPathFromManifest('client.editionsCrossword', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags([...prefetchScripts]);

	const pageHtml = htmlCrosswordPageTemplate({
		css: extractedCss,
		html,
		scriptTags,
	});

	return { html: pageHtml, prefetchScripts };
};
