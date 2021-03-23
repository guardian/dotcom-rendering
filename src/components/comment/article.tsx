// ----- Imports ----- //

import { css } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { remSpace } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import {
	background,
	neutral,
	opinion,
} from '@guardian/src-foundations/palette';
import Byline from 'components/byline';
import Cutout from 'components/comment/cutout';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import Series from 'components/series';
import ArticleBody from 'components/shared/articleBody';
import FooterCcpa from 'components/shared/footer';
import OptionalLogo from 'components/shared/logo';
import RelatedContent from 'components/shared/relatedContent';
import Tags from 'components/shared/tags';
import Standfirst from 'components/standfirst';
import HeaderMedia from 'headerMedia';
import type { Comment as CommentItem } from 'item';
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
	margin-top: ${remSpace[2]};

	${from.wide} {
		margin-top: ${remSpace[2]};
	}

	${darkModeCss`
        border-top: solid 1px ${neutral[20]};
    `}
`;

const commentLineStylePosition = css`
	margin-top: 83px;
`;

interface Props {
	item: CommentItem;
	children: ReactNode[];
}

const Comment: FC<Props> = ({ item, children }) => (
	<main css={[Styles, DarkStyles]}>
		<article css={BorderStyles}>
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
				<div css={[commentLineStylePosition, lineStyles]}>
					<Lines count={8} />
				</div>

				<div css={articleWidthStyles}>
					<Standfirst item={item} />
				</div>

				<section css={[articleWidthStyles, topBorder]}>
					<Metadata item={item} />
				</section>

				<HeaderMedia item={item} />
				<section css={articleWidthStyles}>{OptionalLogo(item)}</section>
			</header>
			<ArticleBody className={[articleWidthStyles]} format={item}>
				{children}
			</ArticleBody>
			<section css={articleWidthStyles}>
				<Tags tags={item.tags} format={item} />
			</section>
		</article>
		<section css={onwardStyles}>
			<RelatedContent content={item.relatedContent} />
		</section>
		<div id="articleFooter">
			<FooterCcpa isCcpa={false} />
		</div>
	</main>
);

// ----- Exports ----- //

export default Comment;
