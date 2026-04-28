import { useEffect, useState } from 'react';
import { useConfig } from './ConfigContext';
import type { EditionId } from '../lib/edition';
import { useAB } from '../lib/useAB';
import type { RecipeBlockElement } from '../types/content';
import { FeastRecipeNudge } from './FeastRecipeNudge';

type Props = {
	recipeName: string;
	recipe?: RecipeBlockElement;
	pageId: string;
	editionId: EditionId;
};

export const FeastRecipeNudgeIsland = ({
	recipeName,
	recipe,
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
			recipe={recipe}
			pageId={pageId}
			editionId={editionId}
			darkModeAvailable={darkModeAvailable}
		/>
	);
};
