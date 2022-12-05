import { ArticleFormat } from '@guardian/libs';
import { Tag } from '@guardian/content-api-models/v1/tag';
import {
    from,
    palette,
    textSans,
    visuallyHidden,
} from '@guardian/source-foundations';
import { css, SerializedStyles } from '@emotion/react';
import { background } from '@guardian/common-rendering/src/editorialPalette';
import { articleWidthStyles, darkModeCss } from 'styles';
import { isComment, isNews } from 'item';
import { Option, OptionKind } from '@guardian/types';

type AgeWarningProps = {
    age: string;
    isScreenReader?: boolean;
    size?: 'small' | 'medium';
};

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
    const isNewsArticle = isNews(tags)
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

const ageWarningStyles = (isSmall: boolean) => css`
    ${isSmall ? textSans.xxsmall() : textSans.medium()};
	color: ${palette.neutral[7]};
	background-color: ${palette.brandAlt[400]};
    display: inline-block;

    > strong {
        font-weight: bold;
    }

    padding: ${isSmall ? '3px 5px' : '6px 10px'};

    ${from.mobileLandscape} {
        padding-left: ${isSmall ? '6px' : '12px'};
    }

    ${from.leftCol} {
        padding-left: ${isSmall ? '5px' : '10px'};
    }
`;

const ageWarningScreenReader = css`
    ${visuallyHidden};
`;

const ensureOldText = (age: string) =>
    age.endsWith('old') ? age : `${age} old`;

const AgeWarning = ({ age, isScreenReader, size = 'medium' }: AgeWarningProps) => {
    const warningPrefix = 'This article is more than ';
    const isSmall = size === 'small';
    const ageOld = ensureOldText(age);

    if (isScreenReader) {
        return <div css={ageWarningScreenReader}>{warningPrefix + age}</div>;
    }

    return (
        <div css={ageWarningStyles(isSmall)} aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 11 11">
                <path d="M5.4 0C2.4 0 0 2.4 0 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4S8.4 0 5.4 0zm3 6.8H4.7V1.7h.7L6 5.4l2.4.6v.8z"></path>
            </svg>
            {warningPrefix}
            <strong>{ageOld}</strong>
        </div>
    );
};

const backgroundStyles = (format: ArticleFormat): SerializedStyles => css`
    background-color: ${background.articleContent(format)};

    ${darkModeCss`
        background-color: ${background.articleContentDark(format)}
    `}
`;

export const WithAgeWarning : React.FC<WithAgeWarningProps>  = ({
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

