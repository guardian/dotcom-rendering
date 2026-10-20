import type { SerializedStyles } from '@emotion/react';
import { css, ThemeProvider } from '@emotion/react';
import type { ComponentEvent } from '@guardian/ophan-tracker-js';
import {
	from,
	headlineMedium24,
	palette,
	space,
	textSans15,
	textSansBold17,
} from '@guardian/source/foundations';
import {
	Button as DSButton,
	LinkButton,
	SvgArrowRightStraight,
} from '@guardian/source/react-components';
import type { Inline1Props } from '@guardian/support-dotcom-components/dist/src/shared/types/props/inline1';
import type { ReactComponent } from '../lib/ReactComponent';

const wrapperStyles = css`
	padding: ${space[1]}px ${space[2]}px ${space[3]}px;
	border-top: 1px solid ${palette.brandAlt[400]};
	background-color: ${palette.neutral[97]};

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
	${headlineMedium24};
	margin-top: 0;
	margin-bottom: ${space[3]}px;
`;

const bodyStyles = css`
	margin: 0 auto ${space[2]}px;
	${textSans15};
`;

const copyStyles = css`
	grid-area: copy-container;
`;

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
	fontFamily: textSansBold17,
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

type ButtonProps = {
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

export const SupporterRevenueButton: ReactComponent<ButtonProps> = (
	allProps: ButtonProps,
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
				<LinkButton href={onClickAction} {...props}>
					{children}
				</LinkButton>
			</ThemeProvider>
		);
	}
	return (
		<ThemeProvider theme={contributionsTheme}>
			<DSButton onClick={(): void => onClickAction()} {...props}>
				{children}
			</DSButton>
		</ThemeProvider>
	);
};

const SupporterRevenue: ReactComponent<Inline1Props> = ({ variant }) => {
	if (variant.message.type != 'Inline1SupportMessage') {
		return;
	}
	const heading = variant.message.heading;
	const body = variant.message.body;
	const image = variant.message.image;
	const cta = variant.message.primaryCta;

	return (
		<section css={wrapperStyles}>
			<div css={copyStyles}>
				<SupporterRevenueHeader text={heading} />
				<SupporterRevenueBody text={body} />
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
					onClickAction={cta.baseUrl}
					submitComponentEvent={undefined}
				>
					{cta.text}
				</SupporterRevenueButton>
			</div>
		</section>
	);
};

export default SupporterRevenue;
