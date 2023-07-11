import type { CustomParams } from '@guardian/commercial';
import type { ArticleDesign, ArticleTheme } from '@guardian/libs';

export type AdTargeting =
	| {
			adUnit: string;
			customParams: CustomParams;
			disableAds?: false;
	  }
	| {
			disableAds: true;
	  };

export type AudioAtomType = {
	id: string;
	trackUrl: string;
	kicker: string;
	title?: string;
	pillar: ArticleTheme;
	shouldUseAcast?: boolean;
	duration: number;
};

export type ChartAtomType = {
	id: string;
	html: string;
};

export type ExplainerAtomType = {
	id: string;
	title: string;
	html: string;
};

export type GuideAtomType = {
	id: string;
	label?: string;
	title: string;
	image?: string;
	html: string;
	credit?: string;
	pillar: ArticleTheme;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
	design?: ArticleDesign;
};

export type InteractiveAtomBlockElementType = {
	_type: string;
	css: string;
	js: string;
	html: string;
	id: string;
	url: string;
};

export type InteractiveLayoutAtomType = {
	_type: string;
	css: string;
	js: string;
	html: string;
	id: string;
	url: string;
};

export type ProfileAtomType = {
	id: string;
	label?: string;
	title: string;
	image?: string;
	html: string;
	credit?: string;
	pillar: ArticleTheme;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export type QandaAtomType = {
	id: string;
	title: string;
	image?: string;
	html: string;
	credit?: string;
	pillar: ArticleTheme;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export type TimelineAtomType = {
	id: string;
	events?: TimelineEvent[];
	title: string;
	pillar: ArticleTheme;
	description?: string;
	expandForStorybook?: boolean;
	likeHandler?: () => void;
	dislikeHandler?: () => void;
	expandCallback?: () => void;
};

export interface TimelineEvent {
	title: string;
	date: string;
	unixDate: number;
	body?: string;
	toDate?: string;
	toUnixDate?: number;
}

type AssetType = {
	url: string;
	mimeType: string;
};

export type VideoAtomType = {
	assets: AssetType[];
	poster?: string;
	height?: number;
	width?: number;
};

export type SrcSetItem = { src: string; width: number };

export type ImageSource = {
	srcSet: SrcSetItem[];
};

// aka weighting. RoleType affects how an image is placed. It is called weighting
// in Composer but role in CAPI. We respect CAPI so we maintain this nomenclature
// in DCR
export type RoleType =
	| 'immersive'
	| 'supporting'
	| 'showcase'
	| 'inline'
	| 'thumbnail'
	| 'halfWidth';

export type SharePlatformType =
	| 'facebook'
	| 'twitter'
	| 'email'
	| 'linkedIn'
	| 'pinterest'
	| 'whatsApp'
	| 'messenger';

export type SharingUrlsType = {
	[K in SharePlatformType]?: {
		url: string;
		userMessage: string;
	};
};

export type VideoEventKey =
	| 'play'
	| '25'
	| '50'
	| '75'
	| 'end'
	| 'skip'
	| 'cued'
	| 'resume'
	| 'pause';

export type RecipeSchemaAtomType = {
	id: string;
	json: string;
};
