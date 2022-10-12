// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { NewsletterBadge } from '@guardian/common-rendering/src/components/NewsletterBadge';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	brand,
	breakpoints,
	from,
	neutral,
	remSpace,
} from '@guardian/source-foundations';
import { SvgGuardianLogo } from '@guardian/source-react-components';
import Body from 'components/ArticleBody';
import { tabletContentWidth } from 'components/editions/styles';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import Logo from 'components/Logo';
import MainMedia from 'components/MainMedia';
import RelatedContent from 'components/RelatedContent';
import Standfirst from 'components/Standfirst';
import { getFormat } from 'item';
import type { Standard as StandardItem } from 'item';
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

const sectionStyles: SerializedStyles = css`
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

const bannerStyle: SerializedStyles = css`
	background-color: ${brand[400]};
	padding: ${remSpace[2]} 0 ${remSpace[9]};
`;

const figureStyle: SerializedStyles = css`
	display: block;
	width: 11rem;
	position: relative;
`;

const logoWrapper: SerializedStyles = css`
	display: flex;
	width: 65%;
	margin-bottom: ${remSpace[1]};
`;

const badgeWrapper: SerializedStyles = css`
	font-size: 1rem;
	display: flex;
	width: 100%;
`;

// ----- Component ----- //
interface Props {
	item: StandardItem;
	children: ReactNode[];
}

const NewsletterSignUpLayout: FC<Props> = ({ item, children }) => {
	const format = getFormat(item);

	return (
		<main css={backgroundStyles(format)}>
			<article className="js-article" css={borderStyles}>
				<header>
					<div css={bannerStyle}>
						<div css={sectionStyles}>
							<figure
								css={figureStyle}
								role="figure"
								aria-label="The Guardian Newsletters"
							>
								<span css={logoWrapper}>
									<SvgGuardianLogo
										textColor={neutral[100]}
										width={200}
									/>
								</span>
								<span css={badgeWrapper}>
									<NewsletterBadge />
								</span>
							</figure>
						</div>
					</div>

					<div css={sectionStyles}>
						<Headline item={item} />
						<Standfirst item={item} />
						<Logo item={item} />
					</div>
				</header>

				<section css={sectionStyles}>
					<Body format={item}>{children}</Body>
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
