import ReactDOM from 'react-dom';

type Props = {
	rootId: string;
	children: React.ReactNode;
};

// See the preact portal code for details on how this feature works
// In particular, we can see that portals can safely be recreated and
// that will not cause the child component being passed in to be mounted
// again. Instead it is simply rerendered
// https://github.com/preactjs/preact/blob/df748d106fb78fbd46d14563b4712f921ccf0300/compat/src/portals.js
export const Portal = ({ rootId, children }: Props) => {
	const element = document.getElementById(rootId);
	if (!element) return null;
	// First remove any placeholder. Why? Because we sometimes server side render Placeholders in
	// the root divs where the Portal is being inserted so the page is rendered with the placeholder
	// showing (to reduce jank). But ReactDOM.createPortal won't replace content so we need to
	// manually remove it here.
	const placeholderElement = element.querySelector(
		'[data-name="placeholder"]',
	);
	if (placeholderElement) placeholderElement.remove();
	const result = ReactDOM.createPortal(children, element);
	return result;
};
