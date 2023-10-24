import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import type { Item } from 'item';
import type { FC } from 'react';
import DefaultMetadata, { defaultStyles } from './Metadata.defaults';

const wrapperStyles = css`
	display: flex;
	flex-direction: column;
	margin-bottom: ${remSpace[5]};
`;

type Props = {
	item: Item;
};

const ExtendedMetadata: FC<Props> = ({ item }) => (
	<div css={wrapperStyles}>
		<DefaultMetadata css={defaultStyles} item={item} withByline={true} />
	</div>
);

export default ExtendedMetadata;
