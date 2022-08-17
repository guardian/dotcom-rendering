// ----- Imports ----- //

import { css } from '@emotion/react';
import {
	background,
	breakpoints,
	from,
	opinion,
} from '@guardian/source-foundations';
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

// ----- Styles ----- //

const DarkStyles = darkModeCss`
    background: ${background.inverse};
`;

const BorderStyles = css`
	background: ${opinion[800]};
	${darkModeCss`background: ${background.inverse};`}

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
	<main css={DarkStyles}>
		<article css={BorderStyles}>
			<header css={articleWidthStyles}>
				<MainMedia
					format={getFormat(item)}
					mainMedia={item.mainMedia}
				/>
				<Series item={item} />
				<Headline item={item} />

				<Byline {...item} />

				<Standfirst item={item} />
				<StraightLines cssOverrides={lineStyles} count={4} />
				<Metadata item={item} />
				<section css={articleWidthStyles}>
					<Logo item={item} />
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
