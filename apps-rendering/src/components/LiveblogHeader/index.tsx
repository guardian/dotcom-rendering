// ----- Imports ----- //

import { css, SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import { ArticleFormat } from '@guardian/libs';
import {
	Column,
	Columns,
	Container,
	Hide,
} from '@guardian/source-react-components';
import Headline from 'components/Headline';
import LiveDateline from 'components/LiveDateline';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import { darkModeCss } from 'styles';

// ----- Component ----- //

const containerStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.headline(format)};

	${darkModeCss`
		background-color: ${background.headlineDark(format)};
	`}
`;

const standfirstContainerStyles = (
	format: ArticleFormat,
): SerializedStyles => css`
	background-color: ${background.standfirst(format)};

	${darkModeCss`
		background-color: ${background.standfirstDark(format)};
	`}
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<header>
			<Container element="div" css={containerStyles(format)}>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<Series item={item} />
					</Column>
					<Column span={8}>
						<Headline item={item} />
					</Column>
				</Columns>
			</Container>
			<Container element="div" css={standfirstContainerStyles(format)}>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<Hide below="desktop">
							<LiveDateline
								date={item.publishDate}
								format={format}
							/>
						</Hide>
					</Column>
					<Column span={8}>
						<Standfirst item={item} />
					</Column>
				</Columns>
			</Container>
		</header>
	);
};

// ----- Exports ----- //

export default LiveblogHeader;
