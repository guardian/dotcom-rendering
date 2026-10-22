import { type ElectionComponentsJson } from '../components/ElectionTrackers/electionComponent';
import { type FEFrontConfig } from './feFront';

export type FEAppsComponentConfig = Omit<
	FEFrontConfig,
	'keywordIds' | 'keywords' | 'isFront'
> & {
	isFront: boolean;
	hasSurveyAd: boolean;
};

const eventGraphicNames = [
	'election-tracker/us-general-2024/congress',
	'election-tracker/us-general-2026/congress',
] as const;

type EventGraphicName = (typeof eventGraphicNames)[number];
type EventGraphicKind = 'electionTracker';

export const isEventGraphic = (name?: string): name is EventGraphicName =>
	eventGraphicNames.some((eventGraphicName) => eventGraphicName === name);

export interface FEAppsComponentEventGraphic {
	config: FEAppsComponentConfig;
	eventData?: ElectionComponentsJson;
	dataUrl?: string;
	graphicKind?: EventGraphicKind;
}
