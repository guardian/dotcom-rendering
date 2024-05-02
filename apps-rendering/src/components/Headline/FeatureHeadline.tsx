import { css } from '@emotion/react';
import {
	from,
	headlineBold28,
	headlineBold34,
} from '@guardian/source-foundations';
import type { Item } from 'item';
import { DefaultHeadline, defaultStyles } from './Headline.defaults';

const featureStyles = css`
	${headlineBold28}
	${from.tablet} {
		${headlineBold34}
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
