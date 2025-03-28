import { type CrosswordProps } from '@guardian/react-crossword-next';
import type { EditionId } from '../lib/edition';
import type { FEArticleBadgeType } from '../types/badge';
import type { Block } from '../types/blocks';
import type { CommercialProperties } from '../types/commercial';
import type { ConfigType } from '../types/config';
import type {
	FEElement,
	ImageBlockElement,
	Newsletter,
	StarRating,
} from '../types/content';
import type { FooterType } from '../types/footer';
import type { FELinkType, FENavType, LegacyPillar } from '../types/frontend';
import type { PaginationType } from '../types/liveBlog';
import type { FEOnwards } from '../types/onwards';
import type { MatchType } from '../types/sport';
import type { TagType } from '../types/tag';
import type { FETrailType } from '../types/trails';

/**
 * This type is what we receive from `frontend`,
 * hence the FE prefix.
 *
 * WARNING: run `gen-schema` task if changing this to update the associated JSON
 * schema definition.
 */
export interface FEArticle {
	headline: string;
	standfirst: string;
	affiliateLinksDisclaimer?: string;
	webTitle: string;
	mainMediaElements: FEElement[];
	main: string;
	keyEvents: Block[];
	blocks: Block[];
	pinnedPost?: Block;
	pagination?: PaginationType;
	byline?: string;
	/** @deprecated - will be removed in the next model version */
	author?: unknown;

	/**
	 * @TJS-format date-time
	 */
	webPublicationDateDeprecated: string;
	webPublicationDate: string;
	webPublicationDateDisplay: string;
	webPublicationSecondaryDateDisplay: string;
	editionLongForm: string;
	editionId: EditionId;
	pageId: string;
	version: number; // TODO: check who uses?
	tags: TagType[];
	format: FEFormat;

	// Include pillar and designType until we remove them upstream
	// We type designType as `string` for now so that the field is present,
	// but we don't care what's in it. Pillar we have a type for so we use it
	// but it shouldn't be important.
	designType: string;
	pillar: LegacyPillar;

	isImmersive: boolean;
	sectionLabel: string;
	sectionUrl: string;
	sectionName?: string;
	subMetaSectionLinks: FELinkType[];
	subMetaKeywordLinks: FELinkType[];
	shouldHideAds: boolean;
	isAdFreeUser: boolean;
	openGraphData: { [key: string]: string };
	twitterData: { [key: string]: string };
	webURL: string;
	linkedData: { [key: string]: any }[];
	config: ConfigType;

	showBottomSocialButtons: boolean;
	shouldHideReaderRevenue: boolean;

	// AMP specific (for now)
	guardianBaseURL: string;
	contentType: string;
	hasRelated: boolean;
	publication: string; // TODO: check who uses?
	hasStoryPackage: boolean;
	storyPackage?: {
		trails: FETrailType[];
		heading: string;
	};
	onwards?: FEOnwards[];
	beaconURL: string;
	isCommentable: boolean;
	commercialProperties: CommercialProperties;
	starRating?: StarRating;
	audioArticleImage?: ImageBlockElement;
	trailText: string;
	badge?: FEArticleBadgeType;

	nav: FENavType; // TODO move this out as most code uses a different internal NAV model.

	pageFooter: FooterType;

	contributionsServiceUrl: string;
	slotMachineFlags?: string;

	pageType: PageType;

	matchUrl?: string;
	matchType?: MatchType;
	isSpecialReport: boolean;

	// Interactives made on Frontend rather than DCR require special handling.
	// The logic is date-driven. See:
	// https://github.com/guardian/frontend/blob/main/common/app/model/dotcomrendering/InteractiveSwitchOver.scala#L7.
	isLegacyInteractive?: boolean;
	filterKeyEvents: boolean;

	// Included on live and dead blogs. Used when polling
	mostRecentBlockId?: string;

	promotedNewsletter?: Newsletter;
	canonicalUrl: string;
	showTableOfContents: boolean;
	lang?: string;
	isRightToLeftLang?: boolean;
	crossword?: CrosswordProps['data'];
}

type PageType = {
	hasShowcaseMainElement: boolean;
	isFront: boolean;
	isLiveblog: boolean;
	isMinuteArticle: boolean;
	isPaidContent: boolean;
	isPreview: boolean;
	isSensitive: boolean;
};

type ThemePillar =
	| 'NewsPillar'
	| 'OpinionPillar'
	| 'SportPillar'
	| 'CulturePillar'
	| 'LifestylePillar';

type ThemeSpecial = 'SpecialReportTheme' | 'Labs' | 'SpecialReportAltTheme';
type FETheme = ThemePillar | ThemeSpecial;

/**
 * FEDesign is what frontend gives (originating in the capi scala client) us on the Format field
 * https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
 */
type FEDesign =
	| 'ArticleDesign'
	| 'PictureDesign'
	| 'GalleryDesign'
	| 'AudioDesign'
	| 'VideoDesign'
	| 'CrosswordDesign'
	| 'ReviewDesign'
	| 'AnalysisDesign'
	| 'CommentDesign'
	| 'ExplainerDesign'
	| 'LetterDesign'
	| 'FeatureDesign'
	| 'LiveBlogDesign'
	| 'DeadBlogDesign'
	| 'RecipeDesign'
	| 'MatchReportDesign'
	| 'InterviewDesign'
	| 'EditorialDesign'
	| 'QuizDesign'
	| 'InteractiveDesign'
	| 'PhotoEssayDesign'
	| 'ObituaryDesign'
	| 'FullPageInteractiveDesign'
	| 'NewsletterSignupDesign'
	| 'TimelineDesign'
	| 'ProfileDesign';

/** FEDisplay is the display information passed through from frontend (originating in the capi scala client) and dictates the display style of the content e.g. Immersive
https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Display.scala */
type FEDisplay =
	| 'StandardDisplay'
	| 'ImmersiveDisplay'
	| 'ShowcaseDisplay'
	| 'NumberedListDisplay';

/**
 * FEFormat is the stringified version of Format passed through from Frontend.
 * It gets converted to the `@guardian/libs` format on platform
 */
export type FEFormat = {
	design: FEDesign;
	theme: FETheme;
	display: FEDisplay;
};
