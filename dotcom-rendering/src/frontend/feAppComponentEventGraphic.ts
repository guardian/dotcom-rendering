import type { ElectionComponentsJson } from '../components/ElectionTrackers/electionComponent';
import type { FEFrontConfig } from './feFront';

export type FEAppComponentConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

type EventGraphicKind = 'electionTracker';
export const isEventGraphic = (name?: string): name is EventGraphicKind =>
	name === 'election-tracker/us-general-2024/congress';

export interface FEAppComponentEventGraphic {
	config: FEAppComponentConfig;
	eventData?: ElectionComponentsJson;
	dataUrl?: string;
	graphicKind?: EventGraphicKind;
}
