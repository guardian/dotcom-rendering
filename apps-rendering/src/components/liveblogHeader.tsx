// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { neutral, remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { Format } from '@guardian/types';
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

const headerBackgroundStyles = ({
	liveblogBackground,
	liveblogDarkBackground,
}: ThemeStyles): SerializedStyles => css`
	background-color: ${liveblogBackground};

	@media (prefers-color-scheme: dark) {
		background-color: ${liveblogDarkBackground};
	}
`;

const metadataStyles = (themeStyle: ThemeStyles): SerializedStyles => css`
	${headerBackgroundStyles(themeStyle)}

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
				<div css={css(liveblogWidthStyles, liveblogPhabletSidePadding)}>
					<Standfirst item={item} />
				</div>
			</div>
			<div css={metadataStyles(themeStyles)}>
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
