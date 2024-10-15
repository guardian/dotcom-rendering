import type { LinkButtonProps as CoreLinkButtonProps } from '@guardian/source/react-components';
import { LinkButton as CoreLinkButton } from '@guardian/source/react-components';
import {
	decideBackground,
	decideBorder,
	decideFont,
	defaultFormat,
} from './styles';
import type { SharedEditorialButtonProps } from './types';

export interface EditorialLinkButtonProps
	extends CoreLinkButtonProps,
		SharedEditorialButtonProps {}

/**
 *
 * This is the editorial version of the core Button component.
 * This editorial version requires the format prop and uses that to override Button styles based on `format.theme`
 *
 */
export const EditorialLinkButton = ({
	format = defaultFormat,
	children,
	priority = 'primary',
	...props
}: EditorialLinkButtonProps) => {
	const backgroundOverrides = decideBackground(format, priority);
	const borderOverrides = decideBorder(format, priority);
	const fontOverrides = decideFont(format, priority);

	return (
		<CoreLinkButton
			priority={priority}
			cssOverrides={[backgroundOverrides, borderOverrides, fontOverrides]}
			{...props}
		>
			{children}
		</CoreLinkButton>
	);
};
