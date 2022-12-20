import { renderToString } from 'react-dom/server';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { decideFormat } from '../lib/decideFormat';
import { WebLiveBlogRenderer } from '../lib/LiveBlogRenderer';

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
	switches,
	keywordIds,
}: BlocksRequest): string => {
	const format: ArticleFormat = decideFormat(CAPIFormat);

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
		<WebLiveBlogRenderer
			blocks={blocks}
			format={format}
			adTargeting={adTargeting}
			host={host}
			pageId={pageId}
			webTitle={webTitle}
			ajaxUrl={ajaxUrl}
			isSensitive={isSensitive}
			isAdFreeUser={isAdFreeUser}
			switches={switches}
			isLiveUpdate={true}
			section={section}
			// The props below are never used because isLiveUpdate is true but, typescript...
			shouldHideReaderRevenue={false}
			tags={[]}
			isPaidContent={false}
			contributionsServiceUrl=""
			keywordIds={keywordIds}
		/>,
	);

	return html;
};
