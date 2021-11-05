// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { Lines } from '@guardian/source-react-components-development-kitchen';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
import { Design } from '@guardian/types';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import Standfirst from 'components/standfirst';
import { headlineBackgroundColour } from 'editorialStyles';
import HeaderMedia from 'headerMedia';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { articleWidthStyles, darkModeCss, wideContentWidth } from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';
import Series from './series';

// // ----- Styles ----- //

const headlineBackgroundStyles = (format: Format): SerializedStyles => css`
	${headlineBackgroundColour(format)};
`;

const headerBackgroundStyles = ({
	liveblogBackground,
	liveblogDarkBackground,
}: ThemeStyles): SerializedStyles => css`
	background-color: ${liveblogBackground};

	@media (prefers-color-scheme: dark) {
		background-color: ${liveblogDarkBackground};
	}
`;

const isBlog = (format: Format): boolean =>
	format.design === Design.LiveBlog || format.design === Design.DeadBlog;

const lineStyles = (format: Format): SerializedStyles => {
	const lineColour = isBlog(format) ? neutral[93] : neutral[20];

	return css`
		${from.wide} {
			width: ${wideContentWidth}px;
			margin-left: auto;
			margin-right: auto;
		}
		div {
			${darkModeCss`
			background-image: repeating-linear-gradient(
				to bottom,
				${lineColour},
				${lineColour} 1px,
				transparent 1px,
				transparent 3px
				);
			`}
		}
	`;
};

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const themeStyles = getThemeStyles(format.theme);

	return (
		<header>
			<div css={headlineBackgroundStyles(format)}>
				<Series item={item} />
				<Headline item={item} />
			</div>
			<div css={headerBackgroundStyles(themeStyles)}>
				<div css={articleWidthStyles}>
					<Standfirst item={item} />
				</div>
				<div css={lineStyles(format)}>
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
	);
};

// // ----- Exports ----- //

export default LiveblogHeader;
