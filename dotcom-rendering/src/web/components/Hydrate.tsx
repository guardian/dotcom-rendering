/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface HydrateProps {
	when?: 'immediate' | 'idle' | 'visible';
	children: JSX.Element;
}

/**
 * Hydrates a component in the client by async loading the exported component.
 *
 * Note. The component being hydrated must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param when - When hydration should take place.
 * 		- immediate - Hydrate without delay
 * 		- idle - Hydrate when browser idle
 * 		- visible - Hydrate when component appears in viewport
 * @param children - What you want hydrated.
 *
 */
export const Hydrate = ({ when = 'immediate', children }: HydrateProps) => (
	<gu-hydrate
		name={children.type.name}
		when={when}
		props={JSON.stringify(children.props)}
	>
		{children}
	</gu-hydrate>
);
