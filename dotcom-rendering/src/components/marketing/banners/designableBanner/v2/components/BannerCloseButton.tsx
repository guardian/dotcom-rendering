import { css } from '@emotion/react';
import { from, space, until } from '@guardian/source/foundations';
import {
	Button,
	SvgChevronDownSingle,
	SvgChevronUpSingle,
	SvgCross,
} from '@guardian/source/react-components';
import { buttonStyles, buttonThemes } from '../../styles/buttonStyles';
import type { BannerData } from '../BannerProps';

const styles = {
	closeButtonContainer: css`
		grid-area: close-button;
		${until.phablet} {
			padding-bottom: ${space[4]}px;
			justify-self: end;
			position: sticky;
			top: 10px;
		}
		${from.phablet} {
			margin-top: ${space[2]}px;
			padding-right: ${space[2]}px;
			position: sticky;
		}
		${from.desktop} {
			margin-top: ${space[6]}px;
			justify-self: end;
		}
		${from.leftCol} {
			justify-self: start;
			padding-left: ${space[8]}px;
		}
	`,
	closeAndCollapseButtonContainer: (isCollapsed: boolean) => css`
		grid-area: close-button;
		display: flex;
		justify-content: space-between;

		${until.phablet} {
			flex-direction: row-reverse;
			position: sticky;
			top: ${space[2]}px;
		}
		${from.phablet} {
			flex-direction: row;
			column-gap: ${space[0]}px;
			padding-right: ${space[2]}px;
			margin-top: ${space[2]}px;
		}
		${from.desktop} {
			flex-direction: ${isCollapsed ? 'row' : 'row-reverse'};
			margin-top: ${isCollapsed ? space[9] : space[6]}px;
		}

		.maybe-later & {
			flex-direction: row-reverse;
		}
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
		${from.desktop} {
			margin-top: ${space[1]}px;
		}
	`,
	iconOverrides: (background?: string, text?: string) => css`
		background-color: ${background ?? 'inherit'};
		path {
			fill: ${text ?? 'white'};
		}
		margin-top: ${space[1]}px;
		margin-right: ${space[1]}px;

		${from.desktop} {
			margin: 0;
		}
	`,
	collapsableButtonContainer: css`
		margin-left: ${space[2]}px;
		${from.desktop} {
			margin: 0;
		}
	`,
};

export const BannerCloseButton = ({
	bannerData,
}: {
	bannerData: BannerData;
}): JSX.Element => {
	if (bannerData.isCollapsible) {
		return (
			<div
				css={styles.closeAndCollapseButtonContainer(
					bannerData.isCollapsed,
				)}
			>
				<div css={styles.collapsableButtonContainer}>
					<Button
						onClick={bannerData.actions.onToggleCollapse}
						cssOverrides={[
							styles.iconOverrides(
								bannerData.settings.closeButtonSettings.default
									.backgroundColour,
								bannerData.settings.closeButtonSettings.default
									.textColour,
							),
						]}
						priority="secondary"
						icon={
							bannerData.isCollapsed ? (
								<SvgChevronUpSingle />
							) : (
								<SvgChevronDownSingle />
							)
						}
						size="small"
						theme={buttonThemes(
							bannerData.settings.closeButtonSettings,
							'secondary',
						)}
						hideLabel={true}
					>
						{bannerData.isCollapsed
							? 'Expand banner'
							: 'Collapse banner'}
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div css={styles.closeButtonContainer}>
			<Button
				onClick={bannerData.actions.onClose}
				cssOverrides={buttonStyles(
					bannerData.settings.closeButtonSettings,
					styles.closeButtonOverrides,
				)}
				priority="tertiary"
				theme={buttonThemes(
					bannerData.settings.closeButtonSettings,
					'tertiary',
				)}
				icon={<SvgCross />}
				size="small"
				hideLabel={true}
			>
				Close
			</Button>
		</div>
	);
};
