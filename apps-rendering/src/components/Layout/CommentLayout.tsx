// ----- Imports ----- //

import { css } from '@emotion/react';
import { ArticleDesign } from '@guardian/libs';
import {
	background,
	breakpoints,
	from,
	neutral,
	opinion,
	remSpace,
} from '@guardian/source-foundations';
import { StraightLines } from '@guardian/source-react-components-development-kitchen';
import ArticleBody from 'components/ArticleBody';
import Byline from 'components/Byline';
import Cutout from 'components/Cutout';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import HeadlineTag from 'components/HeadlineTag';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import Metadata from 'components/Metadata';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import Tags from 'components/Tags';
import { getFormat } from 'item';
import type { Comment as CommentItem, Editorial, Letter } from 'item';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';

// ----- Styles ----- //

const Styles = css`
	background: ${neutral[97]};
`;

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
	item: CommentItem | Letter | Editorial;
	children: ReactNode[];
}

const CommentLayout: FC<Props> = ({ item, children }) => (
	<main css={[Styles, DarkStyles]}>
		<article css={BorderStyles}>
			<header>
				<Series item={item} />

				{item.design === ArticleDesign.Letter && (
					<HeadlineTag format={item} tagText="Letters" />
				)}

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

				<MainMedia
					format={getFormat(item)}
					mainMedia={item.mainMedia}
				/>
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

export default CommentLayout;
