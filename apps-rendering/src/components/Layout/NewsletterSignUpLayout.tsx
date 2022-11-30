// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import {
	brandAlt,
	remSpace,
	textSans,
	until,
} from '@guardian/source-foundations';
import Footer from 'components/Footer';
import Headline from 'components/Headline';
import MainMedia from 'components/MainMedia';
import RelatedContent from 'components/RelatedContent';
import Standfirst from 'components/Standfirst';
import { grid } from 'grid/grid';
import { getFormat } from 'item';
import type { Item } from 'item';
import type { FC, ReactNode } from 'react';
import { darkModeCss, onwardStyles } from 'styles';
import InPageNewsletterSignup from 'components/InPageNewsletterSignup';
import { OptionKind } from '@guardian/types/dist/option';
import {
	SvgClock,
	SvgNewsletter,
	SvgSpinner,
} from '@guardian/source-react-components';

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
	item: Item;
	children: ReactNode[];
}

const NewsletterSignUpLayout: FC<Props> = ({ item, children }) => {
	const format = getFormat(item);
	const newsletter =
		item.promotedNewsletter.kind === OptionKind.Some
			? item.promotedNewsletter.value
			: undefined;

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
					{newsletter && (
						<div css={detailBlockStyles}>
							<SvgNewsletter size="xsmall" />
							<b>{newsletter.frequency}</b>
							{/* TO DO - this should be the regional focus, but property is not on the MAPI type */}
						</div>
					)}
					<Headline item={item} />
					<Standfirst item={item} />

					{newsletter && (
						<div css={frequencyBlockStyles}>
							<SvgClock size="xsmall" />

							<span>
								You'll receive this newsletter{' '}
								<b>{newsletter.frequency}</b>
							</span>
						</div>
					)}

					{!!newsletter && (
						<InPageNewsletterSignup
							newsletter={newsletter}
							format={getFormat(item)}
							// defaultTo={'form'} // TO DO - remove for production
							fallbackContent={
								<>
									<p>
										app version does not support sign up
										feature
									</p>
									{/* placeholder content */}
								</>
							}
							loadingContent={
								<>
									<p>loading...</p>
									<SvgSpinner size="medium" />
									{/* placeholder content */}
								</>
							}
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
