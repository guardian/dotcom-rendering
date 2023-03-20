/**
 * A type defining what where we are targeting a particular rendered
 * page to be shown
 *
 * This can be used to make decisions during rendering, where there
 * might be differences in the requirements of each target.
 *
 * Targets:
 * - Web 	=> A full web browser, such as chrome or safari on a desktop computer, laptop or phone.
 * - Apps 	=> A webview rendered within the Android or iOS live apps
 */
export type RenderingTarget = 'Web' | 'Apps';
