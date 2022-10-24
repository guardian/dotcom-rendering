import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import Avatar from 'components/Avatar';
import Byline from 'components/Byline';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import { getFormat } from 'item';
import type { Item } from 'item';
import type { FC } from 'react';
import { Styleable } from 'lib';

export const defaultStyles = css`
	flex-grow: 1;
	padding-top: ${remSpace[1]};
`;

type Props = Styleable<{
	item: Item;
	withByline: boolean;
	css?: SerializedStyles;
	className?: string;
}>;

const DefaultMetadata: FC<Props> = ({ item, withByline, className }: Props) => (
	<>
		{withByline && <Avatar {...item} />}
		<div className={className}>
			{withByline && <Byline {...item} />}
			<Dateline
				date={item.publishDate}
				format={item}
				edition={item.edition}
			/>
			<Follow format={getFormat(item)} contributors={item.contributors} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</>
);

export default DefaultMetadata;
