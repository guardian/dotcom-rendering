import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';

const badgeSizingStyles = css`
	height: 42px;
	${from.leftCol} {
		height: 54px;
	}
`;

const imageStyles = css`
	display: block;
	width: auto;
	max-width: 100%;
	object-fit: contain;
	${badgeSizingStyles}
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	imageSrc: string;
	href: string;
};

export const Badge = ({ imageSrc, href }: Props) => {
	return (
		<div css={badgeSizingStyles}>
			<a href={href} css={badgeLink} role="button">
				<img css={imageStyles} src={imageSrc} alt="" />
			</a>
		</div>
	);
};
