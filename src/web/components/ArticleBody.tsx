import { css } from '@emotion/react';

import { headline } from '@guardian/src-foundations/typography';
import { between } from '@guardian/src-foundations/mq';
import { ArticleRenderer } from '@root/src/web/lib/ArticleRenderer';
import { LiveBlogRenderer } from '@root/src/web/lib/LiveBlogRenderer';
import { Design, Display } from '@guardian/types';
import type { Format } from '@guardian/types';
import { space } from '@guardian/src-foundations';

type Props = {
	format: Format;
	palette: Palette;
	blocks: Block[];
	adTargeting: AdTargeting;
	host?: string;
	pageId: string;
	webTitle: string;
};

const globalH2Styles = (display: Display) => css`
	h2:not([data-ignore='global-h2-styling']) {
		${display === Display.Immersive
			? headline.medium({ fontWeight: 'light' })
			: headline.xxsmall({ fontWeight: 'bold' })};
	}
`;

const globalH3Styles = (display: Display) => {
	if (display !== Display.NumberedList) return null;
	return css`
		h3 {
			${headline.xxsmall({ fontWeight: 'bold' })};
			margin-bottom: ${space[2]}px;
		}
	`;
};

const globalStrongStyles = css`
	strong {
		font-weight: bold;
	}
`;

const bodyPadding = css`
	${between.tablet.and.desktop} {
		padding-right: 80px;
	}
`;

const globalLinkStyles = (palette: Palette) => css`
	a:not([data-ignore='global-link-styling']) {
		text-decoration: none;
		border-bottom: 1px solid ${palette.border.articleLink};
		color: ${palette.text.articleLink};

		:hover {
			color: ${palette.text.articleLinkHover};
			border-bottom: 1px solid ${palette.border.articleLinkHover};
		}
	}
`;

export const ArticleBody = ({
	format,
	palette,
	blocks,
	adTargeting,
	host,
	pageId,
	webTitle,
}: Props) => {
	const isInteractive = format.design === Design.Interactive;

	if (
		format.design === Design.LiveBlog ||
		format.design === Design.DeadBlog
	) {
		return (
			<div css={[globalStrongStyles, globalLinkStyles(palette)]}>
				<LiveBlogRenderer
					format={format}
					blocks={blocks}
					adTargeting={adTargeting}
					host={host}
					pageId={pageId}
					webTitle={webTitle}
				/>
			</div>
		);
	}
	return (
		<div
			// eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
			tabIndex={0}
			id="maincontent"
			css={[
				isInteractive ? null : bodyPadding,
				globalH2Styles(format.display),
				globalH3Styles(format.display),
				globalStrongStyles,
				globalLinkStyles(palette),
			]}
		>
			<ArticleRenderer
				format={format}
				palette={palette}
				elements={blocks[0] ? blocks[0].elements : []}
				adTargeting={adTargeting}
				host={host}
				pageId={pageId}
				webTitle={webTitle}
			/>
		</div>
	);
};
