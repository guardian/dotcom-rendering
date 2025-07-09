import { css } from '@emotion/react';
import { from, palette, remSpace } from '@guardian/source/foundations';
import {
	LinkButton,
	SvgAppleBrand,
	SvgEnvelope,
	SvgGoogleBrand,
} from '@guardian/source/react-components';
import React from 'react';
import { buildUrlWithQueryParams } from '../../lib/routeUtils';
import type { IsNativeApp, QueryParams } from './types';

type AuthButtonProvider = 'social' | 'email';

type AuthProviderButtonsProps = {
	queryParams: QueryParams;
	isNativeApp?: IsNativeApp;
	providers: AuthButtonProvider[];
	onClick?: (provider: AuthButtonProvider) => void;
};

type AuthProviderButtonProps = {
	label: string;
	icon: React.ReactElement;
	socialProvider: string;
	queryParams: QueryParams;
	onClick?: (provider: AuthButtonProvider) => void;
};

// The gap between elements in the main section of MinimalLayout.
export const SECTION_GAP = remSpace[3]; // 12px

export const mainSectionStyles = css`
	display: flex;
	flex-direction: column;
	gap: ${SECTION_GAP};

	${from.phablet} {
		flex-direction: row;
	}
`;

type ButtonWidth = 'full' | 'half';

const sharedButtonStyles = (width: ButtonWidth = 'full') => css`
	width: 100%;
	${from.tablet} {
		max-width: ${width === 'full' ? '100%' : '50%'};
	}
	margin: 0 auto;
	justify-content: center;
	:disabled {
		cursor: not-allowed;
	}
`;

export const secondaryButtonStyles = (width: ButtonWidth = 'full') => css`
	${sharedButtonStyles(width)}
	background-color: ${palette.neutral[100]};
	border-color: ${palette.brand[400]};
	color: ${palette.brand[400]};
	&:hover {
		background-color: ${palette.neutral[93]};
	}
`;

const appleIconOverrides = css`
	svg path {
		/* stylelint-disable-next-line declaration-no-important */
		fill: ${palette.brand[400]} !important;
	}
`;

const SocialButton = ({
	label,
	icon,
	socialProvider,
	queryParams,
	onClick,
}: AuthProviderButtonProps) => {
	return (
		<>
			<LinkButton
				priority="tertiary"
				cssOverrides={secondaryButtonStyles()}
				icon={icon}
				href={buildUrlWithQueryParams(
					'https://profile.theguardian.com/signin/:social',
					{
						social: socialProvider,
					},
					queryParams,
				)}
				onClick={() => onClick?.(socialProvider as AuthButtonProvider)}
				data-cy={`${socialProvider}-sign-in-button`}
				data-link-name={`${socialProvider}-social-button`}
			>
				{authProviderButtonLabel(label)}
			</LinkButton>
		</>
	);
};

const authProviderButtonLabel = (label: string) => {
	// We don't capitalize 'email', but we do capitalize 'google' and 'apple'
	const capitalisedLabel =
		label === 'email'
			? label
			: label.charAt(0).toUpperCase() + label.slice(1);

	return `Sign in with ${capitalisedLabel}`;
};

const socialButtonIcon = (socialProvider: string): React.ReactElement => {
	switch (socialProvider) {
		case 'google':
			return <SvgGoogleBrand />;
		case 'apple':
			return (
				<div css={appleIconOverrides}>
					<SvgAppleBrand />
				</div>
			);
		default:
			// null is the officially recommended way to return nothing from a React component,
			// but LinkButton doesn't accept it, so we return an empty JSX element instead
			// cf. https://stackoverflow.com/a/47192387
			return <></>;
	}
};

const getButtonOrder = (isNativeApp?: IsNativeApp): string[] => {
	switch (isNativeApp) {
		case 'ios':
			return ['apple', 'google'];
		case 'android':
			return ['google', 'apple'];
		default:
			return ['google', 'apple'];
	}
};

export const AuthProviderButtons = ({
	queryParams,
	isNativeApp,
	providers,
	onClick,
}: AuthProviderButtonsProps) => {
	const buttonOrder = getButtonOrder(isNativeApp);
	return (
		<div css={mainSectionStyles}>
			{providers.includes('social') &&
				buttonOrder.map((socialProvider) => (
					<SocialButton
						key={socialProvider}
						label={socialProvider}
						icon={socialButtonIcon(socialProvider)}
						socialProvider={socialProvider}
						queryParams={queryParams}
						onClick={onClick}
					/>
				))}
			{providers.includes('email') && (
				<LinkButton
					icon={<SvgEnvelope />}
					cssOverrides={secondaryButtonStyles()}
					priority="tertiary"
					href={buildUrlWithQueryParams(
						'https://profile.theguardian.com/register/email',
						{},
						queryParams,
					)}
					onClick={() => onClick?.('email')}
				>
					{authProviderButtonLabel('email')}
				</LinkButton>
			)}
		</div>
	);
};
