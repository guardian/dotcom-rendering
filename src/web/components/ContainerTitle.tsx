import { css } from '@emotion/react';

import { text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { between, from, until } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

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
	margin-left: 0;

	${from.tablet} {
		margin-left: 10px;
	}

	${from.leftCol} {
		margin-left: 0;
	}
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
	${between.tablet.and.leftCol} {
		margin-left: 10px;
	}

	${until.leftCol} {
		margin-bottom: ${space[4]}px;
	}
`;

export const ContainerTitle = ({
	title,
	fontColour,
	description,
	url,
}: {
	title?: string;
	fontColour?: string;
	description?: string;
	url?: string;
}) => {
	if (!title) return null;
	return (
		<>
			{url ? (
				<a css={linkStyles} href={url}>
					<h2 css={headerStyles(fontColour)}>{title}</h2>
				</a>
			) : (
				<h2 css={headerStyles(fontColour)}>{title}</h2>
			)}
			{description && (
				<p
					css={descriptionStyles(fontColour)}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
		</>
	);
};
