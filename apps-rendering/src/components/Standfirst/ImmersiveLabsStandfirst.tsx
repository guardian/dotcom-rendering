import { css } from '@emotion/react';
import { remSpace, textSans20 } from '@guardian/source/foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const immersiveLabsStyles = css`
	${textSans20};
	margin-top: ${remSpace[3]};
`;

interface Props {
	item: Item;
}

const ImmersiveLabsStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), immersiveLabsStyles)}
	/>
);

export default ImmersiveLabsStandfirst;
