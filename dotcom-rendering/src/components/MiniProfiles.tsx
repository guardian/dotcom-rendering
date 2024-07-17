import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { palette } from '@guardian/source/foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import type { ServerSideTests, Switches } from '../types/config';
import type { MiniProfile, StarRating } from '../types/content';
import { MiniProfile as MiniProfileComponent } from './MiniProfile';

interface MiniProfilesProps {
	format: ArticleFormat;
	ajaxUrl: string;
	host?: string;
	pageId: string;
	isAdFreeUser: boolean;
	isSensitive: boolean;
	abTests: ServerSideTests;
	switches: Switches;
	editionId: EditionId;
	hideCaption?: boolean;
	starRating?: StarRating;
	miniProfiles: MiniProfile[];
	RenderArticleElement: ArticleElementRenderer;
	/**
	 * Whether this is the last element in the article. If true, no separator will be rendered.
	 */
	isLastElement: boolean;
}

const separatorStyles = css`
	width: 140px;
	margin: 8px 0 2px 0;
	border-top: 1px solid ${palette.neutral[86]};
`;

export const MiniProfiles = ({
	miniProfiles,
	format,
	ajaxUrl,
	host,
	pageId,
	isAdFreeUser,
	isSensitive,
	switches,
	abTests,
	editionId,
	hideCaption,
	starRating,
	RenderArticleElement,
	isLastElement,
}: MiniProfilesProps) => {
	return (
		<ol data-ignore="global-ol-styling">
			{miniProfiles.map((miniProfile, index) => (
				<MiniProfileComponent
					miniProfile={miniProfile}
					format={format}
					ajaxUrl={ajaxUrl}
					host={host}
					pageId={pageId}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
					hideCaption={hideCaption}
					starRating={starRating}
					key={index}
					RenderArticleElement={RenderArticleElement}
				/>
			))}
			{!isLastElement && <hr css={separatorStyles} />}
		</ol>
	);
};
