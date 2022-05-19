import { css } from '@emotion/react';
import { headline } from '@guardian/source-foundations';
import type { Item } from 'item';
import {
	DefaultHeadline,
	defaultStyles,
	fontSizeRestriction,
} from './Headline.defaults';

const featureStyles = css`
	${headline.medium({ fontWeight: 'bold' })}
`;

interface Props {
	item: Item;
}

const FeatureHeadline: React.FC<Props> = ({ item }) => (
	<DefaultHeadline
		item={item}
		styles={css(defaultStyles(item), featureStyles, fontSizeRestriction)}
	/>
);

export default FeatureHeadline;
