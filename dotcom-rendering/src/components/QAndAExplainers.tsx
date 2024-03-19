import { css, type SerializedStyles } from '@emotion/react';
import { ArticleDisplay, type ArticleFormat } from '@guardian/libs';
import { headline } from '@guardian/source-foundations';
import type { EditionId } from '../lib/edition';
import { RenderArticleElement } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { QAndAExplainer } from '../types/content';

const qAndAExplainerStyles = css`
	padding-top: 8px;
`;

const headingStyles = (display: ArticleDisplay): SerializedStyles => css`
	${display === ArticleDisplay.Immersive
		? headline.medium({ fontWeight: 'light' })
		: headline.xxsmall({ fontWeight: 'bold' })};
	padding: 2px 0px;
`;

const headingLineStyles = css`
	width: 140px;
	margin: 0px;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

interface CommonProps {
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
}

interface QAndAExplainersProps extends CommonProps {
	qAndAExplainers: QAndAExplainer[];
}

interface QAndAExplainerProps extends CommonProps {
	qAndAExplainer: QAndAExplainer;
}

const QAndAExplainerComponent = ({
	qAndAExplainer,
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
}: QAndAExplainerProps) => {
	return (
		<li css={qAndAExplainerStyles}>
			<hr css={headingLineStyles}></hr>
			<h2 css={headingStyles(format.display)}>{qAndAExplainer.title}</h2>
			{qAndAExplainer.body.map((element, index) => (
				<RenderArticleElement
					// eslint-disable-next-line react/no-array-index-key -- This is only rendered once so we can safely use index to suppress the warning
					key={index}
					format={format}
					element={element}
					ajaxUrl={ajaxUrl}
					host={host}
					index={index}
					isMainMedia={false}
					pageId={pageId}
					webTitle={qAndAExplainer.title}
					isAdFreeUser={isAdFreeUser}
					isSensitive={isSensitive}
					switches={switches}
					abTests={abTests}
					editionId={editionId}
					hideCaption={hideCaption}
					starRating={starRating}
				/>
			))}
		</li>
	);
};

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
}: QAndAExplainersProps) => {
	return (
		<ol>
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
				/>
			))}
		</ol>
	);
};
