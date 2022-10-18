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
	css?: SerializedStyles;
	className?: string;
	textCss?: SerializedStyles;
};

const DefaultMetadata: FC<Props> = ({
	item,
	withByline,
	className,
	textCss,
}: Props) => (
	<div className={className}>
		{withByline && <Avatar {...item} />}
		<div css={textCss}>
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
export default DefaultMetadata;
