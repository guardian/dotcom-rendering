// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {breakpoints, from, remSpace} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import ArticleBody from 'components/ArticleBody';
import Byline from 'components/Byline';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { getFormat } from 'item';
import type { Analysis } from 'item';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import HeadlineTag from '../HeadlineTag';

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
	children: ReactNode[];
}

const AnalysisLayout: FC<Props> = ({ item, children }) => (
	<>
		<main css={backgroundStyles(item)}>
			<article css={BorderStyles}>
				<header>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
					<Series item={item} />
					<div css={css`margin-bottom: ${remSpace[1]};`}>
						<HeadlineTag tagText={'Analysis'} format={item} />
					</div>
					<Headline item={item} />
					<section css={[articleWidthStyles]}>
						<Byline {...item} />
						<Standfirst item={item} />
						<StraightLines cssOverrides={lineStyles} count={4} />
						<Metadata item={item} />
					</section>
				</header>
				<ArticleBody className={[articleWidthStyles]} format={item}>
					{children}
				</ArticleBody>
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

// ----- Exports ----- //

export default AnalysisLayout;
