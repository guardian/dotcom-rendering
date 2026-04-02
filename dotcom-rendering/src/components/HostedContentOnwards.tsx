import { css } from '@emotion/react';
import {
	palette as sourcePalette,
	space,
	textSans17,
	textSansBold20,
} from '@guardian/source/foundations';
import type { ArticleFormat } from '../lib/articleFormat';
import { palette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import type { TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';

type HostedContentOnwardsProps = {
	trails: TrailType[];
	format: ArticleFormat;
	discussionApiUrl: string;
	onwardsSource: OnwardsSource;
	serverTime?: number;
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
`;

export const HostedContentOnwards = ({
	trails,
	format,
	discussionApiUrl,
	onwardsSource,
	serverTime,
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
								<Card
									{...getDefaultCardProps(
										trail,
										discussionApiUrl,
										onwardsSource,
										format,
										serverTime,
									)}
								/>
							</div>
						);
					})}
				</div>
			</main>
		</div>
	);
};

const getDefaultCardProps = (
	trail: TrailType,
	discussionApiUrl: string,
	onwardsSource: OnwardsSource,
	format: ArticleFormat,
	serverTime?: number,
) => {
	const defaultProps: CardProps = {
		linkTo: trail.url,
		imageLoading: 'lazy',
		serverTime,
		format: trail.format,
		contextFormat: format,
		containerType: 'scrollable/small',
		headlineText: trail.headline,
		image: trail.image,
		dataLinkName: trail.dataLinkName,
		discussionApiUrl,
		mainMedia: trail.mainMedia,
		isExternalLink: false,
		aspectRatio: '5:4',
		mediaSize: 'scrollable-small',
		mediaPositionOnDesktop: 'left',
		mediaPositionOnMobile: 'left',
		supportingContent: undefined,
		onwardsSource,
		isOnwardContent: true,
		showTopBarDesktop: false,
		showTopBarMobile: false,
	};

	return defaultProps;
};
