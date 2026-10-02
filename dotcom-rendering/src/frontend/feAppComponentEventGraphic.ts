import { ElectionComponentsJson } from '../components/ElectionTrackers/electionComponent';
import { FEFrontConfig } from './feFront';

export type FEAppComponentConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

export interface FEAppComponentEventGraphic {
	config: FEAppComponentConfig;
	eventData?: ElectionComponentsJson;
	dataUrl?: string;
	graphicKind?: 'electionTracker';
}
