import { useConfig } from './ConfigContext';
import { Placeholder } from './Placeholder';

/**
 * An island can be server-side rendered and then hydrated on the client,
 * or simply rendered on the client (with the server optionally rendering a
 * placeholder of a specified height).
 *
 * This specifies the  of possible props when specifying how the
 * island should be rendered
 */
type ClientOnlyProps =
	| {
			clientOnly: true;
			/**
			 * Islands that are rendered on the client can optionally specify
			 * a placeholder height that is server side rendered
			 */
			placeholderHeight?: number;
	  }
	| {
			clientOnly?: false;
			/**
			 * Islands that are rendered on the server can never specify a
			 * placeholder height
			 */
			placeholderHeight?: never;
	  };

type DefaultProps = ClientOnlyProps & {
	deferUntil?: never;
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated/rendered when it
 * becomes visible
 */
type VisibleProps = ClientOnlyProps & {
	deferUntil: 'visible';
	/**
	 * @see https://developer.mozilla.org/en-us/docs/web/api/intersectionobserver/rootmargin
	 */
	rootMargin?: string;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be hydrated/rendered when the
 * browser is idle
 */
type IdleProps = ClientOnlyProps & {
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
	clientOnly?: never;
	placeholderHeight?: never;
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * The possible props for an island that should be rendered when a user adds a
 * hash fragment to the page URL
 */
type HashProps = {
	deferUntil: 'hash';
	clientOnly: true;
	placeholderHeight?: never;
	rootMargin?: never;
	children: JSX.Element;
};

/**
 * Props
 *
 * We use a union type here to support conditional typing.
 *
 * This means you can only supply:
 * - `placeholderHeight` if `clientOnly` is `true`
 * - `rootMargin` if `deferUntil` is `visible`
 */
type Props =
	| DefaultProps
	| VisibleProps
	| IdleProps
	| InteractionProps
	| HashProps;

const decideChildren = (
	children: JSX.Element,
	clientOnly?: boolean,
	placeholderHeight?: number,
) => {
	if (!clientOnly) return children; // Server side rendering
	if (placeholderHeight !== undefined && placeholderHeight > 0)
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
 * @param {HydrateProps | ClientOnlyProps} props - JSX Props
 * @param {JSX.IntrinsicElements["gu-island"]} props.deferUntil - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 *      - interaction - Execute when component is clicked on in the viewport
 * @param {boolean} props.clientOnly - Should the component be server side rendered
 * @param {number} props.placeholderHeight - The height for the placeholder element
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element
 */
export const Island = ({
	deferUntil,
	clientOnly,
	placeholderHeight,
	rootMargin,
	children,
}: Props) => {
	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context
	 * @see /dotcom-rendering/src/components/ArticlePage.tsx or look for a `<ConfigProvider />`
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
			clientOnly={clientOnly}
			rootMargin={rootMargin}
			config={JSON.stringify(config)}
		>
			{decideChildren(children, clientOnly, placeholderHeight)}
		</gu-island>
	);
};

/**
 * If JavaScript is disabled, hide client-only islands
 */
export const islandNoscriptStyles = `
<style>
	gu-island[clientOnly] { display: none; }
</style>
`;
