import React, { useEffect, useState } from 'react';
import { css, cx } from 'emotion';

import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { Pillars } from '@root/src/web/components/Pillars';
import { GuardianRoundel } from '@root/src/web/components/GuardianRoundel';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';
import { ThemeProvider } from 'emotion-theming';
import { Button, buttonReaderRevenueBrand } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';

import { Hide } from '@frontend/web/components/Hide';

import { clearFix } from '@root/src/lib/mixins';

import { Display } from '@guardian/types';
import {
	buildID,
	navInputCheckboxId,
	showMoreButtonId,
	veggieBurgerId,
} from '@root/src/web/components/Nav/config';
import { ExpandedMenu } from './ExpandedMenu/ExpandedMenu';

type Props = {
	format: Format;
	topLevelPillars: PillarType[];
	subscribeUrl: string;
	edition: Edition;
	currentNavLinkTitle: string;
	ID: string;
	ajaxUrl: string;
};

const clearFixStyle = css`
	${clearFix};
`;

const rowStyles = css`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const minHeight = css`
	min-height: 48px;
`;

const PositionRoundel = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			margin-top: 3px;
			z-index: 2;

			${until.desktop} {
				margin-right: 51px;
			}

			margin-right: 24px;
		`}
	>
		{children}
	</div>
);

const PositionButton = ({ children }: { children: React.ReactNode }) => (
	<div
		className={css`
			margin-top: ${space[1]}px;
			margin-left: ${space[2]}px;
		`}
	>
		{children}
	</div>
);

// Will lazily fetch required data for expanded menu when menu is expanded by user.
export const Nav = ({
	format,
	subscribeUrl,
	edition,
	topLevelPillars,
	currentNavLinkTitle,
	ID,
	ajaxUrl,
}: Props) => {
	const [dataRequired, setDataRequired] = useState(false);

	// Accessibility
	useEffect(() => {
		// Used to toggle data-link-name on label buttons
		const navInputCheckbox = document.getElementById(
			`${buildID(ID, navInputCheckboxId)}`,
		) as HTMLInputElement;

		const showMoreButton = document.getElementById(
			`${buildID(ID, showMoreButtonId)}`,
		) as HTMLElement;

		const veggieBurger = document.getElementById(
			`${buildID(ID, veggieBurgerId)}`,
		) as HTMLElement;

		const expandedMenuClickableTags = document.querySelectorAll(
			'.selectableMenuItem',
		);

		const expandedMenu = document.getElementById(
			`${buildID(ID, 'expanded-menu')}`,
		) as HTMLElement;

		if (navInputCheckbox === null) return;

		navInputCheckbox.addEventListener('click', () => {
			if (!navInputCheckbox.checked) {
				showMoreButton.setAttribute(
					'data-link-name',
					'nav2 : veggie-burger: show',
				);
				veggieBurger.setAttribute(
					'data-link-name',
					'nav2 : veggie-burger: show',
				);
				expandedMenuClickableTags.forEach(($selectableElement) => {
					$selectableElement.setAttribute('tabindex', '-1');
				});
			} else {
				showMoreButton.setAttribute(
					'data-link-name',
					'nav2 : veggie-burger: hide',
				);
				veggieBurger.setAttribute(
					'data-link-name',
					'nav2 : veggie-burger: hide',
				);
				expandedMenuClickableTags.forEach(($selectableElement) => {
					$selectableElement.setAttribute('tabindex', '0');
				});
				// focusOnFirstNavElement(); TODO but tricky with current approach
			}
		});

		const toggleMainMenu = () => {
			navInputCheckbox?.click();
		};
		// Close hide menu on press enter
		const keydownToggleMainMenu = (e: KeyboardEvent) => {
			// keyCode: 13 => Enter key | keyCode: 32 => Space key
			if (e.keyCode === 13 || e.keyCode === 32) {
				e.preventDefault();
				toggleMainMenu();
			}
		};
		showMoreButton?.addEventListener('keydown', keydownToggleMainMenu);
		veggieBurger?.addEventListener('keydown', keydownToggleMainMenu);

		// Accessibility to hide Nav when pressing escape key
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			// keyCode: 27 => esc
			if (e.keyCode === 27) {
				if (navInputCheckbox?.checked) {
					toggleMainMenu();
					if (
						window.getComputedStyle(veggieBurger).display === 'none'
					) {
						showMoreButton.focus();
					} else {
						veggieBurger.focus();
					}
				}
			}
		});
		// onBlur close dialog
		document.addEventListener('mousedown', (e: Event) => {
			if (
				navInputCheckbox.checked &&
				!expandedMenu.contains(e.target as Node)
			) {
				toggleMainMenu();
			}
		});
	}, [ID]);

	return (
		<div className={rowStyles}>
			<nav
				className={cx(
					clearFixStyle,
					rowStyles,
					format.display === Display.Immersive && minHeight,
				)}
				role="navigation"
				aria-label="Guardian sections"
				data-component="stickynav"
			>
				{format.display === Display.Immersive && (
					<Hide when="above" breakpoint="tablet">
						<ThemeProvider theme={buttonReaderRevenueBrand}>
							<PositionButton>
								<Button
									priority="primary"
									size="small"
									iconSide="right"
									icon={<SvgArrowRightStraight />}
									data-link-name="nav2 : support-cta"
									data-edition={edition}
									onClick={() => {
										window.location.href = subscribeUrl;
										return false;
									}}
								>
									Subscribe
								</Button>
							</PositionButton>
						</ThemeProvider>
					</Hide>
				)}
				{/*
                IMPORTANT NOTE:
                It is important to have the input as the 1st sibling for NoJS to work
                as we use ~ to apply certain styles on checkbox checked and ~ can only
                apply to styles with elements that are preceded
            */}
				<input
					type="checkbox"
					className={css`
						${visuallyHidden};
					`}
					id={buildID(ID, navInputCheckboxId)}
					name="more"
					tabIndex={-1}
					key="OpenExpandedMenuCheckbox"
					aria-hidden="true"
					onClick={() => setDataRequired(true)}
				/>
				<Pillars
					display={format.display}
					pillars={topLevelPillars}
					pillar={format.theme}
					dataLinkName="nav2"
					isTopNav={true}
				/>
				<ExpandedMenu
					display={format.display}
					ID={ID}
					expand={dataRequired}
					currentNavLinkTitle={currentNavLinkTitle}
					edition={edition}
					ajaxUrl={ajaxUrl}
				/>
			</nav>
			{format.display === Display.Immersive && (
				<PositionRoundel>
					<GuardianRoundel />
				</PositionRoundel>
			)}
		</div>
	);
};
