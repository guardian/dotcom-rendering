import { buildAdTargeting } from '../../lib/ad-targeting';
import { decideFormat } from '../lib/decideFormat';
import { renderToStringWithEmotion } from '../lib/emotion';
import { LiveBlogRenderer } from '../lib/LiveBlogRenderer';

/**
 * blocksToHtml is used by the /Blocks endpoint as part of keeping liveblogs live
 * It takes an array of json blocks and returns the resulting html string
 *
 * @returns string (the html)
 */
export const blocksToHtml = ({
	blocks,
	format: FEFormat,
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
}: FEBlocksRequest): string => {
	const format: ArticleFormat = decideFormat(FEFormat);

	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser,
		isSensitive,
		videoDuration,
		edition,
		section,
		sharedAdTargeting,
		adUnit,
	});

	const { html, extractedCss } = renderToStringWithEmotion(
		<LiveBlogRenderer
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

	return `${extractedCss}${html}`;
};
