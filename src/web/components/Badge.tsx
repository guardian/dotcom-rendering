import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';

const badgeSizingStyles = css`
	height: 42px;
	${from.leftCol} {
		height: 54px;
	}
`;

const badgeWrapper = css`
	float: left;
	${badgeSizingStyles}
`;

const imageStyles = css`
	display: block;
	width: auto;
	${badgeSizingStyles}
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	imageUrl: string;
	seriesTag: string;
};

export const Badge = ({ imageUrl, seriesTag }: Props) => {
	const urlPath = `/${seriesTag}`;
	return (
		<div css={badgeWrapper}>
			<a href={urlPath} css={badgeLink} role="button">
				<img css={imageStyles} src={imageUrl} alt="" />
			</a>
		</div>
	);
};
