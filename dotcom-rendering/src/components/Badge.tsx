import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';

const articleBadgeSizingStyles = css`
	height: 42px;
	${from.leftCol} {
		height: 54px;
	}
`;

const frontBadgeSizingStyles = css`
	height: 50px;

	${from.phablet} {
		height: 90px;
	}

	${from.leftCol} {
		height: 100px;
	}

	${from.wide} {
		height: 140px;
	}
`;

const imageStyles = (isFrontNonEditorialBadge: boolean) => css`
	display: block;
	width: auto;
	max-width: 100%;
	object-fit: contain;
	${isFrontNonEditorialBadge
		? frontBadgeSizingStyles
		: articleBadgeSizingStyles}
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	imageSrc: string;
	href: string;
	isFrontNonEditorialBadge?: boolean;
};

export const Badge = ({
	imageSrc,
	href,
	isFrontNonEditorialBadge = false,
}: Props) => {
	return (
		<div
			css={
				isFrontNonEditorialBadge
					? frontBadgeSizingStyles
					: articleBadgeSizingStyles
			}
		>
			<a href={href} css={badgeLink} role="button">
				<img
					css={imageStyles(isFrontNonEditorialBadge)}
					src={imageSrc}
					alt=""
				/>
			</a>
		</div>
	);
};
