import { useConfig } from './ConfigContext';

type VisibleProps = {
	until: 'visible';
	/**
	 * @see https://developer.mozilla.org/en-us/docs/web/api/intersectionobserver/rootmargin
	 */
	rootMargin?: string;
};

type IdleProps = {
	until: 'idle';
};

type InteractionProps = {
	until: 'interaction';
};

type HashProps = {
	until: 'hash';
};

type IslandProps = {
	children: JSX.Element;
	clientOnly?: never;
	defer?: VisibleProps | IdleProps | InteractionProps | HashProps;
};

type ClientOnlyIslandProps = {
	children: JSX.Element;
	clientOnly: true;
	defer?: VisibleProps | IdleProps | HashProps;
};

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param {IslandProps | ClientOnlyIslandProps} props - JSX Props
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element
 */
export const Island = ({
	clientOnly,
	defer,
	children,
}: IslandProps | ClientOnlyIslandProps) => {
	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 *
	 * This is here so that we can provide the config information to the hydrated, client-side rendered components
	 */
	const config = useConfig();

	const rootMargin =
		defer?.until === 'visible' ? defer.rootMargin : undefined;

	return (
		<gu-island
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access -- Type definitions on children are limited
			name={children.type.name}
			deferUntil={defer?.until}
			props={JSON.stringify(children.props)}
			clientOnly={clientOnly}
			rootMargin={rootMargin}
			config={JSON.stringify(config)}
		>
			{clientOnly ? null : children}
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

/**
 * Used for JSX custom element declaration
 * {@link ../../index.d.ts}
 */
export type GuIsland = {
	name: string;
	deferUntil?: NonNullable<IslandProps['defer']>['until'];
	rootMargin?: string;
	clientOnly?: boolean;
	props: string;
	children: React.ReactNode;
	/**
	 * This should be a stringified JSON of `ConfigContext`
	 * @see /dotcom-rendering/src/types/configContext.ts
	 */
	config: string;
};
