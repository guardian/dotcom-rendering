import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import type { ThemeButton } from '@guardian/source/react-components';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
} from '@guardian/source/react-components';
import { palette } from '../palette';

type Props = {
	previousButtonEnabled: boolean;
	nextButtonEnabled: boolean;
	onClickPreviousButton: () => void;
	onClickNextButton: () => void;
	dataLinkNameNextButton: string;
	dataLinkNamePreviousButton: string;
};

const themeButton: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border'),
	textTertiary: palette('--carousel-chevron'),
	backgroundTertiaryHover: palette('--carousel-chevron-hover'),
};

const themeButtonDisabled: Partial<ThemeButton> = {
	borderTertiary: palette('--carousel-chevron-border-disabled'),
	textTertiary: palette('--carousel-chevron-disabled'),
	backgroundTertiaryHover: 'transparent',
};

const buttonStyles = css`
	display: none;
	${from.tablet} {
		display: flex;
		gap: ${space[1]}px;
		margin-left: auto;
	}
`;

/**
 * Navigation buttons for use in a carousel-like component
 */
export const CarouselNavigationButtons = ({
	previousButtonEnabled,
	nextButtonEnabled,
	onClickPreviousButton,
	onClickNextButton,
	dataLinkNameNextButton,
	dataLinkNamePreviousButton,
}: Props) => {
	return (
		<div
			aria-controls="carousel"
			aria-label="carousel arrows"
			css={buttonStyles}
		>
			<Button
				hideLabel={true}
				iconSide="left"
				icon={<SvgChevronLeftSingle />}
				onClick={onClickPreviousButton}
				priority="tertiary"
				theme={
					previousButtonEnabled ? themeButton : themeButtonDisabled
				}
				size="small"
				disabled={!previousButtonEnabled}
				aria-label="previous"
				value="previous"
				data-link-name={dataLinkNamePreviousButton}
			/>

			<Button
				hideLabel={true}
				iconSide="left"
				icon={<SvgChevronRightSingle />}
				onClick={onClickNextButton}
				priority="tertiary"
				theme={nextButtonEnabled ? themeButton : themeButtonDisabled}
				size="small"
				disabled={!nextButtonEnabled}
				aria-label="next"
				value="next"
				data-link-name={dataLinkNameNextButton}
			/>
		</div>
	);
};
