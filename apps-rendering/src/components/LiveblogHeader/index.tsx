// ----- Imports ----- //

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
import {
	headlineBackgroundColour,
	standfirstBackgroundColour,
} from 'editorialStyles';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';

// ----- Component ----- //

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);

	return (
		<header>
			<Container element="div" css={headlineBackgroundColour(format)}>
				<Columns collapseUntil="desktop">
					<Column span={3}>
						<Series item={item} />
					</Column>
					<Column span={8}>
						<Headline item={item} />
					</Column>
				</Columns>
			</Container>
			<Container element="div" css={standfirstBackgroundColour(format)}>
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
