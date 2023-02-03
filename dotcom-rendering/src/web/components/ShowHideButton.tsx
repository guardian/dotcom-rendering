import { css } from '@emotion/react';
import { neutral, space, textSans } from '@guardian/source-foundations';
import { ButtonLink } from '@guardian/source-react-components';

type Props = {
	sectionId: string;
	overrideContainerToggleColour?: string;
};

const showHideButtonCss = (
	overrideContainerToggleColour: string | undefined,
) => css`
	color: ${overrideContainerToggleColour ?? neutral[46]};
	${textSans.xsmall()};

	margin-top: ${space[2]}px;
	margin-right: 10px;
	margin-bottom: ${space[2]}px;
	align-items: bottom;

	text-decoration: none;
`;

/**
 * This component creates the styled button for showing & hiding a container.
 * The functionality for this is implemented in a single island `ShowHideContainers.importable.tsx`
 *
 * @see {ShowHideContainers}
 **/
export const ShowHideButton = ({
	sectionId,
	overrideContainerToggleColour,
}: Props) => {
	return (
		<ButtonLink
			priority="secondary"
			cssOverrides={showHideButtonCss(overrideContainerToggleColour)}
			data-link-name="Hide"
			data-show-hide-button={sectionId}
			aria-controls={sectionId}
			aria-expanded={true}
		>
			Hide
		</ButtonLink>
	);
};
