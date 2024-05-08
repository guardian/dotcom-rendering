import { css } from '@emotion/react';
import { textSans17 } from '@guardian/source-foundations';
import type { Item } from 'item';
import { getFormat } from 'item';
import DefaultStandfirst, { defaultStyles } from './Standfirst.defaults';

const labsStyles = css`
	${textSans17}
`;

interface Props {
	item: Item;
}

const LabsStandfirst: React.FC<Props> = ({ item }) => (
	<DefaultStandfirst
		item={item}
		css={css(defaultStyles(getFormat(item)), labsStyles)}
	/>
);

export default LabsStandfirst;
