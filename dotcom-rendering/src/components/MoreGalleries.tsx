import { css } from '@emotion/react';
import {
	from,
	headlineBold24,
	headlineBold28,
	space,
	until,
} from '@guardian/source/foundations';
import { StraightLines } from '@guardian/source-development-kitchen/react-components';
import { formatAttrString } from '../lib/formatAttrString';
import { palette } from '../palette';
import { type OnwardsSource } from '../types/onwards';
import { type TrailType } from '../types/trails';
import { Card } from './Card/Card';
import type { Props as CardProps } from './Card/Card';
import { Hide } from './Hide';
import { LeftColumn } from './LeftColumn';
import { Section } from './Section';

type Props = {
	absoluteServerTimes: boolean;
	trails: TrailType[];
	discussionApiUrl: string;
	headingLink?: string;
};

const wrapperStyle = css`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	${from.desktop} {
		padding-right: ${space[10]}px;
	}
`;

const containerStyles = css`
	display: flex;
	flex-direction: column;
	position: relative;

	margin-top: ${space[2]}px;
	padding-bottom: ${space[6]}px;

	margin-left: 0px;
	margin-right: 0px;

	border-bottom: 1px solid ${palette('--onward-content-border')};

	${from.leftCol} {
		margin-left: 10px;
		margin-right: 100px;
	}
`;

const standardCardStyles = css`
	flex: 1;

	position: relative;
	display: flex;
	padding: ${space[2]}px;
	background-color: ${palette('--onward-card-background')};

	:not(:first-child)::before {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: -10px; /* shift into the gap */
		width: 1px;
		background: ${palette('--onward-content-border')};
	}
`;

const standardCardsListStyles = css`
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 20px;

	${from.tablet} {
		padding-top: ${space[2]}px;
	}

	${until.tablet} {
		flex-direction: column;
		width: 100%;
	}
`;

const headerStyles = css`
	color: ${palette('--carousel-text')};
	${headlineBold24};
	padding-bottom: ${space[3]}px;
	padding-top: ${space[1]}px;
	margin-left: 0;

	${from.tablet} {
		${headlineBold28};
	}
`;

const headerStylesWithUrl = css`
	:hover {
		text-decoration: underline;
	}
`;

const titleStyle = css`
	color: ${palette('--onward-text')};
	display: inline-block;
`;

const getDefaultCardProps = (
	trail: TrailType,
	absoluteServerTimes: boolean,
	discussionApiUrl: string,
) => {
	const defaultProps: CardProps = {
		linkTo: trail.url,
		format: trail.format,
		headlineText: trail.headline,
		byline: trail.byline,
		showByline: trail.showByline,
		showQuotedHeadline: trail.showQuotedHeadline,
		webPublicationDate: trail.webPublicationDate,
		kickerText: trail.kickerText,
		showPulsingDot: false,
		showClock: false,
		image: trail.image,
		isCrossword: trail.isCrossword,
		starRating: trail.starRating,
		dataLinkName: trail.dataLinkName,
		snapData: trail.snapData,
		discussionApiUrl,
		discussionId: trail.discussionId,
		avatarUrl: trail.avatarUrl,
		mainMedia: trail.mainMedia,
		isExternalLink: false,
		branding: trail.branding,
		absoluteServerTimes,
		imageLoading: 'lazy',
		trailText: trail.trailText,
		showAge: false,
		containerType: 'more-galleries',
		showTopBarDesktop: false,
		showTopBarMobile: false,
		aspectRatio: '5:4',
	};
	return defaultProps;
};

export const MoreGalleries = (props: Props) => {
	const [firstTrail, ...standardCards] = props.trails;
	if (!firstTrail) return null;

	const heading = 'More galleries';
	const onwardsSource: OnwardsSource = 'more-galleries';

	const defaultProps = getDefaultCardProps(
		firstTrail,
		props.absoluteServerTimes,
		props.discussionApiUrl,
	);

	return (
		<Section
			fullWidth={true}
			borderColour={palette('--onward-content-border')}
			backgroundColour={palette('--onward-background')}
			showTopBorder={false}
		>
			<div css={wrapperStyle} data-link-name={formatAttrString(heading)}>
				<LeftColumn
					size={'compact'}
					borderColour={palette('--onward-content-border')}
					hasPageSkin={false}
				>
					<Title title={heading} url={props.headingLink} />
				</LeftColumn>

				<div
					css={containerStyles}
					data-component={onwardsSource}
					data-link={formatAttrString(heading)}
				>
					<Hide when="above" breakpoint="leftCol">
						<Title title={heading} url={props.headingLink} />
					</Hide>

					<MoreGalleriesSplashCard defaultProps={defaultProps} />
					<Hide when="below" breakpoint="tablet">
						<StraightLines
							count={1}
							color={palette('--onward-content-border')}
						/>
					</Hide>

					<ul css={standardCardsListStyles}>
						{standardCards.map((trail) => (
							<li key={trail.url} css={standardCardStyles}>
								<Card
									{...getDefaultCardProps(
										trail,
										props.absoluteServerTimes,
										props.discussionApiUrl,
									)}
									mediaSize="medium"
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
};

const MoreGalleriesSplashCard = ({
	defaultProps,
}: {
	defaultProps: CardProps;
}) => {
	const cardProps: Partial<CardProps> = {
		headlineSizes: {
			desktop: 'medium',
			tablet: 'medium',
			mobile: 'medium',
		},
		mediaPositionOnDesktop: 'right',
		mediaPositionOnMobile: 'top',
		mediaSize: 'medium',
		isFlexSplash: true,
	};
	return (
		<div
			css={css`
				margin-bottom: ${space[6]}px;
				background-color: ${palette('--onward-card-background')};
				padding: ${space[2]}px;
			`}
		>
			<Card {...defaultProps} {...cardProps} />
		</div>
	);
};

const Title = ({ title, url }: { title: string; url?: string }) =>
	url ? (
		<a
			css={css`
				text-decoration: none;
			`}
			href={url}
			data-link-name="section heading"
		>
			<h2 css={headerStyles}>
				<span css={[headerStylesWithUrl, titleStyle]}>{title}</span>
			</h2>
		</a>
	) : (
		<h2 css={headerStyles}>
			<span css={titleStyle}>{title}</span>
		</h2>
	);
