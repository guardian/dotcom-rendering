// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { breakpoints, from, neutral } from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import ArticleBody from 'components/ArticleBody';
import Byline from 'components/Byline';
import Cutout from 'components/Cutout';
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
import type { Comment as CommentItem, Editorial } from 'item';
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

const styles = (format: ArticleFormat): SerializedStyles => css`
	background: ${background.articleContent(format)};

	${darkModeCss`
		background: ${background.articleContentDark(format)};
	`}
`;

const BorderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const topBorder = css`
	${darkModeCss`
        border-top: solid 1px ${neutral[20]};
    `}
`;

const commentLineStylePosition = css`
	margin-top: 83px;
`;

interface Props {
	item: CommentItem | Editorial;
}

const CommentLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	return (
		<main css={styles(format)}>
			<article css={BorderStyles}>
				<header>
					<WithAgeWarning
						tags={item.tags}
						series={item.series}
						publishDate={item.publishDate}
						format={format}
					/>
					<Series item={item} />
					<Headline item={item} />
					<div css={articleWidthStyles}>
						<Byline {...item} />
					</div>

					<Cutout
						contributors={item.contributors}
						className={articleWidthStyles}
						format={item}
					/>
					<StraightLines
						cssOverrides={[
							commentLineStylePosition,
							lineStyles(format),
						]}
						count={8}
					/>
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
					</div>
					{/* todo can this be 3 lines? */}
					<StraightLines
						cssOverrides={[lineStyles(format)]}
						count={4}
					/>
					<section css={[articleWidthStyles, topBorder]}>
						<Metadata item={item} />
					</section>

					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
					<section css={articleWidthStyles}>
						<Logo item={item} />
					</section>
					{item.outline.length > 3 && (
						<section css={articleWidthStyles}>
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
			<section css={onwardStyles}>
				<RelatedContent item={item} />
			</section>
			<Footer isCcpa={false} format={item} />
		</main>
	);
};

// ----- Exports ----- //

export default CommentLayout;
