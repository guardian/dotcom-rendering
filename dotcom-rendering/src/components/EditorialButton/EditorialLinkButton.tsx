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
 * [Storybook](https://guardian.github.io/storybooks/?path=/story/source-development-kitchen_react-components-editoriallinkbutton--when-primary) •
 * [Design System](https://theguardian.design/2a1e5182b/p/435225-button) •
 * [GitHub](https://github.com/guardian/csnx/tree/main/libs/@guardian/source-development-kitchen/src/editorial-button/EditorialLinkButton.tsx) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-development-kitchen)
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
