import { css } from '@emotion/react';
import {
	between,
	from,
	palette,
	space,
	until,
} from '@guardian/source/foundations';
import {
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import { enrichSupportUrl, getChoiceCardUrl } from '../../../../lib/tracking';
import { ThreeTierChoiceCards } from '../../../../shared/ThreeTierChoiceCards';
import { buttonStyles, buttonThemes } from '../../styles/buttonStyles';
import { useBanner } from '../useBanner';

const styles = {
	threeTierChoiceCardsContainer: css`
		grid-area: choice-cards-container;
		max-width: 100%;

		${until.desktop} {
			margin-top: -${space[6]}px;
		}
		${from.phablet} {
			max-width: 492px; // phabletContentMaxWidth
		}
		${from.desktop} {
			justify-self: end;
			padding-right: ${space[8]}px;
			width: 299px;
		}
		${between.desktop.and.wide} {
			width: 380px;
		}
		${from.wide} {
			align-self: start;
			width: 380px;
		}
	`,
	ctaContainer: (isCollapsed: boolean, backgroundColor: string) => css`
		grid-area: cc_cta;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: ${space[4]}px;
		margin-top: ${space[3]}px;

		.maybe-later & {
			flex-direction: row;
			flex-wrap: wrap;
			padding: ${space[3]}px;

			${from.phablet} {
				flex-direction: row;
				padding: ${space[3]}px 0;
			}
		}

		${until.phablet} {
			width: 100vw;
			position: sticky;
			bottom: 0;
			padding: ${space[3]}px;
			background-color: ${backgroundColor};
			box-shadow: 0 -${space[1]}px ${space[3]}px 0 rgba(0, 0, 0, 0.25);
			margin-right: -${space[3]}px;
			margin-left: -${space[3]}px;

			a {
				flex: 1 1 0;
			}
		}

		${between.phablet.and.desktop} {
			bottom: 0;
			margin-top: ${space[3]}px;
			margin-bottom: ${space[6]}px;
			a {
				width: 100%;
			}
			> span {
				width: auto;
			}
		}

		${from.desktop} {
			flex-direction: row;
			margin-bottom: ${space[6]}px;
			gap: ${space[2]}px;
			margin-top: ${isCollapsed ? `${space[6]}px` : `${space[3]}px`};
			margin-right: 0;
			margin-left: 0;

			.maybe-later & {
				flex-wrap: nowrap;
			}

			a {
				width: 100%;
			}

			> span {
				width: auto;
			}
		}
	`,
	linkButtonStyles: css`
		border-color: ${palette.brandAlt[400]};
		width: 100%;
	`,
	maybeLaterButtonSizing: css`
		flex: 1 1 0;
		${from.desktop} {
			width: 118px;
		}
	`,
	maybeLaterButton: css`
		width: 100%;
	`,
};

export const BannerChoiceCards = (): JSX.Element | null => {
	const {
		settings,
		isCollapsed,
		choices,
		selectedChoiceCard,
		actions,
		tracking,
		promoCodes,
		countryCode,
		content,
		isTabletOrAbove,
	} = useBanner();

	if (!settings.choiceCardSettings || !selectedChoiceCard || !choices) {
		return null;
	}

	const mainOrMobileContent = isTabletOrAbove
		? content.mainContent
		: content.mobileContent;

	return (
		<div css={styles.threeTierChoiceCardsContainer}>
			{!isCollapsed && (
				<ThreeTierChoiceCards
					selectedChoiceCard={selectedChoiceCard}
					setSelectedChoiceCard={actions.onChoiceCardChange}
					choices={choices}
					id={'banner'}
					submitComponentEvent={actions.submitComponentEvent}
					choiceCardSettings={settings.choiceCardSettings}
				/>
			)}
			<div
				css={styles.ctaContainer(
					isCollapsed,
					settings.containerSettings.backgroundColour,
				)}
			>
				<LinkButton
					href={enrichSupportUrl({
						baseUrl: getChoiceCardUrl(selectedChoiceCard),
						tracking,
						promoCodes: promoCodes ?? [],
						countryCode,
					})}
					onClick={actions.onCtaClick}
					priority="primary"
					cssOverrides={[styles.linkButtonStyles]}
					theme={buttonThemes(settings.primaryCtaSettings, 'primary')}
					icon={<SvgArrowRightStraight />}
					iconSide="right"
					target="_blank"
					rel="noopener noreferrer"
				>
					{isCollapsed
						? mainOrMobileContent.primaryCta?.ctaText
						: 'Continue'}
				</LinkButton>
				{isCollapsed && (
					<div css={styles.maybeLaterButtonSizing}>
						<LinkButton
							onClick={actions.onClose}
							priority="tertiary"
							cssOverrides={[
								buttonStyles(settings.secondaryCtaSettings),
								styles.maybeLaterButton,
							]}
							theme={buttonThemes(
								settings.secondaryCtaSettings,
								'tertiary',
							)}
						>
							Maybe later
						</LinkButton>
					</div>
				)}
			</div>
		</div>
	);
};
