import { css } from '@emotion/react';
import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';
import { ArticleDesign } from '@guardian/libs';
import { decidePalette } from '../lib/decidePalette';

const captionFont = css`
	${textSans.xxsmall()};
	color: ${text.supporting};
`;

const datelineSpace = css`
	padding-top: 2px;
	margin-bottom: 6px;
`;

// We use the 'Checkbox Hack' for the show-hide functionality of the secondary date line.
// https://css-tricks.com/the-checkbox-hack/
const toggleClass = css`
	input[type='checkbox'] {
		display: none;
	}

	input[type='checkbox']:checked ~ p {
		max-height: 80px;
	}
`;

const pStyle = css`
	max-height: 0;
	overflow: hidden;
	transition: max-height 0.4s ease;
	${from.leftCol} {
		width: 90%;
	}
`;

const labelStyles = css`
	cursor: pointer;

	:hover {
		text-decoration: underline;
	}
`;

// for liveblog smaller breakpoints article meta is located in the same
// container as standfirst and needs the same styling as standfirst
const standfirstColouring = (palette: Palette) => css`
	${until.desktop} {
		color: ${palette.text.standfirst};
	}
`;

// At the moment the 'First published on' / 'Last modified on' is passed through on
// the secondaryDateline (this will be refactored). The current logic checks if the primary
// date is in the secondary to avoid duplicate dates being shown
export const Dateline: React.FC<{
	primaryDateline: string;
	secondaryDateline: string;
	format: ArticleFormat;
}> = ({ primaryDateline, secondaryDateline, format }) => {
	const palette = decidePalette(format);
	return (
		<div
			css={[
				datelineSpace,
				captionFont,
				format.design === ArticleDesign.LiveBlog &&
					standfirstColouring(palette),
			]}
		>
			{secondaryDateline &&
			!secondaryDateline.includes(primaryDateline) ? (
				<div
					css={[
						toggleClass,
						datelineSpace,
						captionFont,
						format.design === ArticleDesign.LiveBlog &&
							standfirstColouring(palette),
					]}
				>
					<label css={labelStyles} htmlFor="dateToggle">
						{primaryDateline}
					</label>

					<input css={toggleClass} type="checkbox" id="dateToggle" />
					<p css={pStyle}>{secondaryDateline}</p>
				</div>
			) : (
				primaryDateline
			)}
		</div>
	);
};
