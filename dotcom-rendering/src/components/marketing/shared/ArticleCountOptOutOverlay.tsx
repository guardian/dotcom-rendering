/**
 * @file
 * This file was migrated from:
 * https://github.com/guardian/support-dotcom-components/blob/9c3eae7cb0b159db4a1c40679d6b37710b0bb937/packages/modules/src/modules/shared/ArticleCountOptOutOverlay.tsx
 */
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import {
	background,
	brand,
	brandAltBackground,
	brandAltLine,
	brandAltText,
	brandAlt as brandAltTheme,
	brand as brandTheme,
	culture,
	from,
	neutral,
	space,
	textSans,
} from '@guardian/source-foundations';
import {
	Button,
	buttonThemeDefault,
	SvgCross,
} from '@guardian/source-react-components';
import type { ReactComponent } from '../lib/ReactComponent';
import type { ArticleCountOptOutType } from './ArticleCountOptOutPopup';

const COLOURS = {
	epic: 'white',
	banner: brandAltText.primary,
	['investigations-moment-banner']: neutral[0],
	['us-eoy-moment-banner']: neutral[0],
	['global-new-year-moment-banner']: neutral[0],
	['election-au-moment-banner']: neutral[0],
};

const BACKGROUND_COLOURS = {
	epic: brand[400],
	banner: brandAltBackground.primary,
	['investigations-moment-banner']: neutral[100],
	['us-eoy-moment-banner']: '#FFEEDB',
	['global-new-year-moment-banner']: '#F79E1B',
	['election-au-moment-banner']: '#e4e4e3',
};

const BORDER_COLOURS = {
	epic: 'transparent',
	banner: brandAltLine.primary,
	['investigations-moment-banner']: neutral[0],
	['us-eoy-moment-banner']: neutral[0],
	['global-new-year-moment-banner']: neutral[0],
	['election-au-moment-banner']: neutral[0],
};

const BUTTON_THEMES = {
	epic: brandTheme,
	banner: brandAltTheme,
	['investigations-moment-banner']: buttonThemeDefault,
	['us-eoy-moment-banner']: buttonThemeDefault,
	['global-new-year-moment-banner']: buttonThemeDefault,
	['election-au-moment-banner']: buttonThemeDefault,
};

const overlayContainer = (
	type: ArticleCountOptOutType,
): SerializedStyles => css`
	color: ${COLOURS[type]};
	background: ${BACKGROUND_COLOURS[type]};
	border: 1px solid ${BORDER_COLOURS[type]};
	${textSans.medium()}
	padding: ${space[2]}px;
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const overlayHeader = css`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const overlayHeaderText = css`
	font-size: 17px;
	font-weight: bold;
`;

const overlayBody = css`
	margin-top: ${space[1]}px;
	font-size: 15px;
`;

const overlayCtaContainer = css`
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
`;

const NOTE_LINK_COLOURS = {
	epic: neutral[100],
	banner: brandAltText.primary,
	['investigations-moment-banner']: neutral[0],
	['us-eoy-moment-banner']: neutral[0],
	['global-new-year-moment-banner']: neutral[0],
	['election-au-moment-banner']: neutral[0],
};

const BUTTON_OVERRIDES = {
	epic: css``,
	banner: css``,
	['investigations-moment-banner']: css`
		background-color: ${neutral[100]};
		color: ${neutral[0]};
		border: 1px solid ${neutral[0]};

		&:hover {
			background-color: ${neutral[86]};
		}
	`,
	['us-eoy-moment-banner']: css`
		color: ${neutral[7]};
		border: 1px solid ${neutral[7]};

		&:hover {
			background-color: ${culture[350]};
			color: ${neutral[100]};
			border: 1px solid ${culture[350]};
		}
	`,
	['global-new-year-moment-banner']: css`
		color: ${neutral[7]};
		border: 1px solid ${neutral[7]};

		&:hover {
			background-color: ${brand[500]};
			color: ${neutral[100]};
			border: 1px solid ${brand[500]};
		}
	`,
	['election-au-moment-banner']: css`
		color: ${neutral[7]};
		border: 1px solid ${neutral[7]};

		&:hover {
			background-color: ${brand[500]};
			color: ${neutral[100]};
			border: 1px solid ${brand[500]};
		}
	`,
};

const PRIMARY_BUTTON_OVERRIDES = {
	epic: css``,
	banner: css``,
	['investigations-moment-banner']: css`
		background-color: ${neutral[0]};
		color: ${neutral[100]};
		border: 1px solid ${neutral[0]};

		&:hover {
			background-color: ${neutral[46]};
			border-color: ${neutral[46]};
		}
	`,
	['us-eoy-moment-banner']: css`
		background-color: ${neutral[7]};
		color: ${neutral[100]};
		border: 1px solid ${neutral[7]};

		&:hover {
			background-color: ${culture[350]};
			color: ${neutral[100]};
			border: 1px solid ${culture[350]};
		}
	`,
	['global-new-year-moment-banner']: css`
		background-color: ${neutral[0]};
		color: ${neutral[100]};
		border: 1px solid ${neutral[0]};

		&:hover {
			background-color: ${brand[500]};
			color: ${neutral[100]};
			border: 1px solid ${brand[500]};
		}
	`,
	['election-au-moment-banner']: css`
		background-color: ${neutral[0]};
		color: ${neutral[100]};
		border: 1px solid ${neutral[0]};

		&:hover {
			background-color: ${background.ctaPrimaryHover};
			color: ${neutral[100]};
			border: 1px solid ${background.ctaPrimaryHover};
		}
	`,
};

const overlayNote = (type: ArticleCountOptOutType): SerializedStyles => css`
	margin-top: ${space[2]}px;
	${textSans.xsmall()}
	font-style: italic;

	a {
		/* stylelint-disable-next-line declaration-no-important */
		color: ${NOTE_LINK_COLOURS[type]} !important;
		/* stylelint-disable-next-line declaration-no-important */
		text-decoration: underline !important;
	}
`;

export interface ArticleCountOptOutOverlayProps {
	type: ArticleCountOptOutType;
	hasOptedOut: boolean;
	onOptOut: () => void;
	onClose: () => void;
}

export const ArticleCountOptOutOverlay: ReactComponent<
	ArticleCountOptOutOverlayProps
> = ({
	type,
	hasOptedOut,
	onClose,
	onOptOut,
}: ArticleCountOptOutOverlayProps) => {
	return (
		<div css={overlayContainer(type)}>
			<div css={overlayHeader}>
				<div css={overlayHeaderText}>
					{hasOptedOut ? "You've opted out" : "What's this?"}
				</div>
				<ThemeProvider theme={BUTTON_THEMES[type]}>
					<Button
						onClick={onClose}
						cssOverrides={BUTTON_OVERRIDES[type]}
						icon={<SvgCross />}
						hideLabel={true}
						size="xsmall"
						priority="tertiary"
					>
						Close
					</Button>
				</ThemeProvider>
			</div>

			<div css={overlayBody}>
				{hasOptedOut
					? "Starting from your next page view, we won't count the articles you read or show you this message for three months."
					: 'We would like to remind you how many Guardian articles you’ve enjoyed on this device. Can we continue showing you this?'}
			</div>

			{!hasOptedOut && (
				<div css={overlayCtaContainer}>
					<ThemeProvider theme={BUTTON_THEMES[type]}>
						<Button
							onClick={onClose}
							cssOverrides={PRIMARY_BUTTON_OVERRIDES[type]}
							priority="primary"
							size="xsmall"
						>
							Yes, that&apos;s OK
						</Button>
					</ThemeProvider>
					<ThemeProvider theme={BUTTON_THEMES[type]}>
						<Button
							onClick={onOptOut}
							cssOverrides={BUTTON_OVERRIDES[type]}
							priority="tertiary"
							size="xsmall"
						>
							No, opt me out
						</Button>
					</ThemeProvider>
				</div>
			)}

			<div css={overlayNote(type)}>
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
