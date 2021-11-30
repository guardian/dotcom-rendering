// // ----- Imports ----- //

import { css } from '@emotion/react';
import type { SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import {
	from,
	neutral,
	remSpace,
	textSans,
} from '@guardian/source-foundations';
import { Column, Columns, Container } from '@guardian/source-react-components';
import Headline from 'components/headline';
import Metadata from 'components/metadata';
import Standfirst from 'components/standfirst';
import HeaderMedia from 'headerMedia';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import type { ThemeStyles } from 'themeStyles';
import { getThemeStyles } from 'themeStyles';
import Series from './series';

// ----- Component ----- //

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

const timestampStyles = css`
	color: ${neutral[100]};
	${textSans.xxsmall({ lineHeight: 'tight' })}
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);
	const themeStyles = getThemeStyles(format.theme);

	return (
		<header>
			<Container
				element="div"
				backgroundColor={background.headline(format)}
			>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<Series item={item} />
					</Column>
					<Column span={8}>
						<Headline item={item} />
					</Column>
				</Columns>
			</Container>
			<Container
				element="div"
				backgroundColor={background.standfirst(format)}
			>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<time css={timestampStyles}>
							TODO: Updated timestamp
						</time>
					</Column>
					<Column span={8}>
						<Standfirst item={item} />
					</Column>
				</Columns>
			</Container>
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
