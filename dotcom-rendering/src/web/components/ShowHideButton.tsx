import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { neutral, space, textSans } from '@guardian/source-foundations';
import { ButtonLink } from '@guardian/source-react-components';

type Props = {
	sectionId: string;
	overrideContainerToggleColour?: string;
};

const buttonColourStyles = (overrideContainerToggleColour: string) => css`
	color: ${overrideContainerToggleColour};
`;

const buttonStyles = css`
	color: ${neutral[46]};
	${textSans.xsmall()};
	margin-top: ${space[2]}px;
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
	// @ts-expect-error -- Emotion will handle undefined values gracefully
	const colourStyles: SerializedStyles = overrideContainerToggleColour
		? buttonColourStyles(overrideContainerToggleColour)
		: undefined;

	return (
		<ButtonLink
			priority="secondary"
			cssOverrides={[buttonStyles, colourStyles]}
			data-link-name="Hide"
			data-show-hide-button={sectionId}
			aria-controls={sectionId}
			aria-expanded={true}
		>
			Hide
		</ButtonLink>
	);
};
