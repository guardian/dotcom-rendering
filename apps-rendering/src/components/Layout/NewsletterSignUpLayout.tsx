// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAlt,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import { SvgClock, SvgNewsletter } from '@guardian/source-react-components';
import { OptionKind } from '../../../vendor/@guardian/types/index';
import ArticleBody from 'components/ArticleBody';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia from 'components/MainMedia';
import RelatedContent from 'components/RelatedContent';
import Standfirst from 'components/Standfirst';
import { WithAgeWarning } from 'components/WithAgeWarning';
import { grid } from 'grid/grid';
import { getFormat } from 'item';
import type { NewsletterSignup } from 'item';
import { maybeRender } from 'lib';
import { background } from 'palette';
import type { FC } from 'react';
import { darkModeCss, onwardStyles } from 'styles';
import InPageNewsletterSignup from '../InPageNewsletterSignup';

// ----- Styles ----- //
const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

const gridContainerStyles = css`
	${grid.container}
`;

const imageRow = css`
	${until.tablet} {
		${grid.column.all};
	}
	${grid.column.centre};
`;

const contentRow = css`
	${grid.column.centre};
`;

const frequencyBlockStyles = css`
	display: flex;
	margin-bottom: ${remSpace[2]};

	span {
		margin-left: ${remSpace[1]};
		${textSans.xsmall()}

		b {
			${textSans.xsmall({ fontWeight: 'bold' })}
		}
	}
`;

const detailBlockStyles = css`
	display: flex;
	align-items: center;
	margin-bottom: ${remSpace[2]};

	svg {
		background-color: ${brandAlt[400]};
		border-radius: 50%;
		margin-right: ${remSpace[2]};
		width: ${remSpace[6]};
		padding: 0.125rem;
	}

	b {
		${textSans.xsmall({ fontWeight: 'bold' })}
	}
`;

// ----- Component ----- //

interface Props {
	item: NewsletterSignup;
}

const NewsletterSignUpLayout: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<main css={backgroundStyles(format)}>
			<article className="js-article" css={gridContainerStyles}>
				<header css={imageRow}>
					<MainMedia
						format={getFormat(item)}
						mainMedia={item.mainMedia}
					/>
				</header>
				<section css={contentRow}>
					<WithAgeWarning
						tags={item.tags}
						series={item.series}
						publishDate={item.publishDate}
						format={format}
					/>
					{maybeRender(item.promotedNewsletter, (newsletter) => (
						<>
							{newsletter.regionFocus && (
								<div css={detailBlockStyles}>
									<SvgNewsletter size="small" />
									<b>{newsletter.regionFocus} Focused</b>
								</div>
							)}
						</>
					))}

					<Headline item={item} />
					<Standfirst item={item} />

					{maybeRender(item.promotedNewsletter, (newsletter) => (
						<>
							<div css={frequencyBlockStyles}>
								<SvgClock size="xsmall" />

								<span>
									You&apos;ll receive this newsletter
									<b> {newsletter.frequency}</b>
								</span>
							</div>

							<InPageNewsletterSignup
								newsletter={newsletter}
								format={getFormat(item)}
								fallbackContent={
									<ArticleBody
										format={item}
										body={item.body}
										shouldHideAdverts={
											item.shouldHideAdverts
										}
									/>
								}
							/>
						</>
					))}
					{item.promotedNewsletter.kind === OptionKind.None && (
						<ArticleBody
							format={item}
							body={item.body}
							shouldHideAdverts={item.shouldHideAdverts}
						/>
					)}
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
