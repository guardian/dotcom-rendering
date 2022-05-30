import { css } from '@emotion/react';
import { textSans } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

interface Props {
	item: Item;
}

const LabsStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(
			defaultStyles(getFormat(item)),
			css`
				${textSans.medium()}
			`,
		)}
	/>
);

export default LabsStandfirst;
