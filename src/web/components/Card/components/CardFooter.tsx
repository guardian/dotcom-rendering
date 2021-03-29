import React from 'react';
import { css } from 'emotion';

import { Design, Special } from '@guardian/types';
import { Lines } from '@guardian/src-ed-lines';
import { from } from '@guardian/src-foundations/mq';
import { textSans } from '@guardian/src-foundations/typography';
import { space } from '@guardian/src-foundations';

type Props = {
	format: Format;
	age?: JSX.Element;
	mediaMeta?: JSX.Element;
	commentCount?: JSX.Element;
	isFullCardImage?: boolean;
	badge?: string;
	palette: Palette;
};

const spaceBetween = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const fullCardImageLayout = css`
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	margin-right: -1px;
	${from.tablet} {
		margin-bottom: -2px;
	}
`;

const flexEnd = css`
	display: flex;
	justify-content: flex-end;
`;

const linesWrapperStyles = css`
	/* Fill the container */
	flex-grow: 1;
	/* Push the lines down to align with the bottom of the card */
	margin-top: 5px;
`;

const badgeImageStyle = css`
	max-height: ${space[9]}px;
	margin-left: ${space[3]}px;
	vertical-align: middle;
`;

const badgeWrapperStyle = css`
	margin-top: ${space[6]}px;
	padding-right: ${space[3]}px;
	padding-bottom: ${space[3]}px;
	text-align: right;
`;

export const CardFooter = ({
	format,
	age,
	mediaMeta,
	commentCount,
	isFullCardImage,
	badge,
	palette,
}: Props) => {
	const paidForStyle = css`
		color: ${palette.text.branding};
		${textSans.xsmall({ fontWeight: 'bold' })}
	`;

	if (format.theme === Special.Labs) {
		return (
			<div className={badgeWrapperStyle}>
				<div className={paidForStyle}>Paid for by</div>
				<img className={badgeImageStyle} alt="" src={badge} />
			</div>
		);
	}

	if (
		!isFullCardImage &&
		(format.design === Design.Comment ||
			format.design === Design.Editorial ||
			format.design === Design.Letter)
	) {
		return (
			<footer className={spaceBetween}>
				{age}
				<div className={linesWrapperStyles}>
					<Lines count={4} />
				</div>
				{commentCount}
			</footer>
		);
	}

	if (format.design === Design.Media) {
		return (
			<footer className={spaceBetween}>
				{mediaMeta}
				{/* Show age if we have it otherwise try for commentCount */}
				{age || commentCount}
			</footer>
		);
	}

	if (age) {
		return (
			<footer
				className={isFullCardImage ? fullCardImageLayout : spaceBetween}
			>
				{age}
				{commentCount}
			</footer>
		);
	}

	return (
		<footer className={flexEnd}>
			<>{commentCount}</>
		</footer>
	);
};
