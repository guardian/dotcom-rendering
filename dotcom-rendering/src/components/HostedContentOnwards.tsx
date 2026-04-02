import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import { palette } from '../palette';
import type { TrailType } from '../types/trails';
import { HostedContentOnwardsCard } from './HostedContentOnwardsCard';

type HostedContentOnwardsProps = {
	trails: TrailType[];
	brandName: string;
	accentColor?: string;
};

const headerStyles = (accentColor?: string) => css`
	margin-bottom: ${space[1]}px;
	border-top: ${space[2]}px solid
		${accentColor ? accentColor : sourcePalette.neutral[7]};

	span {
		${textSansBold20}
		display: block;
		color: ${accentColor ? accentColor : sourcePalette.neutral[7]};
	}
`;

const headingStyles = css`
	${textSans17}
	padding-top: ${space[2]}px;
	color: ${sourcePalette.neutral[7]};
`;

/* Stacked cards styles for hosted content */
const stackedCardsStyles = css`
	display: flex;
	flex-direction: column;
	gap: 0;
`;

const stackedCardWrapper = css`
	width: 100%;
	border-top: 2px solid ${palette('--onward-content-border')};
	padding-top: ${space[2]}px;
	padding-bottom: ${space[2]}px;

	&:last-of-type {
		padding-bottom: 0;
	}
`;

export const HostedContentOnwards = ({
	trails,
	brandName,
	accentColor,
}: HostedContentOnwardsProps) => {
	return (
		<div>
			<header css={headerStyles(accentColor)}>
				<h2 css={headingStyles}>
					More from
					<span> {brandName}</span>
				</h2>
			</header>
			<main>
				<div css={stackedCardsStyles}>
					{trails.map((trail) => {
						return (
							<div key={trail.url} css={stackedCardWrapper}>
								<HostedContentOnwardsCard trail={trail} />
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
};
