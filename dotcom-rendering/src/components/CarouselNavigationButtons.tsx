import { css } from '@emotion/react';
import { from, space } from '@guardian/source/foundations';
import {
	Button,
	SvgChevronLeftSingle,
	SvgChevronRightSingle,
	type ThemeButton,
} from '@guardian/source/react-components';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { palette } from '../palette';

type CarouselNavigationProps = {
	previousButtonEnabled: boolean;
	nextButtonEnabled: boolean;
	onClickPreviousButton: () => void;
	onClickNextButton: () => void;
	dataLinkNameNextButton: string;
	dataLinkNamePreviousButton: string;
	/** Unique identifier for the carousel navigation container. */
	sectionId: string;
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
 *
 * Navigation buttons for a carousel-like component.
 *
 * This component renders "Previous" and "Next" navigation buttons, designed for controlling a carousel-like component.
 *
 * These buttons are rendered using a React portal. A portal allows rendering the button elements outside of the
 * normal React component hierarchy, enabling flexibility in their placement within the DOM. This is particularly
 * useful when the buttons need to be positioned outside the visual boundaries of the carousel component itself,
 * such as on the fronts containers.
 *
 * The portal dynamically identifies a DOM element by constructing its ID using the `sectionId` prop and
 * appends the suffix `-carousel-navigation`. This allows us to create distinct navigation portals per carousel.
 *
 * If the target DOM element is not found, a warning is logged in the
 * console. The buttons will not be rendered if the portal target is unavailable.
 *
 */
export const CarouselNavigationButtons = ({
	previousButtonEnabled,
	nextButtonEnabled,
	onClickPreviousButton,
	onClickNextButton,
	dataLinkNamePreviousButton,
	dataLinkNameNextButton,
	sectionId,
}: CarouselNavigationProps) => {
	const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
	useEffect(() => {
		const node = document.getElementById(
			`${sectionId}-carousel-navigation`,
		);
		if (!node) {
			console.warn(
				`Portal node with ID "${sectionId}-carousel-navigation" not found.`,
			);
		}
		setPortalNode(node);
	}, [sectionId]);

	if (!portalNode) return null;

	return ReactDOM.createPortal(
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
		</div>,
		portalNode,
	);
};
