import { type ElectionComponentsJson } from '../components/ElectionTrackers/electionComponent';
import { type FEFrontConfig } from './feFront';

export type FEAppsComponentConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

type EventGraphicKind = 'electionTracker';
export const isEventGraphic = (name?: string): name is EventGraphicKind =>
	name === 'election-tracker/us-general-2024/congress';

export interface FEAppsComponentEventGraphic {
	config: FEAppsComponentConfig;
	eventData?: ElectionComponentsJson;
	dataUrl?: string;
	graphicKind?: EventGraphicKind;
}
