import { css } from '@emotion/react';
import { space, textSans14 } from '@guardian/source/foundations';
import { ButtonLink } from '@guardian/source/react-components';
import { palette } from '../palette';

type Props = {
	sectionId: string;
};

const showHideButtonCss = css`
	${textSans14};
	margin-right: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	position: relative;
	text-decoration: none;
	&.hidden {
		display: none;
	}
`;

/**
 * This component creates the styled button for showing & hiding a container,
 * The functionality for this is implemented in a single island 'ShownHideContainers.importable'
 **/
export const ShowHideButton = ({ sectionId }: Props) => {
	return (
		<ButtonLink
			priority="secondary"
			data-link-name="Hide"
			cssOverrides={showHideButtonCss}
			data-show-hide-button={sectionId}
			aria-controls={sectionId}
			aria-expanded={true}
			theme={{
				textSecondary: palette('--section-toggle-button'),
				textSecondaryHover: palette('--section-toggle-button-hover'),
			}}
		>
			Hide
		</ButtonLink>
	);
};
