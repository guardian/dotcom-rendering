import { css } from '@emotion/react';
import { from, headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const featureStyles = css`
	${headline.small({ fontWeight: 'bold' })}
	${from.tablet} {
		${headline.medium({ fontWeight: 'bold' })}
	}
`;

interface Props {
	item: Item;
}

const FeatureHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), featureStyles)}
	/>
);

export default FeatureHeadline;
