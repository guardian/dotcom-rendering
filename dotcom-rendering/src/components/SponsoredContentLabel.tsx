import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { DCRBadgeType } from '../types/badge';
import { Badge } from './Badge';

type SponsoredContentLabelProps = DCRBadgeType & {
	alignment?: 'start' | 'end';
	ophanComponentName: string;
	orientation?: 'horizontal' | 'vertical';
};

const paidForByStyles = css`
	${textSansBold12};
	color: ${palette('--labs-legacy-treat-text')};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[1]}px;
`;

const wrapperStyles = css`
	display: flex;
	gap: ${space[2]}px;
`;

const horizontalStyles = css`
	align-items: center;
`;

const verticalStyles = {
	start: css`
		flex-direction: column;
	`,
	end: css`
		align-items: end;
		flex-direction: column;
	`,
};

export const SponsoredContentLabel = ({
	alignment = 'start',
	imageSrc,
	href,
	ophanComponentName,
	orientation = 'horizontal',
}: SponsoredContentLabelProps) => {
	return (
		<div
			css={[
				wrapperStyles,
				orientation === 'vertical'
					? verticalStyles[alignment]
					: horizontalStyles,
			]}
		>
			<div css={paidForByStyles}>Paid for by</div>
			<Badge
				href={href}
				imageSrc={imageSrc}
				isInLabsSection={true}
				ophanComponentLink={`labs-logo | ${ophanComponentName}`}
				ophanComponentName={`labs-logo-${ophanComponentName}`}
			/>
		</div>
	);
};
