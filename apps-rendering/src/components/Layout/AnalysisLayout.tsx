// ----- Imports ----- //

import { css } from '@emotion/react';
import { breakpoints, from } from '@guardian/source-foundations';
import { background } from '@guardian/common-rendering/src/editorialPalette';

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
import { ArticleFormat } from '@guardian/libs';

// ----- Styles ----- //

const backgroundStyles = (format: ArticleFormat) => css`
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
	<main css={backgroundStyles(item)}>
		<article css={BorderStyles}>
			<header>
				<MainMedia
					format={getFormat(item)}
					mainMedia={item.mainMedia}
				/>
				<Series item={item} />
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
		<section css={onwardStyles}>
			<RelatedContent item={item} />
		</section>
		<Footer isCcpa={false} format={item} />
	</main>
);

// ----- Exports ----- //

export default AnalysisLayout;
