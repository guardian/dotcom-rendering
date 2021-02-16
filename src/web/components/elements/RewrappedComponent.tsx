// @ts-ignore
import { jsx as _jsx } from 'react/jsx-runtime';
import { ClassNames } from '@emotion/react';

import { unescapeData } from '@root/src/lib/escapeData';

// Ideally we want to want to avoid an unnecessary 'span' wrapper,
// which also will cause issues with ads (spacefinder rules). React
// requires a wrapping element for dangerouslySetInnerHTML so we
// strip the original element markup and rewrap. The fallback case is
// added for safety but should never happen. If it does happen
// though it will cause issues with commercial JS which expects
// paras to be top-level.

export const RewrappedComponent = ({
	isUnwrapped,
	html,
	elCss,
	tagName,
}: {
	isUnwrapped: boolean;
	html: string;
	elCss?: string;
	tagName: string;
}) => (
	<ClassNames>
		{({ css }) => {
			const element = isUnwrapped ? tagName : 'span';

			const innerElCss = css`
				${tagName} {
					${elCss || css``}
				}
			`;

			const style = isUnwrapped ? elCss : innerElCss;
			return _jsx(`${element}`, {
				className: style,
				dangerouslySetInnerHTML: {
					__html: unescapeData(html),
				},
			});
		}}
	</ClassNames>
);
