import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import type { Tag } from '@guardian/content-api-models/v1/tag';
import type { ArticleFormat } from '@guardian/libs';
import type { Option } from '@guardian/types';
import { OptionKind } from '@guardian/types';
import { AgeWarning } from 'components/AgeWarning';
import { isComment, isNews } from 'item';
import { articleWidthStyles, darkModeCss } from 'styles';

interface WithAgeWarningProps {
	tags: Tag[];
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
		const warnLimitDays = 1;
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

const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
	background-color: ${background.articleContent(format)};

	${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

export const WithAgeWarning: React.FC<WithAgeWarningProps> = ({
	tags,
	publishDate,
	format,
	children,
}: WithAgeWarningProps) => {
	if (publishDate.kind === OptionKind.Some) {
		const age = getAgeWarning(tags, publishDate.value);

		if (age) {
			return (
				<>
					<div css={[backgroundStyles(format), articleWidthStyles]}>
						<AgeWarning age={age} />
					</div>
					{children}
					<AgeWarning age={age} isScreenReader={true} />
				</>
			);
		}

		return <>{children}</>;
	}

	return <>{children}</>;
};
