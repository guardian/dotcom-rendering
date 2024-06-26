import { css } from '@emotion/react';
import { remSpace } from '@guardian/source/foundations';
import type { Item } from 'item';
import DefaultMetadata from './Metadata.defaults';

const wrapperStyles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
`;

const styles = css`
	flex-grow: 1;
	padding-top: 0;
`;

type Props = {
	item: Item;
};

const ShortMetadata = ({ item }: Props) => (
	<div css={wrapperStyles}>
		<DefaultMetadata css={styles} item={item} withByline={false} />
	</div>
);

export default ShortMetadata;
