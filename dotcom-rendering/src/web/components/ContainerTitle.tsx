import { css } from '@emotion/react';
import {
	body,
	headline,
	neutral,
	news,
	space,
	until,
} from '@guardian/source-foundations';
import type { DCRContainerPalette } from '../../types/front';
import type { Colour } from '../../types/palette';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
import type { EditionId } from '../lib/edition';
import { getEditionFromId } from '../lib/edition';

type Props = {
	title?: string;
	fontColour?: string;
	description?: string;
	url?: string;
	containerPalette?: DCRContainerPalette;
	showDateHeader?: boolean;
	editionId?: EditionId;
};

const linkStyles = css`
	text-decoration: none;
	color: ${neutral[7]};

	:hover {
		text-decoration: underline;
	}
`;

const headerStyles = (fontColour?: string) => css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${fontColour ?? neutral[7]};
	padding-bottom: ${space[1]}px;
	padding-top: 6px;
	overflow-wrap: break-word; /*if a single word is too long, this will break the word up rather than have the display be affected*/
`;

const descriptionStyles = (fontColour?: string) => css`
	${body.xsmall({ fontWeight: 'medium' })};
	color: ${fontColour ?? neutral[46]};
	p {
		/* Handle paragraphs in the description */
		margin-bottom: ${space[3]}px;
	}
	a {
		color: ${neutral[7]};
		text-decoration: none;
	}
`;

const bottomMargin = css`
	margin-bottom: ${space[2]}px;
`;

const marginStyles = css`
	margin-left: 0;
`;

const dateTextStyles = (color: Colour) => css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	color: ${color};
	${until.tablet} {
		display: none;
	}
`;

const containerStyles = css`
	${until.leftCol} {
		max-width: 82%;
	}
`;

/**
 * ContainerTitle
 *
 * For the date header to be shown, a valid editionId must be passed, as the
 * date is based off of the edition timezone.
 */
export const ContainerTitle = ({
	title,
	fontColour,
	description,
	url,
	containerPalette,
	showDateHeader,
	editionId,
}: Props) => {
	if (!title) return null;

	const overrides =
		containerPalette && decideContainerOverrides(containerPalette);

	const now = new Date();
	const locale = editionId && getEditionFromId(editionId).locale;

	return (
		<div css={[marginStyles, containerStyles]}>
			{url ? (
				<a css={[linkStyles, bottomMargin]} href={url}>
					<h2 css={headerStyles(fontColour)}>{title}</h2>
				</a>
			) : (
				<h2 css={headerStyles(fontColour)}>{title}</h2>
			)}
			{!!description && (
				<div
					css={[descriptionStyles(fontColour), bottomMargin]}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
			{showDateHeader && editionId && (
				<>
					<span
						css={dateTextStyles(
							overrides?.text.containerDate ?? neutral[0],
						)}
					>
						{now.toLocaleDateString(locale, { weekday: 'long' })}
					</span>
					<span
						css={[
							css`
								display: block;
							`,
							dateTextStyles(
								overrides?.text.containerDate ?? news[400],
							),
							bottomMargin,
						]}
					>
						{now.toLocaleDateString(locale, {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
						})}
					</span>
				</>
			)}
		</div>
	);
};
