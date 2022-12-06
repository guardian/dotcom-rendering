import { createContext, ReactNode, useContext } from 'react';

export const initRecordIslands = (): {
	getIds: () => Set<string>;
	recordId: (islandId: string) => Set<string>;
} => {
	let expeditedIds = new Set<string>();
	const getIds = () => expeditedIds;
	const addId = (id: string) => expeditedIds.add(id);
	return { getIds, recordId: addId };
};

const IslandRecordContext = createContext<{
	recordId?: (islandId: string) => Set<string>;
}>({});

export const IslandRecordProvider = ({
	recordId,
	children,
}: {
	recordId: (islandId: string) => Set<string>;
	children: ReactNode;
}) => (
	<IslandRecordContext.Provider value={{ recordId }}>
		{children}
	</IslandRecordContext.Provider>
);

export const useRecordIsland = (islandId: string): void => {
	const { recordId } = useContext(IslandRecordContext);

	if (!recordId) {
		throw Error('This must be down the tree of a IslandRecordProvider!');
	}

	recordId(islandId);
};
