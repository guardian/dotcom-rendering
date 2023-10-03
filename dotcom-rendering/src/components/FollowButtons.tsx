import { css } from '@emotion/react';
import type { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { remSpace, textSans } from '@guardian/source-foundations';
import {
	SvgCheckmark,
	SvgNotificationsOff,
	SvgNotificationsOn,
	SvgPlus,
} from '@guardian/source-react-components';
import { decidePalette } from '../lib/decidePalette';

type IconProps = {
	isFollowing: boolean;
	format: ArticleFormat;
	iconIsFollowing: EmotionJSX.Element;
	iconIsNotFollowing: EmotionJSX.Element;
};

const FollowIcon = ({
	isFollowing,
	format,
	iconIsFollowing,
	iconIsNotFollowing,
}: IconProps): EmotionJSX.Element => (
	<div
		css={css`
			background-color: ${isFollowing
				? decidePalette(format).fill.shareIcon
				: 'white'};
			height: 24px;
			width: 24px;
			margin: 0 0.3ch 0 0.5ch;
			${isFollowing
				? 'padding: 0.35ch 0 0 0.3ch;'
				: 'padding: 0.25ch 0 0  0.2ch;'}
			border-radius: 100%;
			${!isFollowing && 'border: 1px solid;'}
			border-color: ${!isFollowing &&
			decidePalette(format).text.articleLink};

			svg {
				fill: ${isFollowing
					? 'white'
					: decidePalette(format).fill.shareIcon};
				height: 18px;
			}
		`}
	>
		{isFollowing ? iconIsFollowing : iconIsNotFollowing}
	</div>
);

const buttonStyles = (format: ArticleFormat) => css`
	${textSans.small()}
	color: ${decidePalette(format).text.articleLink};
	background: none;
	border: none;
	display: block;
	margin-top: ${remSpace[1]};
	margin-left: 0;
	min-height: ${remSpace[6]};
	padding: 0;
	text-align: left;
`;

const containerStyles = css`
	display: flex;
	align-items: center;
	column-gap: 0.2em;
`;

// bridget props
type Props = {
	displayName: string;
	isFollowing: boolean;
	format: ArticleFormat;
	onClickHandler: () => void;
};

const notificationsTextSpan = ({
	isFollowing,
}: Pick<Props, 'isFollowing' | 'displayName'>) => (
	<span>Notifications {isFollowing ? 'on' : 'off'}</span>
);

const tagTextSpan = ({
	isFollowing,
	displayName,
}: Pick<Props, 'isFollowing' | 'displayName'>) => (
	<span>
		{isFollowing ? 'Following' : 'Follow'} {displayName}
	</span>
);

const generateFollowButton = ({
	displayName,
	isFollowing,
	format,
	onClickHandler,
	iconIsFollowing,
	iconIsNotFollowing,
	textSpan,
}: Props & {
	iconIsFollowing: EmotionJSX.Element;
	iconIsNotFollowing: EmotionJSX.Element;
	textSpan: EmotionJSX.Element;
}): EmotionJSX.Element => {
	return (
		<>
			<button
				onClick={onClickHandler}
				type="button"
				css={buttonStyles(format)}
			>
				<span css={containerStyles}>
					<FollowIcon
						format={format}
						isFollowing={isFollowing}
						iconIsFollowing={iconIsFollowing}
						iconIsNotFollowing={iconIsNotFollowing}
					/>
					{textSpan}
				</span>
			</button>
		</>
	);
};

export const FollowNotificationsButton = ({
	displayName,
	isFollowing,
	format,
	onClickHandler,
}: Props) =>
	generateFollowButton({
		displayName,
		isFollowing,
		format,
		onClickHandler,
		textSpan: notificationsTextSpan({ isFollowing, displayName }),
		iconIsFollowing: <SvgNotificationsOn />,
		iconIsNotFollowing: <SvgNotificationsOff />,
	});

export const FollowTagButton = ({
	displayName,
	isFollowing,
	format,
	onClickHandler,
}: Props) =>
	generateFollowButton({
		displayName,
		isFollowing,
		format,
		onClickHandler,
		textSpan: tagTextSpan({ isFollowing, displayName }),
		iconIsFollowing: <SvgCheckmark />,
		iconIsNotFollowing: <SvgPlus />,
	});
