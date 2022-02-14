import { renderToString } from 'react-dom/server';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { decideDesign } from '../lib/decideDesign';
import { decideDisplay } from '../lib/decideDisplay';
import { decideTheme } from '../lib/decideTheme';
import { LiveBlogRenderer } from '../lib/LiveBlogRenderer';

/**
 * blocksToHtml is used by the /Blocks endpoint as part of keeping liveblogs live
 * It takes an array of json blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const blocksToHtml = ({
	blocks,
	format: CAPIFormat,
	host,
	pageId,
	webTitle,
	ajaxUrl,
	isAdFreeUser,
	isSensitive,
	videoDuration,
	edition,
	section,
	sharedAdTargeting,
	adUnit,
}: BlocksRequest): string => {
	const format: ArticleFormat = {
		display: decideDisplay(CAPIFormat),
		design: decideDesign(CAPIFormat),
		theme: decideTheme(CAPIFormat),
	};

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser,
		isSensitive,
		videoDuration,
		edition,
		section,
		sharedAdTargeting,
		adUnit,
	});

	const html = renderToString(
		<LiveBlogRenderer
			blocks={blocks}
			format={format}
			adTargeting={adTargeting}
			host={host}
			pageId={pageId}
			webTitle={webTitle}
			ajaxUrl={ajaxUrl}
		/>,
	);

	return html;
};
