/**
 * 🙏 Only put GLOBAL overrides here 🙏
 *
 * Any config key value entered here will be used by ALL tests (jest,
 * Storybook, Playwright, etc.) and could cause confusing side effects.
 *
 * If you need to override a value for a specific config property please consider
 * doing this locally using a spread operator. Eg.:
 *
 * import { Article as Original } from '/fixtures/automatic/articles/Article';
 *
 * const MyArticle = {
 *   ...Original,
 *   config: {
 *     ...Original.config,
 *     myProperty: true,
 *   }
 * }
 *
 * If you still think you need a global override please add a comment explaining
 * why, thanks!
 */
module.exports = {
	configOverrides: {},
};
