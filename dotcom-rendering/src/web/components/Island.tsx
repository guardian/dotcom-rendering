/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Placeholder } from './Placeholder';

type When = 'idle' | 'visible';

interface HydrateProps {
	deferUntil?: When;
	clientOnly?: false;
	placeholderHeight?: undefined;
	children: JSX.Element;
}

interface ClientOnlyProps {
	deferUntil?: When;
	clientOnly: true;
	placeholderHeight: number;
	children: JSX.Element;
}

/**
 * Props
 *
 * We use a union type here to support conditional typing. This means if the clientOnly
 * flag is set to true, then you must supply placeholderHeight. If clientOnly is false or
 * not supplied, then placeholderHeight must not be given
 */
type Props = HydrateProps | ClientOnlyProps;

const decideChildren = (
	children: JSX.Element,
	clientOnly?: boolean,
	placeholderHeight?: number,
) => {
	if (!clientOnly) return children; // Server side rendering
	if (placeholderHeight) return <Placeholder height={placeholderHeight} />; // Portal using placeholder
	return null; // Portal not using placeholder (this also includes placeholderHeight === 0 - this is intentional)
};

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param deferUntil - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 * @param clientOnly - Should the component be server side rendered
 * @param placeholderHeight - The height for the placeholder element. Required if clientOnly is true
 * @param children - The component being inserted. Must be a single React Element
 *
 */
export const Island = ({
	deferUntil,
	clientOnly,
	placeholderHeight,
	children,
}: Props) => (
	<gu-island
		name={children.type.name}
		deferUntil={deferUntil}
		props={JSON.stringify(children.props)}
	>
		{decideChildren(children, clientOnly, placeholderHeight)}
	</gu-island>
);
