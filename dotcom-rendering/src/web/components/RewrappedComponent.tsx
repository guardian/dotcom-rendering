// @ts-ignore -- we’re actually using preact
import { jsx as _jsx } from 'react/jsx-runtime';
import { ClassNames } from '@emotion/react';

import type { HTMLTag } from 'src/model/unwrapHtml';
import { unescapeData } from '../../lib/escapeData';

/**
 * React requires a wrapping element for `dangerouslySetInnerHTML` so we
 * strip the original element markup and rewrap.
 *
 * The fallback case (`isUnwrapped == false`) is added for safety,
 * but should _never_ happen. We want to avoid an unnecessary `<span>` wrapper,
 * which can cause issues with ads and commercial JS (`spacefinder` rules).
 * Commercial expects `<p>` tags at the top level of the rewrapped element.
 */
export const RewrappedComponent = ({
	isUnwrapped,
	html,
	elCss,
	tagName,
}: {
	isUnwrapped: boolean;
	html: string;
	elCss?: string;
	tagName: HTMLTag;
}) => (
	<ClassNames>
		{({ css }) => {
			const element: HTMLTag = isUnwrapped ? tagName : 'span';

			// If we implement a span, we want to apply the CSS to the inner element
			// to ensure we still style correctly
			const innerElCss = css`
				${tagName} {
					${elCss}
				}
			`;

			const style = isUnwrapped ? elCss : innerElCss;

			// Create a react element from the tagName passed in OR
			// default to <span> if we've not been able to unwrap based on prefix & suffix
			return _jsx(element, {
				// if style is `undefined`, it will be omitted
				className: style,
				dangerouslySetInnerHTML: {
					__html: unescapeData(html),
				},
			});
		}}
	</ClassNames>
);
