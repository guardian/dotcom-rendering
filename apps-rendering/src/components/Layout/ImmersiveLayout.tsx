// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { between, from, palette, remSpace } from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia, { ImmersiveCaption } from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import TableOfContents from 'components/TableOfContents';
import Tags from 'components/Tags';
import { WithAgeWarning } from 'components/WithAgeWarning';
import { grid } from 'grid/grid';
import LeftCentreBorder from 'grid/LeftCentreBorder';
import type { DeadBlog, Item, LiveBlog } from 'item';
import { getFormat } from 'item';
import { background, fill } from 'palette';
import type { FC } from 'react';
import { render } from 'renderer';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const headerStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.articleContent(format)};

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
	`}
`;

const mainContentStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.container}
	background-color: ${background.articleContent(format)};

	${darkModeCss`
		background-color: ${background.articleContentDark(format)};
	`}
`;

const bodyStyles = css`
	${grid.column.centre}

	${between.tablet.and.desktop} {
		${grid.span('centre-column-start', 11)}
	}

	${from.leftCol} {
		grid-row: 1 / 6;
	}

	${darkModeCss`
		color: ${palette.neutral[86]};
	`}
`;

const linesStyles = (format: ArticleFormat): SerializedStyles => css`
	${grid.column.all}
	margin-top: ${remSpace[1]};

	${from.phablet} {
		${grid.column.centre}
	}

	${from.leftCol} {
		${grid.column.left}
		margin-top: 0;
	}

	${darkModeCss`
		stroke: ${fill.linesDark(format)};
	`}
`;

const logoStyles = css`
	${grid.column.centre}

	${from.leftCol} {
		${grid.column.left}
	}
`;

type Props = {
	item: Exclude<Item, LiveBlog | DeadBlog>;
};

const ImmersiveLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<>
			<main>
				<article>
					<header css={headerStyles(format)}>
						<MainMedia mainMedia={item.mainMedia} format={format} />
						<WithAgeWarning
							tags={item.tags}
							series={item.series}
							publishDate={item.publishDate}
							format={format}
						/>
						<Series item={item} />
						<Headline item={item} />
						<Standfirst item={item} />
						<ImmersiveCaption
							mainMedia={item.mainMedia}
							format={format}
						/>
						<LeftCentreBorder rows={[5, 5]} />
					</header>
					<div css={mainContentStyles(format)}>
						<LeftCentreBorder rows={[1, 5]} />
						<StraightLines cssOverrides={linesStyles(format)} />
						<div css={logoStyles}>
							<Logo item={item} />
						</div>
						<Metadata item={item} />
						<div css={bodyStyles}>
							{item.outline.length >= 3 && (
								<section>
									<TableOfContents
										format={getFormat(item)}
										outline={item.outline}
									/>
								</section>
							)}
							{render(item.shouldHideAdverts, format, item.body)}
						</div>
						<Tags item={item} />
					</div>
				</article>
			</main>
			<RelatedContent item={item} />
			<Footer isCcpa={false} format={format} />
		</>
	);
};

// ----- Exports ----- //

export default ImmersiveLayout;
