import { isString } from '@guardian/libs';
import { EditionsCrosswordPage } from '../components/EditionsCrosswordPage';
import { generateScriptTags, getPathFromManifest } from '../lib/assets';
import { renderToStringWithEmotion } from '../lib/emotion';
import type { CAPICrosswords } from '../types/editionsCrossword';
import { htmlCrosswordPageTemplate } from './htmlCrosswordPageTemplate';

interface Props {
	editionsCrosswords: CAPICrosswords;
}

export const renderCrosswordHtml = ({
	editionsCrosswords,
}: Props): { html: string; prefetchScripts: string[] } => {
	const { html } = renderToStringWithEmotion(
		<EditionsCrosswordPage editionsCrosswords={editionsCrosswords} />,
	);

	const prefetchScripts = [
		getPathFromManifest('client.editionsCrossword', 'index.js'),
	].filter(isString);

	const scriptTags = generateScriptTags(prefetchScripts);

	const pageHtml = htmlCrosswordPageTemplate({
		html,
		scriptTags,
	});

	return { html: pageHtml, prefetchScripts };
};
