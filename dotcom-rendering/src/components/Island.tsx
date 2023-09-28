import { useConfig } from './ConfigContext';

type DefaultProps = {
	deferUntil?: never;
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated when it
 * becomes visible
 */
type VisibleProps = {
	deferUntil: 'visible';
	/**
	 * @see https://developer.mozilla.org/en-us/docs/web/api/intersectionobserver/rootmargin
	 */
	rootMargin?: string;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated when the
 * browser is idle
 */
type IdleProps = {
	deferUntil: 'idle';
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated when a user
 * interacts with the island
 */
type InteractionProps = {
	deferUntil: 'interaction';
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated when a user adds a
 * hash fragment to the page URL
 */
type HashProps = {
	deferUntil: 'hash';
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * Props
 *
 * We use a union type here to support conditional typing.
 *
 * This means you can only supply:
 * - `rootMargin` if `deferUntil` is `visible`
 */
type Props =
	| DefaultProps
	| VisibleProps
	| IdleProps
	| InteractionProps
	| HashProps;

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param {HydrateProps | ClientOnlyProps} props - JSX Props
 * @param {JSX.IntrinsicElements["gu-island"]} props.deferUntil - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 *      - interaction - Execute when component is clicked on in the viewport
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element
 */
export const Island = ({ deferUntil, rootMargin, children }: Props) => {
	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 *
	 * This is here so that we can provide the config information to the hydrated, client-side rendered components
	 */
	const config = useConfig();

	return (
		<gu-island
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- Type definitions on children are limited
			name={children.type.name}
			deferUntil={deferUntil}
			props={JSON.stringify(children.props)}
			rootMargin={rootMargin}
			config={JSON.stringify(config)}
		>
			{children}
		</gu-island>
	);
};

/**
 * If JavaScript is disabled, hide client-only islands
 */
export const islandNoscriptStyles = `
<style>
	gu-island [data-name="placeholder"] { display: none; }
</style>
`;
