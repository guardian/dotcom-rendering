import { isUndefined } from '@guardian/libs'
import type { EditionId } from '../lib/edition';

type LocalisedTitles = {
	[edition in EditionId]?: {
		[title: string]: string;
	};
};

export const localisedTitles: LocalisedTitles = {
	US: {
		Film: 'Movies',
		Football: 'Soccer',
		'in football': 'in soccer',
		'in film': 'in movies',
	},
};

// This ought to be fixed upstream in the tools, so that everyone is able to make use of the data.
// For now, we'll just do it here.

export const localisedTitle = (
	inputTitle: string,
	editionID?: EditionId,
): string => {
	if (isUndefined(editionID)) {
		return inputTitle;
	}
	return localisedTitles[editionID]?.[inputTitle] ?? inputTitle;
};
