/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerCloseButton.tsx
 */
import { css } from '@emotion/react';
import { Button, SvgCross } from '@guardian/source/react-components';
import type { CtaSettings } from '../settings';
import { buttonStyles, buttonThemes } from '../styles/buttonStyles';

interface DesignableBannerCloseButtonProps {
	onCloseClick: () => void;
	settings: CtaSettings;
}

export function DesignableBannerCloseButton({
	onCloseClick,
	settings,
}: DesignableBannerCloseButtonProps): JSX.Element {
	return (
		<div
			css={css`
				${styles.container}
			`}
		>
			<Button
				onClick={onCloseClick}
				cssOverrides={buttonStyles(
					settings,
					styles.closeButtonOverrides,
				)}
				priority="tertiary"
				theme={buttonThemes(settings, 'tertiary')}
				icon={<SvgCross />}
				size="small"
				hideLabel={true}
			>
				Close
			</Button>
		</div>
	);
}

const styles = {
	container: css`
		display: flex;
		justify-self: end;
		z-index: 100;
	`,
	closeButtonOverrides: css`
		height: 40px;
		min-height: 40px;
		width: 40px;
		min-width: 40px;
	`,
};
