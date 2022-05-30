import { css } from '@emotion/react';
import { headline, remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

interface Props {
	item: Item;
}

const ImmersiveStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(
			defaultStyles(getFormat(item)),
			css`
				${headline.xsmall({ fontWeight: 'light' })}
				margin-top: ${remSpace[3]};
			`,
		)}
	/>
);

export default ImmersiveStandfirst;
