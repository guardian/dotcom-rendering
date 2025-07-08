import { css } from '@emotion/react';
import {
	from,
	headlineMedium24,
	headlineMedium34,
	palette,
	space,
	textSans15,
	textSans17,
	textSansBold15,
} from '@guardian/source/foundations';
import { AuthProviderButtons } from '../../AuthProviderButtons/AuthProviderButtons';
import { ExternalLink } from '../../ExternalLink/ExternalLink';
import { InformationBox } from '../../InformationBox/InformationBox';
import { GuardianTerms } from '../../Terms/Terms';
import { signInGateContainer } from './shared';

const DividerWithOr = () => {
	return (
		<div css={dividerContainer}>
			<hr css={line} />
			<span css={orText}>or</span>
			<hr css={line} />
		</div>
	);
};

export const SignInGateAuxiaV1 = () => {
	return (
		<div css={signInGateContainer} data-testid="sign-in-gate-main">
			<h2 css={subHeadingStyles}>
				Like uninterrupted reading?
				<br />
				So do we. Sign in.
			</h2>

			<p css={descriptionText}>
				Sign in to keep reading. It's free, and we'll bring you right
				back here in under a minute.
			</p>

			<div css={socialContainer}>
				<AuthProviderButtons
					queryParams={{
						returnUrl: 'https://www.theguardian.com/uk/',
					}}
					providers={['social']}
				/>
			</div>

			<DividerWithOr />

			<div css={emailContainer}>
				<AuthProviderButtons
					queryParams={{
						returnUrl: 'https://www.theguardian.com/uk/',
					}}
					providers={['email']}
				/>
			</div>

			<div css={termsBox}>
				<InformationBox>
					<GuardianTerms />
				</InformationBox>
			</div>

			<p css={createAccountText}>
				Not signed in before?{' '}
				<ExternalLink href="https://profile.theguardian.com/register">
					Create a free account
				</ExternalLink>
			</p>
		</div>
	);
};

// --- Styling ---
const subHeadingStyles = css`
	${headlineMedium24};
	color: ${palette.brand[400]};
	padding: ${space[2]}px 0 ${space[3]}px;

	${from.phablet} {
		${headlineMedium34};
		padding: ${space[2]}px 0 ${space[5]}px;
	}
`;

const descriptionText = css`
	${textSans15};
	padding-bottom: ${space[6]}px;

	${from.phablet} {
		${textSans17};
		padding-bottom: ${space[5]}px;
	}
`;

const socialContainer = css`
	padding-bottom: ${space[5]}px;
`;

const emailContainer = css`
	padding-bottom: ${space[4]}px;

	${from.phablet} {
		padding-bottom: ${space[3]}px;
	}
`;

const termsBox = css`
	padding-bottom: ${space[4]}px;

	${from.phablet} {
		padding-bottom: ${space[3]}px;
	}
`;

const createAccountText = css`
	${textSansBold15};
	color: ${palette.neutral[10]};

	a {
		${textSansBold15};
	}
`;

const dividerContainer = css`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 8px 12px;
`;

const line = css`
	flex: 1;
	border: none;
	border-top: 1px solid #bababa;
`;

const orText = css`
	${textSansBold15};
	color: #545454;
	padding: 0 8px;
	white-space: nowrap;
`;
