import { css } from '@emotion/react';
import { remSpace, textSans } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

interface Props {
	item: Item;
}

const ImmersiveLabsStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(
			defaultStyles(getFormat(item)),
			css`
				${textSans.large()}
				margin-top: ${remSpace[3]};
			`,
		)}
	/>
);

export default ImmersiveLabsStandfirst;
