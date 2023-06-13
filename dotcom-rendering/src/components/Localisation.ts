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
	},
};

// This ought to be fixed upstream in the tools, so that everyone is able to make use of the data.
// For now, we'll just do it here.

export const localisedTitle = (
	inputTitle: string,
	editionID?: EditionId,
): string => {
	if (editionID === undefined) {
		return inputTitle;
	}
	return localisedTitles[editionID]?.[inputTitle] ?? inputTitle;
};
