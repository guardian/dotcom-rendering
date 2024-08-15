/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/common/choiceCard/ChoiceCardsSupportCta.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Hide,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { ContentType } from '../../../../hooks/useChoiceCards';

// Always override the LinkButton border
const buttonOverrides = css`
	margin-right: ${space[3]}px;
	border: none;
`;

export const ChoiceCardsSupportCta = ({
	getCtaText,
	getCtaUrl,
	cssOverrides,
	onCtaClick,
}: {
	getCtaText: (contentType: ContentType) => string;
	getCtaUrl: (contentType: ContentType) => string;
	cssOverrides?: SerializedStyles;
	onCtaClick: () => void;
}): JSX.Element | null => {
	const mobileText = getCtaText('mobileContent');
	const desktopText = getCtaText('mainContent');

	const mobileUrl = getCtaUrl('mobileContent');
	const desktopUrl = getCtaUrl('mainContent');

	return (
		<>
			<Hide above="tablet">
				<LinkButton
					href={mobileUrl}
					onClick={onCtaClick}
					priority="tertiary"
					cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					target="_blank"
					rel="noopener noreferrer"
				>
					{mobileText}
				</LinkButton>
			</Hide>

			<Hide below="tablet">
				<LinkButton
					href={desktopUrl}
					onClick={onCtaClick}
					priority="tertiary"
					cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					target="_blank"
					rel="noopener noreferrer"
				>
					{desktopText}
				</LinkButton>
			</Hide>
		</>
	);
};
