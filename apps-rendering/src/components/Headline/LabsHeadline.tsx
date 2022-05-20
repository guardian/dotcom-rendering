import { css } from '@emotion/react';
import { from, textSans } from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const labsStyles = css`
	${textSans.xxxlarge({ lineHeight: 'regular' })}
	${from.desktop} {
		${textSans.xxxlarge({ lineHeight: 'regular' })}
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
