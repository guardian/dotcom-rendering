// ----- Imports ----- //

import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { ArticleFormat } from '@guardian/libs';
import { remSpace } from '@guardian/source/foundations';
import {
	Column,
	Columns,
	Container,
	Hide,
} from '@guardian/source/react-components';
import Headline from 'components/Headline';
import LiveDateline from 'components/LiveDateline';
import Series from 'components/Series';
import Standfirst from 'components/Standfirst';
import { WithAgeWarning } from 'components/WithAgeWarning';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import { background } from 'palette';
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

const seriesStyles = css`
	padding-bottom: ${remSpace[1]};
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader = ({ item }: Props) => {
	const format = getFormat(item);

	return (
		<header>
			<Container element="div" css={containerStyles(format)}>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<Hide until="desktop">
							<Series item={item} />
						</Hide>
					</Column>
					<Column span={8}>
						<WithAgeWarning
							tags={item.tags}
							series={item.series}
							publishDate={item.publishDate}
							format={format}
						/>
						<Hide from="desktop">
							<div css={seriesStyles}>
								<Series item={item} />
							</div>
						</Hide>
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
