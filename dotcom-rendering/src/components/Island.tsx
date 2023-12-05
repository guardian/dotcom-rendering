import type { ScheduleOptions, SchedulePriority } from '../lib/scheduler';
import { useConfig } from './ConfigContext';

type DeferredProps = {
	visible: {
		until: 'visible';
		/**
		 * @see https://developer.mozilla.org/en-us/docs/web/api/intersectionobserver/rootmargin
		 */
		rootMargin?: string;
	};
	idle: {
		until: 'idle';
	};
	interaction: {
		until: 'interaction';
	};
	hash: {
		until: 'hash';
	};
};

type PriorityProps = {
	critical: {
		priority: SchedulePriority['critical'];
		// a critical island should never defer until idle
		defer?: DeferredProps[Exclude<keyof DeferredProps, 'idle'>];
	};
	feature: {
		priority: SchedulePriority['feature'];
		defer: DeferredProps[keyof DeferredProps];
	};
	enhancement: {
		priority: SchedulePriority['enhancement'];
		defer: DeferredProps[keyof DeferredProps];
	};
};

type IslandProps = {
	children: JSX.Element;
} & PriorityProps[keyof PriorityProps];

/**
 * Adds interactivity to the client by either hydrating or inserting content.
 *
 * Note. The component passed as children must follow the [MyComponent].importable.tsx
 * namimg convention
 *
 * @param {IslandProps} props - JSX Props
 * @param {JSX.Element} props.children - The component being inserted. Must be a single JSX Element
 */
export const Island = ({ priority, defer, children }: IslandProps) => {
	/**
	 * Where is this coming from?
	 * Config value is set at high in the component tree within a React context in a `<ConfigProvider />`
	 *
	 * This is here so that we can provide the config information to the hydrated, client-side rendered components
	 */
	const config = useConfig();

	const rootMargin =
		defer?.until === 'visible' ? defer.rootMargin : undefined;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Type definitions on children are limited
	const name = String(children.type.name);

	return (
		<gu-island
			name={name}
			priority={priority}
			deferUntil={defer?.until}
			props={JSON.stringify(children.props)}
			rootMargin={rootMargin}
			config={JSON.stringify(config)}
		>
			{children}
		</gu-island>
	);
};

/**
 * Used for JSX custom element declaration
 * {@link ../../index.d.ts}
 */
export type GuIsland = {
	name: string;
	priority: ScheduleOptions['priority'];
	deferUntil?: NonNullable<IslandProps['defer']>['until'];
	rootMargin?: string;
	props: string;
	children: React.ReactNode;
	/**
	 * This should be a stringified JSON of `ConfigContext`
	 * @see /dotcom-rendering/src/types/configContext.ts
	 */
	config: string;
};
