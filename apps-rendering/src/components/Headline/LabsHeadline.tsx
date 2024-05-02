import { css } from '@emotion/react';
import { from, textSans34 } from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const labsStyles = css`
	${textSans34}
	${from.desktop} {
		${textSans34}
	}
`;

interface Props {
	item: Item;
}

const LabsHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), labsStyles)}
	/>
);

export default LabsHeadline;
