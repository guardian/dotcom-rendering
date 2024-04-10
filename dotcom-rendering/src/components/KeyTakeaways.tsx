import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { palette } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import type { ServerSideTests, Switches } from '../types/config';
import type { KeyTakeaway } from '../types/content';
import { KeyTakeaway as KeyTakeawayComponent } from './KeyTakeaway';

interface KeyTakeawaysProps {
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
	starRating?: number;
	keyTakeaways: KeyTakeaway[];
	RenderArticleElement: ArticleElementRenderer;
}

const lineStyles = css`
	width: 140px;
	height: 1px;
	margin: 0;
	border: none;
	border-top: 1px solid ${palette.neutral[86]};
	padding: 8px 0 2px 0;
`;

export const KeyTakeaways = ({
	keyTakeaways,
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
}: KeyTakeawaysProps) => {
	return (
		<ol data-ignore="global-ol-styling">
			{keyTakeaways.map((keyTakeaway, index) => (
				<KeyTakeawayComponent
					keyTakeaway={keyTakeaway}
					format={format}
					ajaxUrl={ajaxUrl}
					host={host}
					pageId={pageId}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
					titleIndex={index + 1}
					hideCaption={hideCaption}
					starRating={starRating}
					key={index}
					RenderArticleElement={RenderArticleElement}
				/>
			))}
			<hr css={lineStyles} />
		</ol>
	);
};
