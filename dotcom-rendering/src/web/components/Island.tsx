/* eslint-disable @typescript-eslint/no-unsafe-member-access */
interface Props {
	defer?: 'idle' | 'visible';
	children: JSX.Element;
}

/**
 * Adds interactivity to the client by either hydrating or inserting content
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param defer - Delay when client code should execute
 * 		- idle - Execute when browser idle
 * 		- visible - Execute when component appears in viewport
 * @param children - The component being inserted. Must be a single React Element
 *
 */
export const Island = ({ defer, children }: Props) => (
	<gu-island
		name={children.type.name}
		defer={defer}
		props={JSON.stringify(children.props)}
	>
		{children}
	</gu-island>
);
