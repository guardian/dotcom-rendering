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
import type { Palette } from '../types/palette';

type IconProps = {
	isFollowing: boolean;
	palette: Palette;
	iconIsFollowing: EmotionJSX.Element;
	iconIsNotFollowing: EmotionJSX.Element;
};

const FollowIcon = ({
	isFollowing,
	palette,
	iconIsFollowing,
	iconIsNotFollowing,
}: IconProps): EmotionJSX.Element => (
	<div
		css={css`
			background-color: ${isFollowing
				? palette.background.unfollowIcon
				: palette.background.followIcon};
			height: 24px;
			width: 24px;
			margin: 0 0.15rem 0 0;
			${isFollowing
				? 'padding: 0.175rem 0 0  0.175rem;'
				: 'padding: 0.135rem 0 0  0.125rem;'}
			border-radius: 100%;
			${!isFollowing && `border: 1px solid ${palette.fill.followIcon};`}

			svg {
				fill: ${isFollowing
					? palette.fill.unfollowIcon
					: palette.fill.followIcon};
				height: 18px;
			}
		`}
	>
		{isFollowing ? iconIsFollowing : iconIsNotFollowing}
	</div>
);

const buttonStyles = (palette: Palette) => css`
	${textSans.small()}
	color: ${palette.text.articleLink};
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
	const palette = decidePalette(format);
	return (
		<>
			<button
				onClick={onClickHandler}
				type="button"
				css={buttonStyles(palette)}
			>
				<span css={containerStyles}>
					<FollowIcon
						palette={palette}
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
