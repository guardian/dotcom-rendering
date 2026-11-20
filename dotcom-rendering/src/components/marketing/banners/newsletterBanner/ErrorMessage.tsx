import { css } from '@emotion/react';
import { space, textSans17, until } from '@guardian/source/foundations';
import {
	Button,
	Link,
	SvgAlertRound,
	SvgReload,
} from '@guardian/source/react-components';
import type { NewsletterBannerData } from './NewsletterBannerData';

const responseBoxStyles = (borderColor: string) => css`
	padding: 7px 12px 16px 7.5px;
	border: 1px solid ${borderColor};
	border-radius: 4px;
	margin-top: ${space[2]}px;
	${until.tablet} {
		margin: ${space[2]}px 10px 0 10px;
	}
`;

const errorContainerStyles = (errorColor: string) => css`
	display: grid;
	grid-template-columns: 32px minmax(0, 1fr);
	column-gap: 7.5px;
	color: ${errorColor};

	> svg {
		width: 32px;
		height: 32px;
		fill: currentColor;
	}
`;

const errorContentStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
	padding-top: 5px;
`;

const errorTextStyles = css`
	${textSans17};
`;

const errorLinkStyles = css`
	&,
	&:visited,
	&:hover,
	&:active,
	&:focus {
		color: inherit;
		font: inherit;
	}
`;

const retryButtonStyles = css`
	min-width: 240px;
	min-height: 44px;
	svg {
		width: 24px;
		height: 24px;
	}
`;

export const FailureMessage = ({
	bannerData,
	onRetry,
	text,
}: {
	bannerData: NewsletterBannerData;
	onRetry: React.MouseEventHandler<HTMLButtonElement>;
	text: string;
}) => {
	const {
		errorColor,
		signupButtonBackgroundColor,
		signupButtonTextColor,
		borderColor,
	} = bannerData.settings.newsletterBanner;
	return (
		<div
			css={[
				responseBoxStyles(borderColor),
				errorContainerStyles(errorColor),
			]}
		>
			<SvgAlertRound />
			<div css={errorContentStyles}>
				<span css={errorTextStyles} role="alert">
					{text} Please try again or contact{' '}
					<Link
						href="mailto:customer.help@theguardian.com"
						target="_blank"
						rel="noreferrer"
						cssOverrides={errorLinkStyles}
					>
						customer.help@theguardian.com
					</Link>
				</span>
				<Button
					theme={{
						backgroundPrimary: signupButtonBackgroundColor,
						backgroundPrimaryHover: signupButtonBackgroundColor,
						...(signupButtonTextColor !== undefined && {
							textPrimary: signupButtonTextColor,
						}),
					}}
					size="small"
					priority="primary"
					icon={<SvgReload />}
					iconSide="right"
					onClick={onRetry}
					cssOverrides={retryButtonStyles}
				>
					Try again
				</Button>
			</div>
		</div>
	);
};
