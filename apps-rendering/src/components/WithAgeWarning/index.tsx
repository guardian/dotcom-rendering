import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { from, remSpace } from '@guardian/source-foundations';
import { AgeWarning } from '@guardian/source-react-components-development-kitchen';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import { grid } from 'grid/grid';
import type { Item } from 'item';
import { isComment, isNews } from 'item';
import { articleWidthStyles, wideContentWidth } from 'styles';

interface WithAgeWarningProps {
	item: Item;
	publishDate: Option<Date>;
	format: ArticleFormat;
	children: React.ReactNode;
}

const getAgeWarning = (
	tags: Tag[],
	publicationDate: Date,
): string | undefined => {
	const isNewsArticle = isNews(tags);
	const isOpinion = isComment(tags);
	let message;

	// Only show an age warning for news or opinion pieces
	if (isNewsArticle || isOpinion) {
		const warnLimitDays = 30;
		const currentDate = new Date();
		const dateThreshold = new Date();

		dateThreshold.setDate(currentDate.getDate() - warnLimitDays);

		// if the publication date is before the date threshold generate message
		if (publicationDate < dateThreshold) {
			// Unary + coerces dates to numbers for TypeScript
			const diffMilliseconds = +currentDate - +publicationDate;
			const diffSeconds = Math.floor(diffMilliseconds / 1000);
			const diffMinutes = diffSeconds / 60;
			const diffHours = diffMinutes / 60;
			const diffDays = diffHours / 24;
			const diffMonths = diffDays / 31;
			const diffYears = diffDays / 365;

			if (diffYears >= 2) {
				message = `${Math.floor(diffYears)} years old`;
			} else if (diffYears > 1) {
				message = '1 year old';
			} else if (diffMonths >= 2) {
				message = `${Math.floor(diffMonths)} months old`;
			} else if (diffMonths > 1) {
				message = '1 month old';
			}
		}
	}

	return message;
};

export const defaultWidthStyles: SerializedStyles = css`
	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${wideContentWidth}px;
	}
`;

export const warningStyles = (
	format: ArticleFormat,
	isSeries: boolean,
): SerializedStyles => {
	switch (format.design) {
		case ArticleDesign.Gallery:
			return css`
				${galleryStyle(isSeries)}
			`;

		case ArticleDesign.LiveBlog:
		case ArticleDesign.DeadBlog:
			return css`
				${defaultWidthStyles}
				padding: ${remSpace[2]} 0 ${remSpace[2]} 0;
			`;
		case ArticleDesign.Interview:
			return css`
				${defaultWidthStyles}
				padding: ${remSpace[1]} 0 ${remSpace[2]} 0;
			`;
		case ArticleDesign.Analysis:
		case ArticleDesign.Explainer:
		case ArticleDesign.Obituary:
		case ArticleDesign.Letter:
			return css`
				${articleWidthStyles}
				padding-top: ${remSpace[1]};
				padding-bottom: ${isSeries ? remSpace[1] : remSpace[2]};
			`;
		case ArticleDesign.NewsletterSignup:
			return css`
				${defaultWidthStyles}
				padding-bottom: ${remSpace[2]};
			`;
		case ArticleDesign.Comment:
		case ArticleDesign.Editorial:
			return css`
				${articleWidthStyles}
				padding-top: ${remSpace[2]};
				padding-bottom: ${remSpace[1]};
			`;
		default:
			if (format.display === ArticleDisplay.Immersive) {
				return css`
					${immersiveStyle(isSeries)}
				`;
			}
			return css`
				${articleWidthStyles}
				padding-top: ${remSpace[1]};
				padding-bottom: ${remSpace[1]};
			`;
	}
};

const immersiveStyle = (isSeries: boolean): SerializedStyles => css`
	grid-row: ${isSeries ? '2 / 3' : '3 / 4'};
	${grid.between('viewport-start', 'centre-column-end')}
	${from.mobileLandscape} {
		${grid.between('viewport-start', 'viewport-end')}
	}

	${from.tablet} {
		${grid.between('centre-column-start', 'viewport-end')}
		margin-left: calc(${grid.columnGap} * -1/2);
	}
`;

const galleryStyle = (isSeries: boolean): SerializedStyles => css`
	${grid.between('viewport-start', 'centre-column-end')}
	grid-row: ${isSeries ? '2 / 3' : '3 / 4'};

	${from.mobileLandscape} {
		${grid.column.all}
	}

	${from.tablet} {
		${grid.between('centre-column-start', 'viewport-end')}
		margin-left: calc(${grid.columnGap} * -1/2);
	}
`;

const WithAgeWarning: React.FC<WithAgeWarningProps> = ({
	item,
	publishDate,
	format,
	children,
}: WithAgeWarningProps) => {
	if (publishDate.kind === OptionKind.Some) {
		const age = getAgeWarning(item.tags, publishDate.value);

		if (age) {
			return (
				<>
					<div css={[warningStyles(format, item.series.isSome())]}>
						<AgeWarning age={age} supportsDarkMode={true} />
					</div>
					{children}
					<AgeWarning
						age={age}
						isScreenReader={true}
						supportsDarkMode={true}
					/>
				</>
			);
		}

		return <>{children}</>;
	}

	return <>{children}</>;
};

export { WithAgeWarning, getAgeWarning };
