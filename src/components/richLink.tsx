import type { SerializedStyles } from '@emotion/core';
import { css, jsx as styledH } from '@emotion/core';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { headline, textSans } from '@guardian/src-foundations/typography';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { Design, Pillar } from '@guardian/types/Format';
import type { Format } from '@guardian/types/Format';
import { createElement as h } from 'react';
import type { ReactElement } from 'react';
import { basePx, darkModeCss, darkModeStyles } from 'styles';
import { getThemeStyles } from 'themeStyles';

export const richLinkWidth = '8.75rem';

const richLinkPillarStyles = (kicker: string): string => {
	return `
		border-top: solid 1px ${kicker};

		${darkModeStyles`
			border-top: solid 1px ${neutral[60]};
		`}

		svg {
			fill: white;
			background: ${kicker};
			border-color: ${kicker};
			${darkModeStyles`
				border-color: ${neutral[60]};
				background: ${neutral[20]};
				fill: ${neutral[60]};
			`}
		}

		button {
			color: ${kicker};
			${darkModeStyles`
				color: ${neutral[60]};
			`}
		}
	`;
};

const richLinkStyles = (format: Format): SerializedStyles => {
	const backgroundColor =
		format.design === Design.Comment ? neutral[86] : neutral[97];

	const { kicker: newsKicker } = getThemeStyles(Pillar.News);
	const { kicker: opinionKicker } = getThemeStyles(Pillar.Opinion);
	const { kicker: sportKicker } = getThemeStyles(Pillar.Sport);
	const { kicker: cultureKicker } = getThemeStyles(Pillar.Culture);
	const { kicker: lifestyleKicker } = getThemeStyles(Pillar.Lifestyle);

	return css`
		background: ${backgroundColor};
		padding: ${basePx(1)};
		border-top: solid 1px ${neutral[60]};
		transition: all 0.2s ease;

		&.js-news {
			${richLinkPillarStyles(newsKicker)}
		}

		&.js-opinion {
			${richLinkPillarStyles(opinionKicker)}
		}

		&.js-sport {
			${richLinkPillarStyles(sportKicker)}
		}

		&.js-culture {
			${richLinkPillarStyles(cultureKicker)}
		}

		&.js-lifestyle {
			${richLinkPillarStyles(lifestyleKicker)}
		}

		.js-image img {
			width: calc(100% + ${basePx(2)});
			margin: -${basePx(1)} 0 0 -${basePx(1)};
		}

		button {
			background: none;
			border: none;
			${textSans.medium()};
			padding: 0;
			margin: 0;
			display: inline-flex;
			transition: all 0.2s ease;
		}

		svg {
			width: 1.0625rem;
			border-radius: 100%;
			border: solid 1px ${neutral[7]};
			padding: 4px;
			display: inline-block;
			margin-right: ${remSpace[2]};
			transition: all 0.2s ease;
		}

		a {
			display: inline-block;
			text-decoration: none;
			color: ${neutral[7]};

			h1 {
				margin: ${basePx(0, 0, 2, 0)};
				${headline.xxxsmall({ fontWeight: 'bold' })}
				hyphens: auto;
			}
		}

		float: left;
		clear: left;
		margin: ${basePx(1, 2, 1, 0)};

		width: ${richLinkWidth};
		${from.wide} {
			margin-left: calc(-${richLinkWidth} - ${basePx(2)} - ${basePx(3)});
		}

		${darkModeCss`
			background-color: ${neutral[20]};

            a, h1 {
                color: ${neutral[60]};
            }
        `}
	`;
};

const RichLink = (props: {
	url: string;
	linkText: string;
	format: Format;
}): ReactElement => {
	const webUrl = 'https://www.theguardian.com';

	const articleId = props.url.includes(webUrl)
		? { 'data-article-id': props.url.replace(webUrl, '') }
		: {};

	const attributes = {
		css: richLinkStyles(props.format),
		className: 'js-rich-link',
		...articleId,
	};

	return styledH(
		'aside',
		{ ...attributes },
		styledH('a', { href: props.url }, [
			h('div', { className: 'js-image' }, null),
			h('h1', null, props.linkText),
			h('button', null, [h(SvgArrowRightStraight), 'Read more']),
		]),
	);
};

export default RichLink;
