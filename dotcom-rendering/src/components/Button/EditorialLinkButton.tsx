import type { LinkButtonProps as CoreLinkButtonProps } from '@guardian/source/react-components';
import { LinkButton as CoreLinkButton } from '@guardian/source/react-components';
import { decideBackground, decideBorder, decideFont } from './styles';

export type EditorialLinkButtonProps = CoreLinkButtonProps;

/**
 *
 * This is the editorial version of the core Button component.
 * This editorial version requires the format prop and uses that to override Button styles based on `format.theme`
 *
 */
export const EditorialLinkButton = ({
	children,
	priority = 'primary',
	cssOverrides,
	...props
}: EditorialLinkButtonProps) => {
	const backgroundOverrides = decideBackground(priority);
	const borderOverrides = decideBorder(priority);
	const fontOverrides = decideFont(priority);

	return (
		<CoreLinkButton
			priority={priority}
			cssOverrides={[
				backgroundOverrides,
				borderOverrides,
				fontOverrides,
				...(cssOverrides ? [cssOverrides] : []).flat(),
			]}
			{...props}
		>
			{children}
		</CoreLinkButton>
	);
};
