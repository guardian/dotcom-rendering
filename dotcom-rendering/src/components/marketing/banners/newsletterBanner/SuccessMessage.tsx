import { css } from '@emotion/react';
import {
	palette,
	space,
	textSans15,
	until,
} from '@guardian/source/foundations';
import { LinkButton, SvgTickRound } from '@guardian/source/react-components';

const successContainerStyles = css`
	display: grid;
	grid-template-columns: 34.5px minmax(0, 1fr);
	color: ${palette.success[400]};
	${until.tablet} {
		padding: 0 10px;
	}

	> svg {
		width: 34.5px;
		height: 34.5px;
		transform: translate(-5.75px, -5.75px);
		fill: currentColor;
	}
`;

const successContentStyles = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${space[2]}px;
`;

const successTextStyles = (textColor: string) => css`
	${textSans15};
	color: ${textColor};

	strong {
		font-weight: 700;
	}
`;

export const SuccessMessage = ({
	newsletterName,
	frequency,
	textColor,
	browseButtonTextColor,
	browseButtonBorderColor,
}: {
	newsletterName: string;
	frequency: string;
	textColor: string;
	browseButtonTextColor: string;
	browseButtonBorderColor: string;
}) => {
	return (
		<div css={successContainerStyles}>
			<SvgTickRound />
			<div css={successContentStyles}>
				<span css={successTextStyles(textColor)} role="alert">
					<strong>You're signed up!</strong>
					&nbsp;
					<span>
						You will receive {newsletterName}{' '}
						{frequency.toLowerCase()}.
					</span>
				</span>
				<LinkButton
					theme={{
						textTertiary: browseButtonTextColor,
						borderTertiary: browseButtonBorderColor,
					}}
					href="/email-newsletters?INTCMP=DOTCOM_NEWSLETTER_SIGNUP_CARD"
					priority="tertiary"
					data-ignore="global-link-styling"
				>
					Browse more newsletters
				</LinkButton>
			</div>
		</div>
	);
};
