import { css } from '@emotion/react';
import { remSpace } from '@guardian/source-foundations';
import {
	DottedLines,
	StraightLines,
} from '@guardian/source-react-components-development-kitchen';
import Avatar from 'components/Avatar';
import Byline from 'components/Byline';
import { hasLocationOrTitleInfo } from 'components/Byline/Byline.defaults';
import CommentCount from 'components/CommentCount';
import Dateline from 'components/Dateline';
import Follow from 'components/Follow';
import type { Item } from 'item';
import { getFormat } from 'item';
import type { Styleable } from 'lib';
import type { FC } from 'react';

export const defaultStyles = css`
	flex-grow: 1;
	padding-top: ${remSpace[1]};
`;

const flexRowStyles = css`
	display: flex;
	flex-direction: row;
	align-items: stretch;
`;
const flexColStyles = css`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

type Props = Styleable<{
	item: Item;
	withByline: boolean;
	withBylineDottedLine?: boolean;
}>;

const DefaultMetadata: FC<Props> = ({
	item,
	withByline,
	withBylineDottedLine = true,
	className,
}: Props) => {
	return (
		<>
			<div css={flexColStyles}>
				{hasLocationOrTitleInfo(item.bylineHtml) ? (
					<div css={flexRowStyles}>
						<div
							css={css`
								width: 100%;
							`}
						>
							<div css={flexRowStyles}>
								{withByline && <Avatar {...item} />}
								{withByline && <Byline {...item} />}
							</div>
							{withBylineDottedLine && <DottedLines count={1} />}
							<Follow
								format={getFormat(item)}
								contributors={item.contributors}
							/>
						</div>
						<CommentCount count={item.commentCount} {...item} />
					</div>
				) : (
					<div css={flexRowStyles}>
						{withByline && <Avatar {...item} />}
						<div className={className}>
							<div>{withByline && <Byline {...item} />}</div>
							{withBylineDottedLine && <DottedLines count={1} />}
							<Follow
								format={getFormat(item)}
								contributors={item.contributors}
							/>
						</div>
						<CommentCount count={item.commentCount} {...item} />
					</div>
				)}
				<StraightLines count={1} />
				<Dateline
					date={item.publishDate}
					format={item}
					edition={item.edition}
				/>
			</div>
		</>
	);
};

export default DefaultMetadata;
