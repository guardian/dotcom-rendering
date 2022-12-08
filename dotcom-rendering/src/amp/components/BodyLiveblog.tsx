import { css } from '@emotion/react';
import {
	headline,
	neutral,
	news,
	textSans,
} from '@guardian/source-foundations';
import { buildAdTargeting } from '../../lib/ad-targeting';
import { getSharingUrls } from '../../lib/sharing-urls';
import RefreshIcon from '../../static/icons/refresh.svg';
import type { ConfigType } from '../../types/config';
import { decideTheme } from '../../web/lib/decideTheme';
import type { ArticleModel } from '../types/ArticleModel';
import { Blocks } from './Blocks';
import { KeyEvents } from './KeyEvents';
import { Pagination } from './Pagination';
import { SubMeta } from './SubMeta';
import { TopMetaLiveblog } from './topMeta/TopMetaLiveblog';

// TODO check if liveblog background colours are more complex - like regular
// article is

const innerContainerStyles = css`
	padding-left: 10px;
	padding-right: 10px;
`;

const bodyStyle = css`
	background-color: ${neutral[97]};

	h2 {
		${headline.xxsmall()};
		font-weight: 500;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}
`;

// To override AMP styles we need to use nested and specific selectors here
// unfortunately.
const updateButtonStyle = css`
	&.amp-active[update] {
		position: fixed;
		left: 0;
		top: 12px;
		display: flex;
		justify-content: center;
	}

	width: 100%;

	button {
		border: none;
		border-radius: 1000px;
		height: 36px;
		padding: 0 12px;

		background-color: ${news[400]};
		color: ${neutral[100]};
		font-weight: bold;
		${textSans.xxsmall()};

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	svg {
		height: 20px;
		width: 20px;
		margin-right: 6px;
	}
`;

type Props = {
	data: ArticleModel;
	config: ConfigType;
};

// Note, it is possible for liveblog updates to lack styling if a style change
// to any block content is deployed between a user loading a live blog and the
// updates happening. This happens because we don't include new styles on block
// updates, but only on initial page load.
export const Body = ({ data, config }: Props) => {
	const adTargeting: AdTargeting = buildAdTargeting({
		isAdFreeUser: data.isAdFreeUser,
		isSensitive: config.isSensitive,
		videoDuration: config.videoDuration,
		edition: config.edition,
		section: config.section,
		sharedAdTargeting: config.sharedAdTargeting,
		adUnit: config.adUnit,
	});
	const pillar = decideTheme(data.format);
	const url = `${data.guardianBaseURL}/${data.pageId}`;
	const isFirstPage = data.pagination
		? data.pagination.currentPage === 1
		: false;

	return (
		<div css={[bodyStyle, innerContainerStyles]}>
			<TopMetaLiveblog articleData={data} pillar={pillar} />
			<KeyEvents events={data.keyEvents} url={url} />

			{!isFirstPage && (
				<Pagination guardianURL={url} pagination={data.pagination} />
			)}

			<amp-live-list
				id="live-blog-entries-main"
				data-max-items-per-page="20" // TODO confirm if this should be dynamic
			>
				<div update="" css={updateButtonStyle}>
					<button on="tap:live-blog-entries-main.update">
						<RefreshIcon />
						<span>You have updates</span>
					</button>
				</div>
				<div items="">
					<Blocks
						pillar={pillar}
						blocks={data.blocks}
						// stuff for ads
						editionId={data.editionId}
						section={data.sectionName}
						contentType={data.contentType}
						switches={config.switches}
						commercialProperties={data.commercialProperties}
						url={url}
						shouldHideAds={data.shouldHideAds}
						adTargeting={adTargeting}
					/>
				</div>
			</amp-live-list>

			<Pagination guardianURL={url} pagination={data.pagination} />

			<SubMeta
				sections={data.subMetaSectionLinks}
				keywords={data.subMetaKeywordLinks}
				pillar={pillar}
				sharingURLs={getSharingUrls(data.pageId, data.webTitle)}
				pageID={data.pageId}
				isCommentable={data.isCommentable}
				guardianBaseURL={data.guardianBaseURL}
			/>
		</div>
	);
};
