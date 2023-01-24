import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
	Stage,
	Tracking,
} from './shared';
import { EpicVariant } from '../abTests/epic';
import {OphanComponentEvent} from "@guardian/libs";

export type ArticleCountType =
	| 'for52Weeks' // The user's total article view count, which currently goes back as far as 52 weeks
	| 'forTargetedWeeks'; // The user's article view count for the configured periodInWeeks/tag

export type ArticleCounts = {
	[type in ArticleCountType]: number;
};

export interface EpicProps extends EmotionJSX.IntrinsicAttributes {
	variant: EpicVariant;
	tracking: Tracking;
	countryCode?: string;
	articleCounts: ArticleCounts;
	// eslint-disable-next-line @typescript-eslint/ban-types
	onReminderOpen?: Function;
	email?: string;
	fetchEmail?: () => Promise<string | null>;
	submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
	openCmp?: () => void;
	hasConsentForArticleCount?: boolean;
	stage?: Stage;
}

