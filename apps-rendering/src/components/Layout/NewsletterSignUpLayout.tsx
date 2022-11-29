// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { ArticleFormat } from '@guardian/libs';
import { until } from '@guardian/source-foundations';
import Body from 'components/ArticleBody';
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

// ----- Component ----- //
interface Props {
	item: Item;
	children: ReactNode[];
}

const NewsletterSignUpLayout: FC<Props> = ({ item, children }) => {
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
					<Headline item={item} />
					<Standfirst item={item} />

					<InPageNewsletterSignup
						newsletter={{
							identityName: 'patriarchy',
							description:
								'Reviewing the most important stories on feminism and sexism and those fighting for equality',
							name: 'The Week in Patriarchy',
							frequency: 'Weekly',
							theme: 'opinion',
							successDescription: 'signed up',
						}}
						format={getFormat(item)}
						defaultTo={'form'}
						fallbackContent={<Body format={item}>{children}</Body>}
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
