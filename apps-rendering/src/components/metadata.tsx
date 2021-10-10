// ----- Imports ----- //

import { css } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { Design, Display } from '@guardian/types';
import Avatar from 'components/avatar';
import Byline from 'components/byline';
import CommentCount from 'components/commentCount';
import Dateline from 'components/dateline';
import Follow from 'components/follow';
import type { Item } from 'item';
import type { FC } from 'react';
import { ToggleSwitch } from './toggleSwitch';

// ----- Component ----- //

interface Props {
	item: Item;
}

const styles = css`
	display: flex;
	margin-bottom: ${remSpace[5]};
`;

const blogStyles = css`
	display: block;
	margin-bottom: ${remSpace[5]};
`;

const withBylineStyles = css`
	margin-bottom: ${remSpace[5]};
`;

const textStyles = css`
	flex-grow: 1;
`;

const withBylineTextStyles = css`
	padding-top: ${remSpace[1]};
`;

const metaButtomStyles = css`
	display: flex;
`;

const alertStyles = css`
	flex-grow: 1;
`;

const isBlog = (design: Design): boolean =>
	design === Design.LiveBlog || design === Design.DeadBlog;

const MetadataWithByline: FC<Props> = ({ item }: Props) => {
	return (
		<div
			css={css(
				styles,
				withBylineStyles,
				isBlog(item.design) && blogStyles,
			)}
		>
			<Avatar {...item} />
			<div css={css(textStyles, withBylineTextStyles)}>
				<Byline {...item} />
				<Dateline date={item.publishDate} theme={item.theme} />
				<Follow {...item} />
			</div>
			{isBlog(item.design) ? (
				<div css={metaButtomStyles}>
					<div css={alertStyles}>
						<ToggleSwitch
							device="ios"
							label={'Get alerts on this story'}
							onChange={(e) => {
								console.log('changed toggle');
							}}
						></ToggleSwitch>
					</div>
					<CommentCount count={item.commentCount} {...item} />
				</div>
			) : (
				<CommentCount count={item.commentCount} {...item} />
			)}
		</div>
	);
};

const ShortMetadata: FC<Props> = ({ item }: Props) => (
	<div css={styles}>
		<div css={textStyles}>
			<Dateline date={item.publishDate} theme={item.theme} />
			<Follow {...item} />
		</div>
		<CommentCount count={item.commentCount} {...item} />
	</div>
);

const Metadata: FC<Props> = (props: Props) => {
	const { display, design } = props.item;

	if (
		display === Display.Immersive ||
		design === Design.Comment ||
		design === Design.Letter ||
		design === Design.Editorial
	) {
		return <ShortMetadata {...props} />;
	}

	return <MetadataWithByline {...props} />;
};

// ----- Exports ----- //

export default Metadata;
