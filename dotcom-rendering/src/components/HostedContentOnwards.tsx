import { css } from '@emotion/react';
import { palette as sourcePalette } from '@guardian/source/foundations';

type HostedContentOnwardsProps = {
	accentColor?: string;
};

const headingStyles = (accentColor?: string) => css`
	color: ${sourcePalette.neutral[100]};
	background-color: ${accentColor};
`;

export const HostedContentOnwards = ({
	accentColor,
}: HostedContentOnwardsProps) => {
	return (
		<div>
			<header>
				<h2 css={headingStyles(accentColor)}>Onwards</h2>
			</header>
			<p>More content coming soon...</p>
		</div>
	);
};
