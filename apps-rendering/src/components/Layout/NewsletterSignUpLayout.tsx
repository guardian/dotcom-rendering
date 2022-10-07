// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { breakpoints, from, remSpace } from '@guardian/source-foundations';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import RelatedContent from 'components/RelatedContent';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { getFormat } from 'item';
import type { Standard as StandardItem } from 'item';
import type { FC, ReactNode } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	onwardStyles,
	wideContentWidth,
} from 'styles';
import NewsletterSignUpPageBanner from 'components/NewsletterSignUpPageBanner';
import NewsletterSignUpPageForm from 'components/NewsletterSignUpPageForm';
import { Newsletter } from '@guardian/apps-rendering-api-models/newsletter';
import { tabletContentWidth } from 'components/editions/styles';

// --- constants ---//
const TEST_NEWSLETTER = {
	identityName: 'test',
} as Newsletter;

// ----- Styles ----- //
const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const sectionStyles = (format: ArticleFormat): SerializedStyles => css`
	margin: 0 auto;

	${from.tablet} {
		width: ${tabletContentWidth}px;
	}

	${from.desktop} {
		width: ${wideContentWidth}px;
	}

	padding: ${remSpace[1]};
`;

const BorderStyles = css`
	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

interface Props {
	item: StandardItem;
	children: ReactNode[];
}

const NewsletterSignUpLayout: FC<Props> = ({ item, children }) => {
	const format = getFormat(item);

	return (
		<main css={backgroundStyles(format)}>
			<article className="js-article" css={BorderStyles}>
				<header>
					<NewsletterSignUpPageBanner format={format} />
					<Headline item={item} />

					<Series item={item} />
					<div css={articleWidthStyles}>
						<Standfirst item={item} />
					</div>

					<section css={articleWidthStyles}>
						<Logo item={item} />
					</section>
				</header>

				<section css={sectionStyles(format)}>
					<NewsletterSignUpPageForm
						format={format}
						newsletter={TEST_NEWSLETTER}
					/>
				</section>
				<section css={sectionStyles(format)}>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
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
