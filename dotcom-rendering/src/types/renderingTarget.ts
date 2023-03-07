/**
 * An enum defining what where we are targeting a particular rendered
 * page to be shown
 *
 * This can be used to make decisions during rendering, where there
 * might be differences in the requirements of each target.
 *
 * Targets:
 * - Web 	=> A full web browser, such as chrome or safari on a desktop computer, laptop or phone.
 * - Apps 	=> A webview rendered within the Android or iOS live apps
 */
export enum RenderingTarget {
	Web,
	Apps,
}

/**
 * Takes a generic Props which represent the props defined as 'apps only'
 *
 * This type is then extended with the 'renderingTarget' set to RenderingTarget.Apps
 *
 * 'void' can be passed to this type when no specific props need to be set
 */
type AppsProps<Props> = Props extends void
	? { renderingTarget: RenderingTarget.Apps }
	: Props & { renderingTarget: RenderingTarget.Apps };

/**
 * Takes a generic Props which represent the props defined as 'web only'
 *
 * This type is then extended with the 'renderingTarget' set to RenderingTarget.Web
 *
 * 'void' can be passed to this type when no specific props need to be set
 */
type WebProps<Props> = Props extends void
	? { renderingTarget: RenderingTarget.Web }
	: Props & { renderingTarget: RenderingTarget.Web };

/**
 * This type can be set to either AppsProps or WebProps, and takes two generics
 * one for each rendering targets props
 */
type AppsOrWeb<Apps, Web> = AppsProps<Apps> | WebProps<Web>;

/**
 * A type that contains both a set of common props, and either
 * props for the Web rendering target, or props for the Apps rendering target
 *
 * This type can be used when you need to define differing props/data requirements between rendering platforms
 *
 * Usage:
 * ```
 * // Definition of a component
 * type CommonProps = {
 *    format: ArticleFormat;
 * };
 *
 * // Use void if you don't have anything you specifically need to define for one target.
 * type AppsProps = void;
 *
 * type WebProps = {
 *    webOnlyValue: string;
 * };
 *
 * const MyComponent = (props: CombinedProps<CommonProps, AppsProps, WebProps>) => ...
 * ```
 *
 * For more information see the RFC raised here: https://github.com/guardian/dotcom-rendering/issues/7256
 */
export type CombinedProps<Common, Apps, Web> = Common & AppsOrWeb<Apps, Web>;
