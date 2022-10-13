import type { FC } from 'react';
import type { Item } from 'item';
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import { getFormat } from 'item';
import Avatar from 'components/Avatar';
import Byline from 'components/Byline';
import Dateline from 'components/Dateline';
import CommentCount from 'components/CommentCount';
import Follow from 'components/Follow';

export const defaultStyles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
`;

export const defaultTextStyles = (withByline: boolean): SerializedStyles => css`
	flex-grow: 1;
	padding-top: ${withByline ? remSpace[1] : 0};
`;

type Props = {
	item: Item;
	withByline: boolean;
};

export const DefaultMetadata: FC<Props> = ({ item, withByline }: Props) => (
	<div css={defaultStyles}>
		{withByline && <Avatar {...item} />}
		<div css={defaultTextStyles(withByline)}>
			{withByline && <Byline {...item} />}
			<Dateline
				date={item.publishDate}
				format={item}
				edition={item.edition}
			/>
			<Follow format={getFormat(item)} contributors={item.contributors} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);
