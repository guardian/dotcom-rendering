import type { EditionId } from '../lib/edition';
import type { ArticleFormat } from '../lib/format';
import type { ArticleElementRenderer } from '../lib/renderElement';
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
}

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
	</>
);
