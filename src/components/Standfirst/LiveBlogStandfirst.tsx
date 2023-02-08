import { css } from '@emotion/react';
import { headline, neutral, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import { darkModeCss } from 'styles';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const liveBlogStyles = css`
	${headline.xxxsmall()};
	margin-bottom: 0;
	padding-bottom: ${remSpace[3]};

	p {
		margin: 0;
		padding: 0.75rem 0;

		${darkModeCss`color: ${neutral[93]};`}
	}

	ul {
		margin-bottom: 0;
	}
`;

interface Props {
	item: Item;
}

const LiveBlogStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), liveBlogStyles)}
	/>
);

export default LiveBlogStandfirst;
