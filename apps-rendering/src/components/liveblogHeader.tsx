// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
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
import { liveblogPhabletSidePadding, liveblogWidthStyles } from 'styles';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';
import Series from './series';

// // ----- Styles ----- //

const headlineBackgroundStyles = (format: Format): SerializedStyles => css`
	${headlineBackgroundColour(format)};
`;

const headerBackgroundStyles = (
	background: string,
	darkBackground: string,
): SerializedStyles => css`
	background-color: ${background};

	@media (prefers-color-scheme: dark) {
		background-color: ${darkBackground};
	}
`;

const metadataStyles = (
	isLive: Boolean,
	themeStyle: ThemeStyles,
): SerializedStyles => css`
	${isLive
		? headerBackgroundStyles(
				themeStyle.liveblogBackground,
				themeStyle.liveblogDarkBackground,
		  )
		: headerBackgroundStyles(neutral[93], neutral[93])}

	${from.desktop} {
		background-color: ${neutral[97]};
		padding: ${remSpace[3]} ${remSpace[5]};
	}
	${from.desktop} {
		display: flex;
	}
`;

const headerMediaStyles = css`
	${from.desktop} {
		padding-left: ${remSpace[5]};
	}
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const isLive = (design: Design): Boolean => design === Design.LiveBlog;

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const themeStyles = getThemeStyles(format.theme);

	return (
		<header>
			<div css={headlineBackgroundStyles(format)}>
				<Series item={item} />
				<Headline item={item} />
			</div>
			<div
				css={headerBackgroundStyles(
					themeStyles.liveblogBackground,
					themeStyles.liveblogDarkBackground,
				)}
			>
				<div css={css(liveblogWidthStyles, liveblogPhabletSidePadding)}>
					<Standfirst item={item} />
				</div>
			</div>
			<div css={metadataStyles(isLive(item.design), themeStyles)}>
				<Metadata item={item} />
				<div css={headerMediaStyles}>
					<HeaderMedia item={item} />
				</div>
			</div>
		</header>
	);
};

// // ----- Exports ----- //

export default LiveblogHeader;
