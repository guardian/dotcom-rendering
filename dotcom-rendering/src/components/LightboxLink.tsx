import { css } from '@emotion/react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import {
	from,
	palette,
	until,
	visuallyHidden,
} from '@guardian/source-foundations';
import { SvgArrowExpand } from '@guardian/source-react-components';
import type { RoleType } from '../types/content';

type Props = {
	elementId: string;
	role: RoleType;
	format: ArticleFormat;
	isMainMedia?: boolean;
	position: number;
};

function decideSize(role: RoleType, format: ArticleFormat) {
	const smallStyles = css`
		height: 32px;
		width: 32px;
		svg {
			height: 20px;
			width: 20px;
		}
	`;
	const largeStyles = css`
		height: 44px;
		width: 44px;
		svg {
			height: 32px;
			width: 32px;
		}
	`;

	switch (format.design) {
		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog: {
			return smallStyles;
		}
		default: {
			switch (role) {
				case 'halfWidth':
				case 'supporting': {
					return smallStyles;
				}
				case 'inline':
				case 'showcase':
				case 'immersive':
				default: {
					return largeStyles;
				}
			}
		}
	}
}

/**
 * This overlay makes it possible to click anywhere on an image and the lightbox
 * will hydrate/appear.
 *
 * How?
 * ----
 * Because the click overlay is simply an a tag linking to e.g. #img-12 and the
 * LighboxJavascript is hydrated when the browser loads a url with a hash matching
 * this pattern
 */
const ClickOverlay = ({
	children,
	position,
}: {
	children: React.ReactNode;
	position: number;
}) => {
	return (
		<a
			href={`#img-${position}`}
			css={css`
				position: absolute;
				top: 0;
				width: 100%;
				height: 100%;
				cursor: pointer;
				${from.tablet} {
					:hover > button.open-lightbox {
						opacity: 0.7;
					}
				}
			`}
			data-ignore="global-link-styling"
			className="open-lightbox"
			aria-hidden="true"
			tabIndex={-1}
		>
			{children}
		</a>
	);
};

export const LightboxLink = ({
	elementId,
	role,
	format,
	isMainMedia,
	position,
}: Props) => {
	return (
		<ClickOverlay position={position}>
			<button
				data-element-id={elementId}
				type="button"
				className="open-lightbox"
				aria-haspopup="dialog"
				css={[
					css`
						position: absolute;
						right: 0;
						svg {
							margin-top: 3px;
							fill: ${palette.neutral[100]};
						}
						margin: 6px;
						${until.tablet} {
							padding: 0;
						}
						border-radius: 50%;
						border: none;
						cursor: pointer;
						background: rgba(18, 18, 18, 0.8);
						opacity: 0;
						${from.tablet} {
							:hover {
								filter: brightness(85%);
								opacity: 0.8;
							}
							:focus {
								opacity: 0.7;
							}
						}
					`,
					/* Don't show the button over thumbnails; they're too small */
					role === 'thumbnail' &&
						css`
							display: none;
						`,
					decideSize(role, format),
					isMainMedia &&
						format.display === ArticleDisplay.Immersive &&
						visuallyHidden,
				]}
			>
				<SvgArrowExpand isAnnouncedByScreenReader={false} />
				<span
					css={css`
						${visuallyHidden}
					`}
				>
					View image in fullscreen
				</span>
			</button>
		</ClickOverlay>
	);
};
