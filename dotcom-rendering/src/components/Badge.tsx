import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';

const frontsSectionBadgeSizingStyles = css`
	height: auto;
	width: 100px;

	${from.phablet} {
		width: 120px;
	}

	${from.tablet} {
		width: 140px;
	}

	${from.leftCol} {
		width: 200px;
	}
`;

const labsSectionBadgeSizingStyles = css`
	height: auto;
	width: 100px;

	${from.phablet} {
		width: 120px;
	}
`;

const imageStyles = (isInLabsSection: boolean) => css`
	display: block;
	width: auto;
	max-width: 100%;
	object-fit: contain;
	${isInLabsSection
		? labsSectionBadgeSizingStyles
		: frontsSectionBadgeSizingStyles}
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	imageSrc: string;
	href: string;
	isInLabsSection?: boolean;
};

export const Badge = ({ imageSrc, href, isInLabsSection = false }: Props) => {
	return (
		<a href={href} css={badgeLink} role="button">
			<img css={imageStyles(isInLabsSection)} src={imageSrc} alt="" />
		</a>
	);
};
