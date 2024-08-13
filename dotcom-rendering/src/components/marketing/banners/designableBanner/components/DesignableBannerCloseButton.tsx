import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { SvgCross, Button } from '@guardian/source/react-components';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';

interface DesignableBannerCloseButtonProps {
	onCloseClick: () => void;
	settings: CtaSettings;
	styleOverides?: SerializedStyles;
}

export function DesignableBannerCloseButton({
	onCloseClick,
	settings,
	styleOverides,
}: DesignableBannerCloseButtonProps): JSX.Element {
	return (
		<div
			css={css`
				${styles.container} ${styleOverides || ''}
			`}
		>
			<Button
				onClick={onCloseClick}
				cssOverrides={buttonStyles(
					settings,
					styles.closeButtonOverrides,
				)}
				icon={<SvgCross />}
				size="small"
				hideLabel
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
