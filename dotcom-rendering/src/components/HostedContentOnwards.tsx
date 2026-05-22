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

const headerStyles = css`
	margin-bottom: ${space[1]}px;
	border-top: ${space[2]}px solid var(--accent-colour);
`;

const headingStyles = css`
	${textSans17}
	padding-top: ${space[2]}px;
	color: ${sourcePalette.neutral[7]};

	span {
		${textSansBold20}
		display: block;
		color: var(--accent-colour);
	}
`;

const stackedCardsStyles = css`
	display: flex;
	flex-direction: column;
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
		<div
			css={css`
				--accent-colour: ${accentColor ?? sourcePalette.neutral[7]};
			`}
		>
			<header css={headerStyles}>
				<h2 css={headingStyles}>
					More from
					<span>{brandName}</span>
				</h2>
			</header>

			<ul css={stackedCardsStyles}>
				{trails.map((trail) => {
					return (
						<li key={trail.url} css={stackedCardWrapper}>
							<HostedContentOnwardsCard trail={trail} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};
