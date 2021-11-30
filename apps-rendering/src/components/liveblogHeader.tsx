// ----- Imports ----- //

import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import { neutral } from '@guardian/src-foundations';
import { textSans } from '@guardian/src-foundations/typography';
import { Column, Columns, Container } from '@guardian/src-layout';
import Headline from 'components/headline';
import Standfirst from 'components/standfirst';
import type { DeadBlog, LiveBlog } from 'item';
import { getFormat } from 'item';
import type { FC } from 'react';
import Series from './series';

// ----- Component ----- //

const timestampStyles = css`
	color: ${neutral[100]};
	${textSans.xxsmall({ lineHeight: 'tight' })}
`;

interface Props {
	item: LiveBlog | DeadBlog;
}

const LiveblogHeader: FC<Props> = ({ item }) => {
	const format = getFormat(item);

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
		</header>
	);
};

// ----- Exports ----- //

export default LiveblogHeader;
