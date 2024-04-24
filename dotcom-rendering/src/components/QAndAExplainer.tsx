import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import type { EditionId } from '../lib/edition';
import type { ArticleElementRenderer } from '../lib/renderElement';
import { palette } from '../palette';
import type { ServerSideTests, Switches } from '../types/config';
import type { QAndAExplainer as QAndAExplainerModel } from '../types/content';
import { Subheading } from './Subheading';

interface Props {
	qAndAExplainer: QAndAExplainerModel;
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
	RenderArticleElement: ArticleElementRenderer;
}

const headingLineStyles = css`
	width: 140px;
	margin: 8px 0 0 0;
	border: none;
	border-top: 4px solid ${palette('--heading-line')};
`;

export const QAndAExplainer = ({
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
	RenderArticleElement,
}: Props) => {
	return (
		<>
			<hr css={headingLineStyles}></hr>
			<Subheading format={format} topPadding={false}>
				{qAndAExplainer.title}
			</Subheading>
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
					forceDropCap="off"
					isListElement={true}
				/>
			))}
		</>
	);
};
