import { useContext } from 'react';
import type { ScheduleOptions, SchedulePriority } from '../lib/scheduler';
import { IslandDepthContext } from './IslandDepthContext';

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
		defer?: DeferredProps[keyof DeferredProps];
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
	role?: string;
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
export const Island = ({ priority, defer, children, role }: IslandProps) => {
	const rootMargin =
		defer?.until === 'visible' ? defer.rootMargin : undefined;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- Type definitions on children are limited
	const name = String(children.type.name);

	/**
	 * Current depth of island if nested within another island. This is used so
	 * that we only hydrate top-level islands which are then responsible for
	 * hydrating the entire subtree and any child islands.
	 */
	const islandDepth = useContext(IslandDepthContext);

	return (
		<IslandDepthContext.Provider value={islandDepth + 1}>
			{/* Child islands defer to nearest parent island for hydration */}
			{islandDepth > 0 ? (
				children
			) : (
				<gu-island
					name={name}
					priority={priority}
					deferUntil={defer?.until}
					props={JSON.stringify(children.props)}
					rootMargin={rootMargin}
					data-spacefinder-role={role}
				>
					{children}
				</gu-island>
			)}
		</IslandDepthContext.Provider>
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
};
