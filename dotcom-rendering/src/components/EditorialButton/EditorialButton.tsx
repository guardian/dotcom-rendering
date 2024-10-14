import type { ButtonProps as CoreButtonProps } from '@guardian/source/react-components';
import { Button as CoreButton } from '@guardian/source/react-components';
import { decideBackground, decideBorder, decideFont } from './styles';

export interface EditorialButtonProps extends CoreButtonProps {}

/**
 *
 * This is the editorial version of the core Button component.
 * This editorial version requires the format prop and uses that to override Button styles based on `format.theme`
 *
 */
export const EditorialButton = ({
	children,
	priority = 'primary',
	...props
}: EditorialButtonProps) => {
	const backgroundOverrides = decideBackground(priority);
	const borderOverrides = decideBorder(priority);
	const fontOverrides = decideFont(priority);

	return (
		<CoreButton
			priority={priority}
			cssOverrides={[backgroundOverrides, borderOverrides, fontOverrides]}
			{...props}
		>
			{children}
		</CoreButton>
	);
};
