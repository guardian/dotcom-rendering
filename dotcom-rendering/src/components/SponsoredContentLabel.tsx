import { css } from '@emotion/react';
import { space, textSansBold12 } from '@guardian/source/foundations';
import { palette } from '../palette';
import type { DCRBadgeType } from '../types/badge';
import type { Branding } from '../types/branding';
import { Badge } from './Badge';

type SponsoredContentLabelProps = DCRBadgeType & {
	logo: Branding['logo'];
	logoForDarkBackground?: Branding['logoForDarkBackground'];
	sponsorName: string;
	labelText?: string;
	alignment?: 'start' | 'end';
	orientation?: 'horizontal' | 'vertical';
	ophanComponentName?: string;
	ophanComponentLink?: string;
};

const sponsoredByStyles = css`
	${textSansBold12};
	color: ${palette('--labs-header-label-text')};
	margin-top: ${space[3]}px;
	margin-bottom: ${space[1]}px;
`;

const wrapperStyles = css`
	display: flex;
	gap: ${space[2]}px;
	justify-content: end;
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
	logo,
	logoForDarkBackground,
	sponsorName,
	labelText = 'Paid for by',
	alignment = 'start',
	orientation = 'horizontal',
	ophanComponentLink,
	ophanComponentName,
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
			<div css={sponsoredByStyles}>{labelText}</div>
			<Badge
				logo={logo}
				logoForDarkBackground={logoForDarkBackground}
				sponsorName={sponsorName}
				ophanComponentLink={ophanComponentLink}
				ophanComponentName={ophanComponentName}
			/>
		</div>
	);
};
