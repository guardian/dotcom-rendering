import { css } from '@emotion/react';
import { remSpace, textSans } from '@guardian/source-foundations';
import { decidePalette } from '../lib/decidePalette';

type IconProps = {
	isFollowing: boolean;
};

const FollowIcon = ({ isFollowing }: IconProps) => {
	const check =
		'M16.171 10.64L15.411 11.34L16.206 12.09L16.947 12.806L20 9.924L19.259 9.208L16.947 11.391L16.171 10.641L16.171 10.64Z';
	const plus =
		'M17.667 13.5h-1v-2.167H14.5v-1h2.167V8.167h1v2.166h2.166v1h-2.166V13.5z';

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={isFollowing ? 'icon following' : 'icon follow'}
			viewBox="0 0 24 24"
		>
			<path
				fillRule="evenodd"
				d={`M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24z
			M13.488 11.507C12.783 11.389 12.068 11.333 11.353 11.34C9.8 11.34 8.529 11.54 7.118 11.99L6.394 12.673L5 17.673L5.688 18.34L16.982 18.34L17.706 17.673L16.929 14.94C15.129 14.64 13.682 13.24 13.489 11.507L13.488 11.507Z
			M14.159 6.973C14.159 8.64 12.641 10.007 11.353 10.007C10.206 10.007 8.565 8.64 8.565 6.973C8.565 5.307 9.588 4.34 11.353 4.34C13.118 4.34 14.159 5.307 14.159 6.973Z ${
				isFollowing ? check : plus
			}`}
			/>
		</svg>
	);
};

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

	svg {
		fill: currentColor;
		height: ${remSpace[6]};
		width: ${remSpace[6]};
	}
`;

const containerStyles = css`
	display: flex;
	align-items: center;
	column-gap: 0.2em;
`;

type Props = {
	displayName: string;
	isFollowing: boolean;
	format: ArticleFormat;
	onClickHandler: () => void;
};

export const FollowButton = ({
	displayName,
	isFollowing,
	format,
	onClickHandler,
}: Props) => {
	return (
		<>
			<button
				onClick={onClickHandler}
				type="button"
				css={buttonStyles(format)}
			>
				<span css={containerStyles}>
					<FollowIcon isFollowing={isFollowing} />
					<span>
						{isFollowing ? 'Unfollow' : 'Follow'} {displayName}
					</span>
				</span>
			</button>
		</>
	);
};
