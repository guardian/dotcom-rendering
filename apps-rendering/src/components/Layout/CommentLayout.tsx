// ----- Imports ----- //
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	breakpoints,
	from,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
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
import Tags from 'components/Tags';
import { getFormat } from 'item';
import type { Comment as CommentItem, Editorial } from 'item';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //

const Styles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};
`;

const DarkStyles = (format: ArticleFormat): SerializedStyles => darkModeCss`
    background-color: ${background.articleContentDark(format)};
`;

const BorderStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`background-color: ${background.articleContentDark(format)}`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const topBorder = css`
	border-top: solid 1px ${neutral[86]};
	margin-top: ${remSpace[3]};

	${from.wide} {
		margin-top: ${remSpace[3]};
	}

	${darkModeCss`
        border-top: solid 1px ${neutral[20]};
    `}
`;

const commentLineStylePosition = css`
	margin-top: 83px;
`;

interface Props {
	item: CommentItem | Editorial;
	children: ReactNode[];
}

const CommentLayout: FC<Props> = ({ item, children }) => {
	const format = getFormat(item);
	return (
		<main css={[Styles(format), DarkStyles(format)]}>
			<article css={BorderStyles(format)}>
				<header>
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
						cssOverrides={[commentLineStylePosition, lineStyles]}
						count={8}
					/>
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
					</div>

					<section css={[articleWidthStyles, topBorder]}>
						<Metadata item={item} />
					</section>

					<MainMedia format={format} mainMedia={item.mainMedia} />
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
};

// ----- Exports ----- //

export default CommentLayout;
