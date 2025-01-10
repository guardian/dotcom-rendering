import { css } from '@emotion/react';
import type { ArticleFormat } from '../lib/articleFormat';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { QAndAExplainer, StarRating } from '../types/content';
import { QAndAExplainer as QAndAExplainerComponent } from './QAndAExplainer';

interface Props {
	qAndAExplainers: QAndAExplainer[];
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
	RenderArticleElement: ArticleElementRenderer;
	/**
	 * Whether this is the last element in the article. If true, no separator will be rendered.
	 */
	isLastElement: boolean;
}

const separatorStyles = css`
	width: 140px;
	margin: 8px 0 2px 0;
	border-top: 1px solid ${palette('--article-border')};
`;

export const QAndAExplainers = ({
	qAndAExplainers,
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
}: Props) => (
	<>
		{qAndAExplainers.map((qAndAExplainer, index) => (
			<QAndAExplainerComponent
				qAndAExplainer={qAndAExplainer}
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
	</>
);
