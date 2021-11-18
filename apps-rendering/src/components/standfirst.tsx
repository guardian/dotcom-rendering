// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, ArticleSpecial } from '@guardian/libs';
import { remSpace } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { map, withDefault } from '@guardian/types';
import { background, text } from 'editorialPalette';
import type { Item } from 'item';
import { getFormat } from 'item';
import { pipe } from 'lib';
import type { FC, ReactElement, ReactNode } from 'react';
import { renderStandfirstText } from 'renderer';
import { darkModeCss as darkMode } from 'styles';

// ----- Component ----- //

interface Props {
	item: Item;
}

const darkStyles = (format: ArticleFormat): SerializedStyles => darkMode`
    background: ${background.standfirstPrimaryInverse(format)};
    color: ${text.standfirstPrimaryInverse(format)};

    a {
        color: ${text.standfirstPrimaryInverse(format)};
        border-bottom: 0.0625rem solid ${neutral[46]};
    }
`;

const isNotBlog = (format: ArticleFormat): boolean =>
	format.design !== ArticleDesign.LiveBlog &&
	format.design !== ArticleDesign.DeadBlog;

const styles = (format: ArticleFormat): SerializedStyles => css`
	margin-bottom: ${remSpace[3]};
	color: ${text.standfirstPrimary(format)};
	background-color: ${background.standfirstPrimary(format)};

	p,
	ul {
		margin: ${remSpace[3]} 0;
	}

	address {
		font-style: normal;
	}

	${isNotBlog(format) && darkStyles(format)}
`;

const normalHeadline = css`
	${headline.xxxsmall({ fontWeight: 'bold' })}
	padding: 0;
`;

const thinHeadline = css`
	${headline.xxsmall({ fontWeight: 'light' })}
`;

const immersive: SerializedStyles = css`
	${headline.xsmall({ fontWeight: 'light' })}
	margin-top: ${remSpace[3]};
`;

const immersiveLabs: SerializedStyles = css`
	${textSans.large()}
	margin-top: ${remSpace[3]};
`;

const liveblogStyles: SerializedStyles = css`
	${headline.xxxsmall()};
	margin-bottom: 0;
	padding-bottom: ${remSpace[3]};

	p {
		margin: 0;
		padding: 0.75rem 0;
	}

	ul {
		margin-bottom: 0;
	}
`;

const media = (format: ArticleFormat): SerializedStyles => css`
	color: ${text.standfirstPrimary(format)};
	p,
	ul,
	li {
		${headline.xxxsmall({ fontWeight: 'bold' })}
	}
`;

const advertisementFeature = css`
	${textSans.medium()}
`;

const getStyles = (item: Item): SerializedStyles => {
	const format = getFormat(item);
	if (item.display === ArticleDisplay.Immersive) {
		return item.theme === ArticleSpecial.Labs
			? css(styles(format), immersiveLabs)
			: css(styles(format), immersive);
	}

	if (item.theme === ArticleSpecial.Labs) {
		return css(styles(format), advertisementFeature);
	}

	switch (item.design) {
		case ArticleDesign.LiveBlog:
			return css(styles(format), liveblogStyles);
		case ArticleDesign.Review:
		case ArticleDesign.Feature:
		case ArticleDesign.Editorial:
		case ArticleDesign.Letter:
		case ArticleDesign.Comment:
			return css(styles(format), thinHeadline);
		case ArticleDesign.Media:
			return media(format);

		default:
			return css(styles(format), normalHeadline);
	}
};
function content(standfirst: DocumentFragment, item: Item): ReactNode {
	const format = getFormat(item);
	const rendered = renderStandfirstText(standfirst, format);

	// Immersives append the byline to the standfirst.
	// Sometimes CAPI includes this within the standfirst HTML,
	// sometimes we have to add it ourselves
	const bylineInStandfirst =
		item.byline !== '' && standfirst.textContent?.includes(item.byline);

	if (item.display === ArticleDisplay.Immersive && !bylineInStandfirst) {
		return pipe(
			item.bylineHtml,
			map((byline) => (
				<>
					{rendered}
					<address>
						<p>By {renderStandfirstText(byline, format)}</p>
					</address>
				</>
			)),
			withDefault<ReactNode>(rendered),
		);
	}

	return rendered;
}

const Standfirst: FC<Props> = ({ item }) =>
	pipe(
		item.standfirst,
		map((standfirst) => (
			<div css={getStyles(item)}>{content(standfirst, item)}</div>
		)),
		withDefault<ReactElement | null>(null),
	);

// ----- Exports ----- //

export default Standfirst;
