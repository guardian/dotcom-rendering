// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	breakpoints,
	from,
} from '@guardian/source-foundations';
import Body from 'components/ArticleBody';
import { tabletContentWidth } from 'components/editions/styles';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import RelatedContent from 'components/RelatedContent';
import Standfirst from 'components/Standfirst';
import { getFormat, Item } from 'item';
import type { FC, ReactNode } from 'react';
import {
	darkModeCss,
	onwardStyles,
	sidePadding,
	wideContentWidth,
} from 'styles';

// ----- Styles ----- //
const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const articleWidthStyles: SerializedStyles = css`
	margin: 0 auto;
	position: relative;

	${from.phablet} {
		max-width: ${tabletContentWidth}px;
	}

	${from.desktop} {
		max-width: ${wideContentWidth}px;
	}

	${sidePadding.styles}
`;

const borderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

// ----- Component ----- //
interface Props {
	item: Item;
	children: ReactNode[];
}

const NewsletterSignUpLayout: FC<Props> = ({ item, children }) => {
	const format = getFormat(item);

	return (
		<main css={backgroundStyles(format)}>
			<article className="js-article" css={borderStyles}>
				<header>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>

					<div css={articleWidthStyles}>
						<Headline item={item} />
						<Standfirst item={item} />
						<Logo item={item} />
					</div>
				</header>

				<section css={articleWidthStyles}>
					<Body format={item}>{children}</Body>
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

export default NewsletterSignUpLayout;
