import { css } from '@emotion/react';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';
import type { FC } from 'react';
import { remSpace } from '@guardian/source-foundations';

const styles = css`
	padding: ${remSpace[4]} 0 0;
`;

interface Props {
	item: Item;
}

const InterviewStandfirst: FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), styles)}
	/>
);

export default InterviewStandfirst;
