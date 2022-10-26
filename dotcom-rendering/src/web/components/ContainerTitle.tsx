import { css } from '@emotion/react';
import {
	between,
	from,
	headline,
	news,
	space,
	text,
	until,
} from '@guardian/source-foundations';
import type { EditionId } from '../../types/edition';
import type { DCRContainerPalette } from '../../types/front';
import type { Colour } from '../../types/palette';
import { decideContainerOverrides } from '../lib/decideContainerOverrides';
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
	color: ${text.anchorSecondary};

	:hover {
		text-decoration: underline;
	}
`;

const headerStyles = (fontColour?: string) => css`
	${headline.xsmall({ fontWeight: 'bold' })};
	color: ${fontColour || text.primary};
	padding-bottom: ${space[2]}px;
	padding-top: ${space[1]}px;
`;

const descriptionStyles = (fontColour?: string) => css`
	${headline.xxxsmall({ fontWeight: 'medium' })};
	color: ${fontColour || text.supporting};
	p {
		/* Handle paragraphs in the description */
		margin-bottom: ${space[3]}px;
	}
	a {
		color: ${text.primary};
		text-decoration: none;
	}

	${until.leftCol} {
		margin-bottom: ${space[4]}px;
	}
`;

const leftMarginStyles = css`
	margin-left: 0;
	${between.tablet.and.leftCol} {
		margin-left: 10px;
	}

	${from.leftCol} {
		margin-left: 0;
	}
`;

const dateTextStyles = (color: Colour) => css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	color: ${color};
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
		<div css={leftMarginStyles}>
			{url ? (
				<a css={linkStyles} href={url}>
					<h2 css={headerStyles(fontColour)}>{title}</h2>
				</a>
			) : (
				<h2 css={headerStyles(fontColour)}>{title}</h2>
			)}
			{!!description && (
				<p
					css={descriptionStyles(fontColour)}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
			{showDateHeader && editionId && (
				<>
					<span
						css={dateTextStyles(
							overrides?.text.containerDate || news[400],
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
								overrides?.text.containerDate || news[400],
							),
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
