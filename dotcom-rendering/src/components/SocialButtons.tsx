import React from 'react';
import { css } from '@emotion/react';
import { space, brand, from } from '@guardian/source-foundations';
import {
	LinkButton,
	SvgGoogleBrand,
	SvgAppleBrand,
} from '@guardian/source-react-components';

type SocialButtonsProps = {
	marginTop?: boolean;
};

type SocialButtonProps = {
	label: string;
	icon: React.ReactElement;
	socialProvider: string;
};

const containerStyles = (marginTop = false) => css`
	display: flex;
	flex-direction: column;
	${from.tablet} {
		flex-direction: row;
	}
	justify-content: center;
	margin-top: ${marginTop ? space[5] : 0}px;
	${from.mobileMedium} {
		margin-top: ${marginTop ? space[6] : 0}px;
	}
	width: 100%;
`;

const buttonOverrides = css`
	border-color: ${brand[400]};
	justify-content: center;
	${from.tablet} {
		min-width: 145px;
		flex-grow: 1;
	}
`;

// TODO: If the issue below is fixed and a new version of Source published with that fix in it, then
// you should remove this iconOverrides css
// https://github.com/guardian/source/issues/835
const iconOverrides = css`
	svg {
		margin-top: 3px;
	}
`;

export const SocialButton = ({
	label,
	icon,
	socialProvider,
}: SocialButtonProps) => {
	return (
		<>
			<LinkButton
				priority="tertiary"
				cssOverrides={[buttonOverrides, iconOverrides]}
				icon={icon}
				// href={buildUrlWithQueryParams(
				// 	'/signin/:social',
				// 	{
				// 		social: socialProvider,
				// 	},
				// 	queryParams,
				// )}
				data-cy={`${socialProvider}-sign-in-button`}
				data-link-name={`${socialProvider}-social-button`}
			>
				{socialButtonLabel(label)}
			</LinkButton>
		</>
	);
};

const socialButtonLabel = (label: string) => {
	const capitalisedLabel = label.charAt(0).toUpperCase() + label.slice(1);
	return capitalisedLabel;
};

export const socialButtonIcon = (
	socialProvider: string,
): React.ReactElement => {
	switch (socialProvider) {
		case 'google':
			return <SvgGoogleBrand />;
		case 'apple':
			return <SvgAppleBrand />;
		default:
			// null is the officially recommended way to return nothing from a React component,
			// but LinkButton doesn't accept it, so we return an empty JSX element instead
			// cf. https://stackoverflow.com/a/47192387
			return <></>;
	}
};

export const SocialButtons = ({ marginTop }: SocialButtonsProps) => {
	return (
		<div css={containerStyles(marginTop)}>
			{['google', 'apple'].map((socialProvider, index) => (
				<SocialButton
					key={socialProvider}
					label={socialProvider}
					icon={socialButtonIcon(socialProvider)}
					socialProvider={socialProvider}
				/>
			))}
		</div>
	);
};
