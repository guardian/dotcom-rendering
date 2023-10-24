// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { breakpoints, from } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import ArticleBody from 'components/ArticleBody';
import Byline from 'components/Byline';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import TableOfContents from 'components/TableOfContents';
import Tags from 'components/Tags';
import { WithAgeWarning } from 'components/WithAgeWarning';
import type { Analysis } from 'item';
import { getFormat } from 'item';
import { background } from 'palette';
import type { FC } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //

const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const BorderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

interface Props {
	item: Analysis;
}

const AnalysisLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	return (
		<>
			<main css={backgroundStyles(item)}>
				<article css={BorderStyles}>
					<header>
						<MainMedia
							format={getFormat(item)}
							mainMedia={item.mainMedia}
						/>
						<WithAgeWarning
							tags={item.tags}
							series={item.series}
							publishDate={item.publishDate}
							format={format}
						/>
						<Series item={item} />
						<Headline item={item} />
						<section css={[articleWidthStyles]}>
							<Byline {...item} />
							<Standfirst item={item} />
							<StraightLines
								cssOverrides={[lineStyles(format)]}
								count={4}
							/>
							<Metadata item={item} />
							<Logo item={item} />
						</section>
						{item.outline.length > 3 && (
							<section css={[articleWidthStyles]}>
								<TableOfContents
									format={getFormat(item)}
									outline={item.outline}
								/>
							</section>
						)}
					</header>
					<ArticleBody
						className={[articleWidthStyles]}
						format={item}
						body={item.body}
						shouldHideAdverts={item.shouldHideAdverts}
					/>
					<section css={articleWidthStyles}>
						<Tags item={item} />
					</section>
				</article>
			</main>
			<section css={onwardStyles}>
				<RelatedContent item={item} />
			</section>
			<Footer isCcpa={false} format={item} />
		</>
	);
};

// ----- Exports ----- //

export default AnalysisLayout;
