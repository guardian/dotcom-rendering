import { useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import { FeastRecipeNudge } from './FeastRecipeNudge';

type Props = {
	recipeName: string;
	pageId: string;
	editionId: EditionId;
};

export const FeastRecipeNudgeIsland = ({
	recipeName,
	pageId,
	editionId,
}: Props) => {
	const [shouldRender, setShouldRender] = useState(true); // DEV ONLY // DEV ONLY // DEV ONLY : Change it to false before merging
	const { darkModeAvailable } = useConfig();
	const abTestAPI = useAB()?.api;

	useEffect(() => {
		if (!abTestAPI?.isUserInVariant('FeastContextualNudge', 'variant'))
			return;
		setShouldRender(true);
	}, [abTestAPI]);

	if (!shouldRender) return null;

	return (
		<FeastRecipeNudge
			recipeName={recipeName}
			pageId={pageId}
			editionId={editionId}
			darkModeAvailable={darkModeAvailable}
		/>
	);
};
