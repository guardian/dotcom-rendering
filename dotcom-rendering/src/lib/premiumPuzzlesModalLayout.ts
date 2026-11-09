/**
 * On small screens the unlock modal is a bottom sheet: it sticks to the bottom
 * of the screen, takes up to this share of the screen's height, and its body
 * scrolls while its footer (the buttons) stays in view.
 */
const MAX_HEIGHT_SHARE = 0.7;

/**
 * Below this the body would be too small to read once the footer is taken off,
 * so the modal is not shrunk any further.
 */
const MIN_HEIGHT_PX = 320;

/**
 * The CSS custom property the modal's maximum height is passed in.
 */
export const MODAL_MAX_HEIGHT_PROPERTY =
	'--unlock-premium-puzzles-modal-height';

/**
 * The maximum height, in pixels, of the bottom sheet.
 *
 * A sticky element can never leave its container, and the container (the page
 * content the modal covers) starts below the page header. So when the page is
 * first shown, a sheet taller than the room left under the header would have
 * its bottom, and its buttons, below the fold. The height is therefore capped
 * to the room that is left under the header, as well as to its usual share of
 * the screen.
 *
 * @param viewportHeight the height of the visible screen
 * @param wrapperTop where the covered content starts, measured from the top of
 * the page (not of the screen)
 */
export const getModalMaxHeight = ({
	viewportHeight,
	wrapperTop,
}: {
	viewportHeight: number;
	wrapperTop: number;
}): number => {
	const roomUnderHeader = viewportHeight - wrapperTop;
	const wanted = Math.min(viewportHeight * MAX_HEIGHT_SHARE, roomUnderHeader);

	return Math.round(
		Math.min(viewportHeight, Math.max(MIN_HEIGHT_PX, wanted)),
	);
};
