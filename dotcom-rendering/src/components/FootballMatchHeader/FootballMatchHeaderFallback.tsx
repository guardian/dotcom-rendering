import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import { Hide } from '@guardian/source/react-components';
import type { ArticleFormat } from '../../lib/articleFormat';
import { palette } from '../../palette';
import type { ArticleDeprecated } from '../../types/article';
import { ArticleHeadline } from '../ArticleHeadline';
import { ArticleTitle } from '../ArticleTitle';
import { Section } from '../Section';
import { background, border } from './colours';

export const FootballMatchHeaderFallback = ({
	format,
	article,
}: {
	format: ArticleFormat;
	article: ArticleDeprecated;
}) => (
	<Section
		showTopBorder={false}
		backgroundColour={palette(background('Live'))}
		borderColour={palette(border('Live'))}
		leftContent={
			<ArticleTitle
				format={format}
				tags={article.tags}
				sectionLabel={article.sectionLabel}
				sectionUrl={article.sectionUrl}
				guardianBaseURL={article.guardianBaseURL}
				isMatch={true}
			/>
		}
		leftColSize="wide"
		padContent={false}
		verticalMargins={false}
	>
		<Hide from="leftCol">
			<ArticleTitle
				format={format}
				tags={article.tags}
				sectionLabel={article.sectionLabel}
				sectionUrl={article.sectionUrl}
				guardianBaseURL={article.guardianBaseURL}
				isMatch={true}
			/>
		</Hide>
		<div
			css={css`
				${from.leftCol} {
					margin-left: 10px;
				}
				${from.desktop} {
					max-width: 700px;
				}
			`}
		>
			<ArticleHeadline
				headlineString={article.headline}
				format={format}
				tags={article.tags}
				webPublicationDateDeprecated={
					article.webPublicationDateDeprecated
				}
				isMatch={true}
			/>
		</div>
	</Section>
);
