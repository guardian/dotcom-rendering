// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { Lines } from '@guardian/src-ed-lines';
import { background, neutral } from '@guardian/src-foundations';
import { breakpoints, from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import Footer from 'components/footer';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import RelatedContent from 'components/shared/relatedContent';
import Standfirst from 'components/standfirst';
import Tags from 'components/tags';
import { headlineBackgroundColour } from 'editorialStyles';
import HeaderMedia from 'headerMedia';
import type { Liveblog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import {
	articleWidthStyles,
	darkModeCss,
	lineStyles,
	onwardStyles,
} from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';
import Series from '../series';

// // ----- Styles ----- //

const BorderStyles = css`
	background: ${neutral[100]};
	${darkModeCss`background: ${background.inverse};`}

	${from.wide} {
		width: ${breakpoints.wide}px;
		margin: 0 auto;
	}
`;

const headlineBackgroundStyles = (format: Format): SerializedStyles => css`
	${headlineBackgroundColour(format)};
`;

const liveblogsBackgroundStyles = ({
	liveblogBackground,
	liveblogDarkBackground,
}: ThemeStyles): SerializedStyles => css`
	background-color: ${liveblogBackground};

	@media (prefers-color-scheme: dark) {
		background-color: ${liveblogDarkBackground};
	}
`;

interface Props {
	item: Liveblog;
}

const Live: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const themeStyles = getThemeStyles(format.theme);

	return (
		<main>
			<article className="js-article" css={BorderStyles}>
				<header>
					<div css={headlineBackgroundStyles(format)}>
						<Series item={item} />
						<Headline item={item} />
					</div>
					<div css={liveblogsBackgroundStyles(themeStyles)}>
						<div css={articleWidthStyles}>
							<Standfirst item={item} />
						</div>
						<div css={lineStyles}>
							<Lines count={4} />
						</div>
						<div css={articleWidthStyles}>
							<Metadata item={item} />
						</div>
					</div>
					<div css={articleWidthStyles}>
						<HeaderMedia item={item} />
					</div>
				</header>
			</article>
			<section css={articleWidthStyles}>
				<Tags tags={item.tags} format={item} />
			</section>
			<section css={onwardStyles}>
				<RelatedContent content={item.relatedContent} />
			</section>
			<section css={articleWidthStyles}>
				<Footer isCcpa={false} />
			</section>
		</main>
	);
};

// // ----- Exports ----- //

export default Live;
