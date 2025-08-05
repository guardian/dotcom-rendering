import { createContext } from 'react';

type Config = {
	isChild: boolean;
};

/**
 * Context to track whether the current island is a child of another island.
 * Child islands defer to the nearest parent island for hydration.
 */
export const IslandContext = createContext<Config>({ isChild: false });

export const IslandProvider = ({
	value,
	children,
}: {
	value: Config;
	children: React.ReactNode;
}) => <IslandContext.Provider value={value}>{children}</IslandContext.Provider>;
