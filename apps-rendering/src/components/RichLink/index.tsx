import type { SerializedStyles } from '@emotion/react';
import { css, jsx as styledH } from '@emotion/react';
import {
	background,
	border,
	fill,
	text,
} from '@guardian/common-rendering/src/editorialPalette';
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat, ArticleTheme } from '@guardian/libs';
import {
	from,
	headline,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { SvgArrowRightStraight } from '@guardian/source-react-components';
import { createElement as h } from 'react';
import type { ReactElement } from 'react';
import { darkModeCss, darkModeStyles } from 'styles';

export const richLinkWidth = '8.75rem';

const richLinkPillarStyles = (format: ArticleFormat): string => {
	return `
		border-top: solid 1px ${border.richLink(format)};

		${darkModeStyles`
			border-top: solid 1px ${border.richLinkDark(format)};
		`}

		svg {
			fill: ${fill.richLink(format)};
			background: ${background.richLinkSvg(format)};
			border-color: ${border.richLinkSvg(format)};
			${darkModeStyles`
				border-color: ${border.richLinkSvgDark(format)};
				background: ${background.richLinkSvgDark(format)};
				fill: ${fill.richLinkDark(format)};
			`}
		}

		button {
			color: ${text.richLink(format)};
			${darkModeStyles`
				color: ${text.richLinkDark(format)};
			`}
		}
	`;
};

const liveBlogRichLinkStyles = css`
	float: none;
	width: auto;
	${from.wide} {
		margin-left: 0;
	}
`;

const formatFromTheme = (theme: ArticleTheme): ArticleFormat => ({
	theme,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
});

const richLinkStyles = (format: ArticleFormat): SerializedStyles => {
	return css`
		background: ${background.richLink(format)};
		padding: ${remSpace[3]} ${remSpace[3]} ${remSpace[2]};
		border-top: solid 1px ${border.richLinkPreload(format)};
		transition: all 0.2s ease;

		&.js-news {
			${richLinkPillarStyles(formatFromTheme(ArticlePillar.News))}
		}

		&.js-opinion {
			${richLinkPillarStyles(formatFromTheme(ArticlePillar.Opinion))}
		}

		&.js-sport {
			${richLinkPillarStyles(formatFromTheme(ArticlePillar.Sport))}
		}

		&.js-culture {
			${richLinkPillarStyles(formatFromTheme(ArticlePillar.Culture))}
		}

		&.js-lifestyle {
			${richLinkPillarStyles(formatFromTheme(ArticlePillar.Lifestyle))}
		}

		img {
			width: calc(100% + ${remSpace[6]});
			margin: -${remSpace[3]} 0 0 -${remSpace[3]};
		}

		button {
			background: none;
			border: none;
			${textSans.medium({
				fontWeight: 'bold',
			})}; // Bold for accessibility
			padding: 0;
			margin: 0;
			display: inline-flex;
			transition: all 0.2s ease;
			color: ${text.richLinkAnchor(format)};
			${darkModeStyles`
				color: ${text.richLinkDark(format)};
			`}
		}

		svg {
			width: 1.5rem;
			border-radius: 100%;
			fill: ${fill.richLinkSvgPreload(format)};
			border: solid 1px ${border.richLinkSvgPreload(format)};
			padding: 4px;
			display: inline-block;
			margin-right: ${remSpace[2]};
			transition: all 0.2s ease;
			${darkModeStyles`
				border: 1px solid ${border.richLinkSvgPreloadDark(format)};
				fill: ${fill.richLinkSvgPreloadDark(format)};
			`}
		}

		a {
			display: inline-block;
			text-decoration: none;
			color: ${text.richLinkAnchor(format)};
			max-width: 100%;
			word-wrap: break-word;

			h1 {
				margin: 0 0 ${remSpace[4]} 0;
				${headline.xxxsmall({ fontWeight: 'bold' })}
				hyphens: auto;
				${darkModeStyles`
					color: ${text.richLinkDark(format)};
				`}
			}
		}

		float: left;
		clear: left;
		margin: 0.375rem ${remSpace[4]} ${remSpace[3]} 0;

		width: ${richLinkWidth};
		@media (max-width: 23.4rem) {
			width: 100%;
			box-sizing: border-box;

			img {
				display: none;
			}
		}
		${from.wide} {
			margin-left: calc(
				-${richLinkWidth} - ${remSpace[4]} - ${remSpace[6]}
			);
		}

		${darkModeCss`
			background-color: ${background.richLinkDark(format)};

            a {
                color: ${text.richLinkAnchorDark(format)};
            }
        `}
	`;
};

const styles = (format: ArticleFormat): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css(richLinkStyles(format), liveBlogRichLinkStyles);
		default:
			return richLinkStyles(format);
	}
};

const RichLink = (props: {
	url: string;
	linkText: string;
	format: ArticleFormat;
}): ReactElement => {
	const { url, linkText, format } = props;
	const webUrl = 'https://www.theguardian.com';

	const articleId = url.includes(webUrl)
		? { 'data-article-id': url.replace(webUrl, '/rendered-items') }
		: {};

	const attributes = {
		css: styles(format),
		className: 'js-rich-link',
		...articleId,
	};

	const children = [
		h('h1', { key: `${url}-h1` }, linkText),
		h('button', { key: `${url}-button` }, [
			h(SvgArrowRightStraight, { key: `${url}-svg` }),
			'Read more',
		]),
	];

	return styledH(
		'aside',
		{ ...attributes },
		styledH(
			'a',
			{ href: url },
			format.design === ArticleDesign.LiveBlog ||
				format.design === ArticleDesign.DeadBlog
				? children
				: [
						h(
							'div',
							{ className: 'js-image', key: `${url}-div` },
							null,
						),
						...children,
				  ],
		),
	);
};

export default RichLink;
