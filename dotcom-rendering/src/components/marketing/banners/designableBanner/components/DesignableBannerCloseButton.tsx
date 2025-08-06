/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerCloseButton.tsx
 */
import { css } from '@emotion/react';
import { space } from '@guardian/source/foundations';
import {
	Button,
	LinkButton,
	SvgCross,
} from '@guardian/source/react-components';
import type { CtaSettings } from '../settings';
import { buttonStyles, buttonThemes } from '../styles/buttonStyles';

interface DesignableBannerCloseButtonProps {
	onCloseClick: () => void;
	settings: CtaSettings;
	isCollapsableBanner?: boolean;
}

export function DesignableBannerCloseButton({
	onCloseClick,
	settings,
	isCollapsableBanner = false,
}: DesignableBannerCloseButtonProps): JSX.Element {
	return (
		<div
			css={css`
				${styles.container}
			`}
		>
			{isCollapsableBanner ? (
				<LinkButton
					onClick={onCloseClick}
					cssOverrides={buttonStyles(
						settings,
						styles.closeABTestButtonOverrides,
					)}
					priority="tertiary"
					theme={buttonThemes(settings, 'tertiary')}
					size="small"
				>
					Close
				</LinkButton>
			) : (
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
			)}
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
	closeABTestButtonOverrides: css`
		justify-self: end;
		width: max-content;
		padding: 0;
		border: 0;
		text-decoration: underline;
		font-weight: normal;
		font-size: 16px;
		border-radius: unset;
		background-color: inherit;
		margin-top: ${space[1]}px;
	`,
};
