import { css } from 'emotion';
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
		<div className={badgeWrapper}>
			<a href={urlPath} className={badgeLink} role="button">
				<img className={imageStyles} src={imageUrl} alt="" />
			</a>
		</div>
	);
};
