// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import type { Format } from '@guardian/types';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import Standfirst from 'components/standfirst';
import { headlineBackgroundColour } from 'editorialStyles';
import HeaderMedia from 'headerMedia';
import type { Liveblog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { articleWidthStyles } from 'styles';
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

interface Props {
	item: Liveblog;
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
				<div>
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
