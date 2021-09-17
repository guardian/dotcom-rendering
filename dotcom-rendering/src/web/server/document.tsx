import { renderToString } from 'react-dom/server';

import { htmlTemplate } from './htmlTemplate';
import { SkipTo } from '../components/SkipTo';

interface Props {
	title?: string;
	CAPI?: CAPIType;
	linkedData?: { [key: string]: any };
	description: string;
	priorityScriptTags?: string[];
	lowPriorityScriptTags?: string[];
	gaPath?: { modern: string; legacy: string };
	loadableConfigScripts?: string[];
	windowGuardian?: string;
	extractedCss: string;
	html: string;
}

export const document = ({
	title = 'The Guardian',
	CAPI,
	linkedData,
	description,
	priorityScriptTags = [],
	lowPriorityScriptTags = [],
	gaPath,
	loadableConfigScripts = [],
	windowGuardian,
	extractedCss,
	html,
}: Props): string => {
	const hasAmpInteractiveTag = CAPI?.tags.some(
		(tag) => tag.id === 'tracking/platformfunctional/ampinteractive',
	);

	// Only include AMP link for interactives which have the 'ampinteractive' tag
	const ampLink =
		CAPI?.format.design !== 'InteractiveDesign' || hasAmpInteractiveTag
			? `https://amp.theguardian.com/${CAPI?.pageId}`
			: undefined;

	const openGraphData = CAPI?.openGraphData;
	const twitterData = CAPI?.twitterData;
	const keywords =
		typeof CAPI?.config.keywords === 'undefined' ||
		CAPI.config.keywords === 'Network Front'
			? ''
			: CAPI.config.keywords;

	const skipToMainContent = renderToString(
		<SkipTo id="maincontent" label="Skip to main content" />,
	);
	const skipToNavigation = renderToString(
		<SkipTo id="navigation" label="Skip to navigation" />,
	);

	return htmlTemplate({
		linkedData,
		loadableConfigScripts,
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title,
		description,
		windowGuardian,
		gaPath,
		ampLink,
		openGraphData,
		twitterData,
		keywords,
		skipToMainContent,
		skipToNavigation,
	});
};
