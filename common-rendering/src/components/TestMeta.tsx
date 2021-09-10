import { css } from "@emotion/react";
import { between, from, until } from "@guardian/src-foundations/mq";
import { Display, Design, Special } from "@guardian/types";
import type { Format } from "@guardian/types";

import { Contributor } from "@root/src/web/components/Contributor";
import { Avatar } from "@root/src/web/components/Avatar";
import { Counts } from "@root/src/web/components/Counts";
import { Branding } from "@root/src/web/components/Branding";
import { Lines } from "@guardian/src-ed-lines";
import { border, space } from "@guardian/src-foundations";
import { ShareIcons } from "./ShareIcons";
import { Dateline } from "./Dateline";
import { interactiveLegacyClasses } from "../layouts/lib/interactiveLegacyStyling";

interface TagType {
	id: string;
	type: string;
	title: string;
	twitterHandle?: string;
	paidContentType?: string;
	bylineImageUrl?: string;
}

type Props = {
	format: Format;
	palette: Palette;
	pageId: string;
	webTitle: string;
	author: AuthorType;
	tags: TagType[];
	primaryDateline: string;
	secondaryDateline: string;
	branding?: Branding;
};

const meta = css`
	${between.tablet.and.leftCol} {
		order: 3;
	}

	${until.mobileLandscape} {
		padding-left: 10px;
		padding-right: 10px;
	}

	${from.mobileLandscape} {
		padding-left: 20px;
		padding-right: 20px;
	}

	${from.phablet} {
		padding-left: 0px;
		padding-right: 0px;
	}

	padding-top: 2px;
`;

const metaFlex = css`
	margin-bottom: 6px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

const stretchLines = css`
	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
	}
	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
	}
`;

const metaExtras = (palette: Palette) => css`
	border-top: 1px solid ${palette.border.article};
	flex-grow: 1;
	padding-top: 6px;

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}

	${between.leftCol.and.wide} {
		padding-bottom: 6px;
	}
`;

const metaNumbers = (palette: Palette) => css`
	border-top: 1px solid ${palette.border.article};
	display: flex;
	flex-grow: 1;

	justify-content: flex-end;
	${between.leftCol.and.wide} {
		justify-content: flex-start;
	}

	${until.phablet} {
		margin-left: -20px;
		margin-right: -20px;
		padding-left: 20px;
		padding-right: 20px;
	}

	${until.mobileLandscape} {
		margin-left: -10px;
		margin-right: -10px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const metaContainer = (format: Format) => {
	const defaultMargins = css`
		${until.phablet} {
			margin-left: -20px;
			margin-right: -20px;
		}
		${until.mobileLandscape} {
			margin-left: -10px;
			margin-right: -10px;
		}
	`;
	switch (format.display) {
		case Display.Immersive:
		case Display.Showcase:
		case Display.NumberedList:
		case Display.Standard: {
			switch (format.design) {
				case Design.PhotoEssay:
					return format.theme === Special.Labs
						? defaultMargins
						: css`
								${until.phablet} {
									margin-left: -20px;
									margin-right: -20px;
								}
								${until.mobileLandscape} {
									margin-left: -10px;
									margin-right: -10px;
								}
								${from.leftCol} {
									margin-left: 20px;
								}
								${from.wide} {
									margin-left: 40px;
								}
						  `;
				default:
					return defaultMargins;
			}
		}
	}
};

const getBylineImageUrl = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === "Contributor");
	return contributorTag && contributorTag.bylineImageUrl;
};

const getAuthorName = (tags: TagType[]) => {
	const contributorTag = tags.find((tag) => tag.type === "Contributor");
	return contributorTag && contributorTag.title;
};

const shouldShowContributor = (format: Format) => {
	switch (format.display) {
		case Display.NumberedList:
			return true;
		case Display.Immersive:
			return false;
		case Display.Showcase:
		case Display.Standard: {
			switch (format.design) {
				case Design.Comment:
				case Design.Editorial:
					return false;
				default:
					return true;
			}
		}
	}
};

const RowBelowLeftCol = ({ children }: { children: React.ReactNode }) => (
	<div
		css={css`
			display: flex;
			flex-direction: column;

			${until.leftCol} {
				flex-direction: row;
			}
		`}
	>
		{children}
	</div>
);

export const ArticleMeta = ({
	branding,
	format,
	palette,
	pageId,
	webTitle,
	author,
	tags,
	primaryDateline,
	secondaryDateline,
}: Props) => {
	const bylineImageUrl = getBylineImageUrl(tags);
	const authorName = getAuthorName(tags);

	const onlyOneContributor: boolean =
		tags.filter((tag) => tag.type === "Contributor").length === 1;
	return (
		<div css={metaContainer(format)}>
			<div css={meta}>
				<RowBelowLeftCol>
					<>
						<div>
							{shouldShowContributor(format) && (
								<Contributor
									author={author}
									tags={tags}
									format={format}
									palette={palette}
								/>
							)}
							<Dateline
								primaryDateline={primaryDateline}
								secondaryDateline={secondaryDateline}
							/>
						</div>
					</>
				</RowBelowLeftCol>
				<div data-print-layout="hide" css={metaFlex}></div>
			</div>
		</div>
	);
};
