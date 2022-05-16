/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Placeholder } from './Placeholder';

type When = 'idle' | 'visible';

interface HydrateProps {
	type: 'component';
	deferUntil?: When;
	clientOnly?: false;
	placeholderHeight?: never;
	children: JSX.Element;
	func?: never;
	args?: never;
}

interface ClientOnlyProps {
	type: 'component';
	deferUntil?: When;
	clientOnly: true;
	placeholderHeight?: number;
	children: JSX.Element;
	func?: never;
	args?: never;
}

interface ScriptProps {
	type: 'script';
	deferUntil?: Exclude<When, 'visible'>;
	clientOnly?: true;
	placeholderHeight?: never;
	children?: never;
	// eslint-disable-next-line @typescript-eslint/ban-types
	func: Function;
	args?: { [key: string]: any };
}

/**
 * Props
 *
 * We use a union type here to support conditional typing. This means you
 * can only supply placeholderHeight if clientOnly is true.
 */
type Props = HydrateProps | ClientOnlyProps | ScriptProps;

const decideChildren = (
	children: JSX.Element,
	clientOnly?: boolean,
	placeholderHeight?: number,
) => {
	if (!clientOnly) return children; // Server side rendering
	if (placeholderHeight)
		return (
			<Placeholder
				height={placeholderHeight}
				shouldShimmer={false}
				backgroundColor="transparent"
			/>
		); // Portal using placeholder
	return null; // Portal not using placeholder (this also includes placeholderHeight === 0 - this is intentional)
};

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param {HydrateProps | ClientOnlyProps} props - JSX Props (component only)
 * @param {When} props.deferUntil - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport (component only)
 * @param {boolean} props.clientOnly - Should the component be server side rendered
 * @param {number} props.placeholderHeight - The height for the placeholder element  (component only)
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element  (component only)
 * @param {Function} props.func - The function being loaded on the client. (script only)
 * @param {{ [key: string]: any }} props.args - Arguments to be passed to function loaded on the client (script only)
 */
export const Island = ({
	type,
	// Component props
	deferUntil,
	clientOnly,
	placeholderHeight,
	children,
	// Script props
	func,
	args,
}: Props) => {
	if (type === 'script') {
		return (
			<gu-island
				type="script"
				name={func.name}
				// We don't need the names of the args for loading the function on the client
				props={JSON.stringify(Object.values(args || {}))}
			/>
		);
	}

	return (
		<gu-island
			type="component"
			name={children.type.name}
			deferUntil={deferUntil}
			props={JSON.stringify(children.props)}
			clientOnly={clientOnly}
		>
			{decideChildren(children, clientOnly, placeholderHeight)}
		</gu-island>
	);
};
