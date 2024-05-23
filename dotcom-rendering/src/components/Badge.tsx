import { css } from '@emotion/react';
import { between, from } from '@guardian/source/foundations';

const frontsSectionBadgeSizingStyles = css`
	height: auto;
	width: 120px;

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

const imageAdvertisingPartnerStyles = css`
	${between.leftCol.and.wide} {
		max-width: 130px;
	}
`;

const imageStyles = css`
	display: block;
	width: auto;
	max-width: 100%;
	object-fit: contain;
`;

const badgeLink = css`
	text-decoration: none;
`;

type Props = {
	imageSrc: string;
	href: string;
	ophanComponentLink?: string;
	ophanComponentName?: string;
	isInLabsSection?: boolean;
	isAdvertisingPartner?: boolean;
	inAdvertisingPartnerABTest?: boolean;
};

export const Badge = ({
	imageSrc,
	href,
	ophanComponentLink,
	ophanComponentName,
	isInLabsSection = false,
	isAdvertisingPartner = false,
	inAdvertisingPartnerABTest = false,
}: Props) => {
	return (
		<a
			href={href}
			data-link-name={ophanComponentLink}
			data-component={ophanComponentName}
			css={badgeLink}
		>
			<img
				css={[
					imageStyles,
					isInLabsSection
						? labsSectionBadgeSizingStyles
						: frontsSectionBadgeSizingStyles,
					isAdvertisingPartner &&
						inAdvertisingPartnerABTest &&
						imageAdvertisingPartnerStyles,
				]}
				src={imageSrc}
				alt={isInLabsSection ? 'Labs sponsor logo' : ''}
			/>
		</a>
	);
};
