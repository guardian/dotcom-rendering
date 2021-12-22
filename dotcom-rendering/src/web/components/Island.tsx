/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Placeholder } from './Placeholder';

type Defer = 'idle' | 'visible';

interface HydrateProps {
	defer?: Defer;
	ssr?: true;
	placeholderHeight?: undefined;
	children: JSX.Element;
}

interface PortalProps {
	defer?: Defer;
	ssr: false;
	placeholderHeight: number;
	children: JSX.Element;
}

/**
 * Props
 *
 * We use a union type here to support conditional typing. This means if the ssr
 * flag is set to false, then you must supply placeholderHeight. If ssr is true or
 * not supplied, then placeholderHeight must not be given
 */
type Props = HydrateProps | PortalProps;

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param defer - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 * @param ssr - Should the component be server side rendered
 * @param placeholderHeight - The height for the placeholder element. Required if ssr is false
 * @param children - The component being inserted. Must be a single React Element
 *
 */
export const Island = ({ defer, ssr, placeholderHeight, children }: Props) => (
	<gu-island
		name={children.type.name}
		defer={defer}
		props={JSON.stringify(children.props)}
	>
		{ssr && children}
		{placeholderHeight && <Placeholder height={placeholderHeight} />}
	</gu-island>
);
