import type { SerializedStyles } from '@emotion/react';
import { css, ThemeProvider } from '@emotion/react';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import {
	article17,
	from,
	headlineBold20,
	palette,
	space,
} from '@guardian/source/foundations';
import {
	Button as DSButton,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type {
	Cta,
	Variant,
} from '@guardian/support-dotcom-components/dist/shared/types';
import type { ReactComponent } from '../lib/ReactComponent';

const wrapperStyles = css`
	padding: ${space[1]}px ${space[2]}px ${space[3]}px;
	border-top: 1px solid ${palette.brandAlt[400]};
	background-color: ${palette.neutral[97]};

	display: grid;
	grid-template-columns: auto auto;

	grid-template-areas:
		'copy-container	logo-container'
		'cta-container img-container';

	* {
		::selection {
			background: ${palette.brandAlt[400]};
		}
		::-moz-selection {
			background: ${palette.brandAlt[400]};
		}
	}

	b,
	strong {
		font-weight: bold;
	}
`;

const imageWrapperStyles = css`
	margin: ${space[3]}px 0 ${space[2]}px;

	${from.tablet} {
		margin: 10px 0;
	}
`;

const imageStyles = css`
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

const headingStyles = css`
	${headlineBold20};
	margin-top: 0;
	margin-bottom: ${space[3]}px;
`;

const bodyStyles = css`
	margin: 0 auto ${space[2]}px;
	${article17};
`;

const copyStyles = css`
	grid-area: copy-container;
`;

// Is this the correct interface? I can't find an equivalent one in dcr.
interface ResponsiveImage {
	mobileUrl: string;
	tabletUrl: string;
	desktopUrl: string;
	altText: string;
}

export interface Inline1Variant extends Variant {
	type: 'Inline1SupportMessage';
	heading: string;
	body: string;
	primaryCta: Cta;
	image?: ResponsiveImage;
}

export interface Inline1Props {
	variant: Inline1Variant;
}

interface EpicHeaderProps {
	text: string;
}

const SupporterRevenueHeader: ReactComponent<EpicHeaderProps> = ({
	text,
}: EpicHeaderProps) => {
	return <h2 css={headingStyles}>{text}</h2>;
};

type BodyProps = {
	text: string;
};

const SupporterRevenueBody: ReactComponent<BodyProps> = ({
	text,
}: BodyProps) => {
	return <p css={bodyStyles}>{text}</p>;
};

const buttonStyles = {
	textPrimary: palette.neutral[7],
	backgroundPrimary: palette.brandAlt[400],
	backgroundPrimaryHover: palette.brandAlt[300],
	textSecondary: palette.neutral[7],
	backgroundSecondary: palette.neutral[93],
	backgroundSecondaryHover: palette.neutral[86],
	borderSecondary: palette.neutral[86],
};

const contributionsTheme = {
	button: buttonStyles,
	link: buttonStyles,
};

// Overrides for tertiary button
// Unfortunatly they all need !important :(
const tertiaryButtonOverrides = css`
	/* stylelint-disable-next-line declaration-no-important */
	border: 1px solid ${palette.neutral[7]} !important;
	/* stylelint-disable-next-line declaration-no-important */
	background-color: transparent !important;

	:hover {
		/* stylelint-disable-next-line declaration-no-important */
		background-color: ${palette.neutral[86]} !important;
	}
`;

type Url = string;

type Props = {
	// Accept a function or a string;
	// A function will render a <Button>
	// A string will render a <LinkButton>
	// Both using the same interface
	onClickAction: (() => void) | Url;
	submitComponentEvent?: (event: ComponentEvent) => void;
	children: React.ReactElement | string;
	priority?: 'primary' | 'secondary';
	showArrow?: boolean;
	isTertiary?: boolean;
	cssOverrides?: SerializedStyles;
	icon?: React.ReactElement;
};

export const SupporterRevenueButton: ReactComponent<Props> = (
	allProps: Props,
) => {
	const {
		onClickAction,
		submitComponentEvent,
		children,
		showArrow = false,
		priority = 'primary',
		isTertiary,
		cssOverrides,
		icon,
		...props
	} = allProps;

	if (typeof onClickAction === 'string') {
		// LinkButton doesn't support 'tertiary' priority (unlike Button)
		// So we'll map that to 'primary' and apply a CSS override on both of
		// them so they get the same styles for 'tertiary' priority
		return (
			<ThemeProvider theme={contributionsTheme}>
				<LinkButton
					href={onClickAction}
					icon={icon ?? <SvgArrowRightStraight />}
					iconSide="right"
					onClick={() => {}}
					target="_blank"
					rel="noopener noreferrer"
					priority={isTertiary ? 'primary' : priority}
					cssOverrides={css(
						isTertiary
							? [tertiaryButtonOverrides, cssOverrides]
							: cssOverrides,
					)}
					{...props}
				>
					{children}
				</LinkButton>
			</ThemeProvider>
		);
	}
	return (
		<ThemeProvider theme={contributionsTheme}>
			<DSButton
				iconSide="right"
				icon={showArrow ? <SvgArrowRightStraight /> : undefined}
				onClick={(): void => onClickAction()}
				priority={isTertiary ? 'primary' : priority}
				cssOverrides={css(
					isTertiary
						? [tertiaryButtonOverrides, cssOverrides]
						: cssOverrides,
				)}
				{...props}
			>
				{children}
			</DSButton>
		</ThemeProvider>
	);
};

const SupporterRevenue: ReactComponent<Inline1Props> = ({
	variant,
}: Inline1Props) => {
	const { image } = variant;

	return (
		<section css={wrapperStyles}>
			<div css={copyStyles}>
				<SupporterRevenueHeader text={variant.heading} />
				<SupporterRevenueBody text={variant.body} />
			</div>
			{image && (
				<div css={imageWrapperStyles}>
					<img
						src={image.desktopUrl}
						css={imageStyles}
						alt={image.altText}
					/>
				</div>
			)}

			<div className="cta-container">
				<SupporterRevenueButton
					onClickAction={variant.primaryCta.baseUrl}
					submitComponentEvent={undefined}
					showArrow={true}
				>
					{variant.primaryCta.text}
				</SupporterRevenueButton>
			</div>

			{/*
			<ContributionsEpicCtasContainer
				variant={variant}
				tracking={tracking}
				countryCode={countryCode}
				articleCounts={articleCounts}
				fetchEmail={fetchEmail}
				submitComponentEvent={submitComponentEvent}
			/> */}
		</section>
	);
};

export default SupporterRevenue;
