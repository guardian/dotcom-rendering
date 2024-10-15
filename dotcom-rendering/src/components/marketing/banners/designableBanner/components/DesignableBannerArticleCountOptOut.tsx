/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/0a2439b701586a7a2cc60dce10b4d96cf7a828db/packages/modules/src/modules/banners/designableBanner/components/DesignableBannerArticleCountOptOut.tsx
 */
import { css } from '@emotion/react';
import {
	from,
	neutral,
	space,
	textSans14,
	textSans15,
	textSans17,
	textSansBold17,
} from '@guardian/source/foundations';
import { Button, SvgCross } from '@guardian/source/react-components';
import { useState } from 'react';
import {
	addArticleCountOptOutCookie,
	removeArticleCountFromLocalStorage,
} from '../../../lib/articleCountOptOut';
import type { ReactComponent } from '../../../lib/ReactComponent';
import type { BannerTemplateSettings } from '../settings';
import { buttonStyles } from '../styles/buttonStyles';

// ---- Component ---- //

export interface DesignableBannerArticleCountOptOutProps {
	numArticles: number;
	nextWord: string | null;
	settings: BannerTemplateSettings;
}

export const DesignableBannerArticleCountOptOut: ReactComponent<
	DesignableBannerArticleCountOptOutProps
> = ({
	numArticles,
	nextWord,
	settings,
}: DesignableBannerArticleCountOptOutProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [hasOptedOut, setHasOptedOut] = useState(false);

	const onOptOut = (): void => {
		addArticleCountOptOutCookie();
		removeArticleCountFromLocalStorage();
		setHasOptedOut(true);
	};

	const onOpen = (): void => {
		setIsOpen(true);
	};

	const onClose = (): void => {
		setIsOpen(false);
	};

	const onToggle = (): void => (isOpen ? onClose() : onOpen());

	return (
		<div css={styles.optOutContainer}>
			<button css={styles.articleCountButton} onClick={onToggle}>
				{`${numArticles}${nextWord ? nextWord : ''}`}
			</button>

			{isOpen && (
				<div css={styles.overlayContainer}>
					<Overlay
						hasOptedOut={hasOptedOut}
						onOptOut={onOptOut}
						onClose={onClose}
						settings={settings}
					/>
				</div>
			)}
		</div>
	);
};

// ---- Helper Component ---- //

export interface OverlayProps {
	hasOptedOut: boolean;
	onOptOut: () => void;
	onClose: () => void;
	settings: BannerTemplateSettings;
}

const Overlay: ReactComponent<OverlayProps> = ({
	hasOptedOut,
	onClose,
	onOptOut,
	settings,
}: OverlayProps) => {
	return (
		<div
			css={overlayStyles.overlayContainer(
				settings.containerSettings.backgroundColour,
				settings.articleCountTextColour,
			)}
		>
			<div css={overlayStyles.overlayHeader}>
				<div css={overlayStyles.overlayHeaderText}>
					{hasOptedOut ? "You've opted out" : "What's this?"}
				</div>

				<Button
					onClick={onClose}
					icon={<SvgCross />}
					hideLabel={true}
					size="xsmall"
					priority="tertiary"
					cssOverrides={buttonStyles(settings.closeButtonSettings)}
				>
					Close
				</Button>
			</div>

			<div css={overlayStyles.overlayBody}>
				{hasOptedOut
					? "Starting from your next page view, we won't count the articles you read or show you this message for three months."
					: 'We would like to remind you how many Guardian articles you’ve enjoyed on this device. Can we continue showing you this?'}
			</div>

			{!hasOptedOut && (
				<div css={overlayStyles.overlayCtaContainer}>
					<Button
						onClick={onClose}
						priority="primary"
						size="xsmall"
						cssOverrides={buttonStyles(settings.primaryCtaSettings)}
					>
						Yes, that&apos;s OK
					</Button>

					<Button
						onClick={onOptOut}
						priority="tertiary"
						size="xsmall"
						cssOverrides={buttonStyles(
							settings.secondaryCtaSettings,
						)}
					>
						No, opt me out
					</Button>
				</div>
			)}

			<div
				css={overlayStyles.overlayNote(settings.articleCountTextColour)}
			>
				{hasOptedOut ? (
					<span>
						If you have any questions, please{' '}
						<a href="https://www.theguardian.com/help/contact-us">
							contact us.
						</a>
					</span>
				) : (
					"Please note that opting out is a permanent action and can't be reversed"
				)}
			</div>
		</div>
	);
};

// ---- Styles ---- //

const styles = {
	optOutContainer: css`
		display: inline-block;
	`,
	articleCountButton: css`
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		border-bottom: 1px solid;
		/* stylelint-disable property-disallowed-list */
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		font-style: inherit;
		color: inherit;
	`,
	overlayContainer: css`
		position: absolute;
		z-index: 100;
		top: 0px;
		left: 0px;
		display: block;

		${from.tablet} {
			top: 10px;
			left: 10px;
			width: 450px;
		}
	`,
};

const overlayStyles = {
	overlayContainer: (
		backgroundColour: string,
		textColour: string = neutral[0],
	) => css`
		${textSans17}
		padding: ${space[2]}px;
		background-color: ${backgroundColour};
		border: 1px solid ${textColour};
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
		color: ${textColour};
	`,
	overlayHeader: css`
		display: flex;
		align-items: center;
		justify-content: space-between;
	`,
	overlayHeaderText: css`
		${textSansBold17};
	`,
	overlayBody: css`
		margin-top: ${space[1]}px;
		${textSans15};
	`,
	overlayCtaContainer: css`
		margin-top: ${space[3]}px;
		display: flex;
		flex-direction: row;

		> * + * {
			margin-left: ${space[2]}px;
		}

		${from.tablet} {
			> * + * {
				margin-left: ${space[3]}px;
			}
		}
	`,
	overlayNote: (textColour: string = neutral[0]) => css`
		margin-top: ${space[2]}px;
		${textSans14}
		font-style: italic;

		a {
			/* stylelint-disable-next-line declaration-no-important */
			color: ${textColour} !important;
			/* stylelint-disable-next-line declaration-no-important */
			text-decoration: underline !important;
		}
	`,
};
