import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';
import type { Item } from 'item';
import DefaultMetadata, { defaultStyles } from './Metadata.defaults';

const wrapperStyles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
`;

type Props = {
	item: Item;
};

const ExtendedMetadata = ({ item }: Props) => (
	<div css={wrapperStyles}>
		<DefaultMetadata css={defaultStyles} item={item} withByline={true} />
	</div>
);

export default ExtendedMetadata;
