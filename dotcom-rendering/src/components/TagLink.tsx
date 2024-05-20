import { css } from '@emotion/react';
import {
	headlineBold20,
	headlineMedium14,
	headlineMedium17,
	palette,
	space,
	until,
} from '@guardian/source-foundations';
import { SvgArrowRightStraight } from '@guardian/source-react-components';

interface Props {
	format: ArticleFormat;
	sectionLabel: string;
	sectionUrl: string;
	guardianBaseURL: string;
}

const TagLinkStyles = css`
	padding: 10px 0 10px 9px;
	gap: 8px;
	border-radius: 15px;
	background-color: ${palette.sport[800]};
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	fill: ${palette.sport[400]};
`;
const tagButtonStyles = css`
	${until.wide} {
		${headlineMedium14};
	}
	${headlineMedium17};
	display: flex;
	align-items: baseline;
	gap: 8px;
`;
const arrowStyles = css`
	svg {
		fill: ${palette.sport[800]};
		margin-top: 4px;
		height: 14px;
		width: 14px;
	}
	text-align: center;
	display: inline-block;
	margin-top: ${space[2]}px;
	margin-bottom: ${space[2]}px;
	${until.tablet} {
		margin-left: ${space[2]}px;
	}
	border-radius: 50%;
	height: 24px;
	width: 24px;
	border: none;
	cursor: pointer;
	transition: background-color 0.2s;
	background-color: ${palette.sport[400]};
	:hover {
		background-color: ${palette.sport[400]};
	}
`;

const sectionLabelLink = css`
	text-decoration: none;
	color: ${palette.sport[400]};
	:hover {
		text-decoration: underline;
	}
`;

export const TagLink = ({
	sectionUrl,
	sectionLabel,
	guardianBaseURL,
}: Props) => {
	return (
		<a
			href={`${guardianBaseURL}/${sectionUrl}`}
			css={[TagLinkStyles, sectionLabelLink]}
			data-component="series"
			data-link-name="article series"
		>
			<span
				css={css`
					${headlineBold20};
				`}
			>
				{sectionLabel}
			</span>
			<span css={tagButtonStyles}>
				<span css={arrowStyles}>
					<SvgArrowRightStraight isAnnouncedByScreenReader={false} />
				</span>
				<span>Discover More</span>
			</span>
		</a>
	);
};
