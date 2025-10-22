import { literal, object, union, type z } from 'zod';

const FEPillarSchema = union([
	literal('NewsPillar'),
	literal('OpinionPillar'),
	literal('SportPillar'),
	literal('CulturePillar'),
	literal('LifestylePillar'),
]);

const FEThemeSpecialSchema = union([
	literal('SpecialReportTheme'),
	literal('Labs'),
	literal('SpecialReportAltTheme'),
]);

const FEThemeSchema = union([FEPillarSchema, FEThemeSpecialSchema]);

/**
 * FEDesign is what frontend gives (originating in the capi scala client) us on the Format field
 * https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Design.scala
 */
const FEDesignSchema = union([
	literal('ArticleDesign'),
	literal('PictureDesign'),
	literal('GalleryDesign'),
	literal('AudioDesign'),
	literal('VideoDesign'),
	literal('CrosswordDesign'),
	literal('ReviewDesign'),
	literal('AnalysisDesign'),
	literal('CommentDesign'),
	literal('ExplainerDesign'),
	literal('LetterDesign'),
	literal('FeatureDesign'),
	literal('LiveBlogDesign'),
	literal('DeadBlogDesign'),
	literal('RecipeDesign'),
	literal('MatchReportDesign'),
	literal('InterviewDesign'),
	literal('EditorialDesign'),
	literal('QuizDesign'),
	literal('InteractiveDesign'),
	literal('PhotoEssayDesign'),
	literal('ObituaryDesign'),
	literal('FullPageInteractiveDesign'),
	literal('NewsletterSignupDesign'),
	literal('TimelineDesign'),
	literal('ProfileDesign'),
]);

/** FEDisplay is the display information passed through from frontend (originating in the capi scala client) and dictates the display style of the content e.g. Immersive
https://github.com/guardian/content-api-scala-client/blob/master/client/src/main/scala/com.gu.contentapi.client/utils/format/Display.scala */
const FEDisplaySchema = union([
	literal('StandardDisplay'),
	literal('ImmersiveDisplay'),
	literal('ShowcaseDisplay'),
	literal('NumberedListDisplay'),
]);

/**
 * FEFormat is the stringified version of Format passed through from Frontend.
 * It gets converted to the `@guardian/libs` format on platform
 */
export const FEFormatSchema = object({
	design: FEDesignSchema,
	theme: FEThemeSchema,
	display: FEDisplaySchema,
});

export type FEFormat = z.infer<typeof FEFormatSchema>;
